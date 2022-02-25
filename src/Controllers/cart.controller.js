const { Router } = require("express")
const crudController = require("./crud.controller")
const Cart = require("../Models/cart.model")

const router = Router()

router.get("", crudController(Cart, "Cart").get)

router.get("/email=:email", async (req, res) => {
  try {
    const email = req.params.email
    redis.get(email, async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        return res.status(201).send({ value, redis: true })
      } else {
        try {
          const value = await Cart.findOne({ userId: email }).lean().exec()
          redis.set(email, JSON.stringify(value))
          res.status(201).send({ value, redis: false })
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
        redis.set(key, JSON.stringify([...value, cart]))
      } else {
        value = await Cart.find().lean().exec()
        redis.set(key, JSON.stringify(value))
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
    const cart = await Cart.findOneAndUpdate({ userId: email }, req.body, {
      new: true,
    })
      .lean()
      .exec()
    redis.get(email, async (err, fetchedPost) => {
      if (err) console.log(err.message)

      redis.set(email, JSON.stringify(cart))

      const carts = await Cart.find().lean().exec()
      redis.set(key, JSON.stringify(carts))
    })
    res.status(201).send(item)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

module.exports = router
