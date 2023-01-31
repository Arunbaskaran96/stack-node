const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("company", CompanySchema);
