const { Router } = require("express")
const crudController = require("./crud.controller")
const mainSubCategory = require("../Models/mainSubCategory.model")
const router = Router()
const redis = require("../Configs/redis")

router.get("", crudController(mainSubCategory, "mainSubCategory").get)
router.get("/:name", async (req, res) => {
  try {
    const mainSubCategory = req.params.name
    redis.get(mainSubCategory, async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        return res.status(201).send(value)
      } else {
        try {
          const value = await mainSubCategory
            .findOne({ mainSubCategory })
            .lean()
            .exec()
          redis.set(mainSubCategory, JSON.stringify(value))
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

router.post("/create", async (req, res) => {
  try {

    const mainSubCategory = await mainSubCategory.create(req.body)

    redis.get("mainSubCategory", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        redis.set(
          "mainSubCategory",
          JSON.stringify([...value, mainSubCategory])
        )
      } else {
        value = await mainSubCategory.find().lean().exec()
        redis.set("mainSubCategory", JSON.stringify(value))
      }
    })

    return res.status(201).send(mainSubCategory)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

module.exports = router
