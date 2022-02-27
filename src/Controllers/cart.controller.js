const { Router } = require("express")
const crudController = require("./crud.controller")
const Cart = require("../Models/cart.model")
const redis = require("../Configs/redis")

const router = Router()

router.get("", crudController(Cart, "Cart").get)

router.get("/email=:email", async (req, res) => {
  try {
    const email = req.params.email

    const cartId = await Cart.findOne({ userId: email }).lean().exec()

    redis.get(email, async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        return res.status(201).send(value)
      } else {
        try {
          const value = await Cart.findById(cartId._id).lean().exec()
          redis.set(email, JSON.stringify(value))
          res.status(201).send(value)
        } catch (err) {
          res.status(201).send(err.message)
        }
      }
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

router.post("", async (req, res) => {
  try {
    const cart = await Cart.create(req.body)
    redis.get("Cart", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        redis.set("Cart", JSON.stringify([...value, cart]))
      } else {
        value = await Cart.find().lean().exec()
        redis.set("Cart", JSON.stringify(value))
      }
    })
    return res.status(201).send(cart)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

router.patch("/email=:email", async (req, res) => {
  try {
    const email = req.params.email

    const cartId = await Cart.findOne({ userId: email }).lean().exec()

    const cart = await Cart.findByIdAndUpdate(cartId._id, req.body, {
      new: true,
    })

    redis.get(email, async (err, fetchedPost) => {
      if (err) console.log(err.message)

      redis.set(email, JSON.stringify(cart))

      const carts = await Cart.find().lean().exec()
      redis.set("Cart", JSON.stringify(carts))
    })
    res.status(201).send(item)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

module.exports = router
