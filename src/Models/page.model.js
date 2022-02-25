const mongoose = require("mongoose")

var Schema = mongoose.Schema

var pageSchema = new Schema({
  Category: {
    type: String,
    required: true,
  },
  mainCategory: {
    type: String,
    required: true,
  },
  mainSubCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: Array,
    required: true,
  },
  mainHeading: {
    type: String,
    required: true,
  },
  mainDesc: {
    type: String,
    required: true,
  },
  pageData: {
    type: Array,
    required: true,
  },
})

var page = mongoose.model("page", pageSchema)

module.exports = page
