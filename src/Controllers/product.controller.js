// This is product controller of our project..
const { Router } = require("express")

const router = Router()
const crudController = require("./crud.controller")
const Product = require("../Models/product.model")
const redis = require("../Configs/redis")

router.get("", crudController(Product, "Product").get)
router.get("/mainCategory=:name", async (req, res) => {
  try {
    const mainCategory = req.params.name
    redis.get(mainCategory, async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        return res.status(201).send(value)
      } else {
        try {
          const value = await Product.find({
            mainCategory: mainCategory,
          })
            .lean()
            .exec()
          redis.set(mainCategory, JSON.stringify(value))
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
    const products = await Product.create(req.body)

    redis.get("Product", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        redis.set("Product", JSON.stringify([...value, products]))
      } else {
        value = await model.find().lean().exec()
        redis.set("Product", JSON.stringify(value))
      }
    })

    res.status(201).send(products)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

router.get("/id=:id", async (req, res) => {
  try {
    const id = req.params.id
    redis.get(id, async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        return res.status(201).send(value)
      } else {
        try {
          const value = await Product.find({
            _id: id,
          })
            .lean()
            .exec()
          redis.set(id, JSON.stringify(value))
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

module.exports = router
