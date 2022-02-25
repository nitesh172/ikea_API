const { Router } = require("express")
const crudController = require("./crud.controller")
const page = require("../Models/page.model")
const router = Router()
const redis = require("../Configs/redis")

router.get("", crudController(page, "page").get)
router.get("/:name", async (req, res) => {
  try {
    const page = req.params.name
    redis.get(page, async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        return res.status(201).send(value)
      } else {
        try {
          const value = await page
            .findOne({ page })
            .lean()
            .exec()
          redis.set(page, JSON.stringify(value))
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

    const page = await page.create(req.body)

    redis.get("page", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        redis.set(
          "page",
          JSON.stringify([...value, page])
        )
      } else {
        value = await page.find().lean().exec()
        redis.set("page", JSON.stringify(value))
      }
    })

    return res.status(201).send(page)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

module.exports = router
