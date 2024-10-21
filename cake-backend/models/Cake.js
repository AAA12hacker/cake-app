const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  yumFactor: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const Cake = mongoose.model("Cake", cakeSchema);
module.exports = Cake;
