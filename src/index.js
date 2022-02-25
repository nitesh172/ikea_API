const express = require("express")
const app = express()
app.use(express.json())

const cors = require("cors")

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
const redis = require("./Configs/redis")
const instance = require("./Configs/razorpay")

const userController = require("./Controllers/user.controller")
const pageController = require("./Controllers/page.controller")
const productController = require("./Controllers/product.controller")
const {
  register,
  login,
  verifyToken,
} = require("./Controllers/auth.controller")
const User = require("./Models/user.model")

app.use("/users", userController)
app.post("/register", register)
app.post("/login", login)

app.use("/pages", pageController)
app.use("/products", productController)

app.get("/admin/pages", async (req, res) => {
  try {
    return res.status(200).render("page.ejs")
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

app.get("/admin/products", async (req, res) => {
  try {
    return res.status(200).render("product.ejs")
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

app.get("/confrimation/:token", async (req, res) => {
  try {
    const user = await verifyToken(req.params.token)

    if (!user) return res.status(402).send({ message: "invalid token" })

    user.user.confirmed = true

    try {
      const updatedUser = await User.findByIdAndUpdate(
        user.user._id,
        user.user,
        {
          new: true,
        }
      )
        .lean()
        .exec()

      redis.get(`User.${user.user._id}`, async (err, fetchedPost) => {
        if (err) console.log(err.message)

        redis.set(`User.${user.user._id}`, JSON.stringify(user.user))

        const users = await User.find().lean().exec()
        redis.set(`User`, JSON.stringify(users))
      })

      res.status(200).render("confirmmail.ejs", {
        updatedUser,
        message: "Verification Sucessfull",
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message)
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

app.post("/razorpay", async (req, res) => {
  const amount = Number(req.body.amount)
  var options = {
    amount: String(amount), // 500 * 100
    currency: "INR",
  }
  instance.orders.create(options, function (err, order) {
    console.log(order)
    res.status(200).json(order)
  })
})

app.post("/razorpay/success", (req, res) => {
  res.render("success")
})

module.exports = app
