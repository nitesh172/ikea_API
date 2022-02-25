// This is page controller of our project..
const { Router } = require("express")
const crudController = require("./crud.controller")
const Page = require("../Models/page.model")
const router = Router()
const redis = require("../Configs/redis")

router.get("", crudController(Page, "Page").get)
router.get("/:name", async (req, res) => {
  try {
    const pageName = req.params.name
    redis.get("page".pageName, async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        return res.status(201).send(value)
      } else {
        try {
          const value = await Page.findOne({ mainCategory: pageName }).lean().exec()
          redis.set("page".pageName, JSON.stringify(value))
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
    const page = await Page.create(req.body)

    redis.get("Page", async (err, value) => {
      if (err) console.log(err)

      if (value) {
        value = JSON.parse(value)
        redis.set("Page", JSON.stringify([...value, page]))
      } else {
        value = await model.find().lean().exec()
        redis.set("Page", JSON.stringify(value))
      }
    })

    return res.status(201).send(page)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

module.exports = router
