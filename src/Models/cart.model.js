const mongoose = require("mongoose")

var Schema = mongoose.Schema

var cartSchema = new Schema({
  cartItem: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})

var Cart = mongoose.model("cart", cartSchema)

module.export = Cart
