const { Router } = require("express")
const crudController = require("./crud.controller")
const Cart = require("../Models/cart.model")

const router = Router()

router.get("", crudController(Cart, "Cart").get)

router.get("/email=:email", async (req, res) => {
  try {
    const email = req.params.email

    const cart = await Cart.find({ userId: email }).lean().exec()

    res.status(200).send(cart)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

router.post("", async (req, res) => {
  try {
    const cart = await Cart.create(req.body)

    res.status(201).send(cart)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
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

    res.status(201).send(cart)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

module.exports = router
