const mongoose = require("mongoose")

const connection = () => {
  return mongoose
    .connect(
      "mongodb+srv://ikea:p24CLxLSTjYKr04T@cluster0.n4t5z.mongodb.net/IKEA"
    )
    .then(() => {
      console.log("Connected")
    })
}

module.exports = connection
