const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const productSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },

  description: {
    required: [true, "description here!"],
    type: String,
    maxlength: 1000,
  },
  price: {
    required: true,
    type: Number,
    maxlength: 255,
  },
  image: {},
});

//when we activate pagination, this works
productSchema.plugin(aggregatePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = {
  Product
};
