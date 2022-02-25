const mongoose = require("mongoose")

var Schema = mongoose.Schema

var mainSubCategorySchema = new Schema({
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

var mainSubCategory = mongoose.model("mainSubCategory", mainSubCategorySchema)
