const mongoose = require('mongoose');
const { Schema } = mongoose;

const blueprintSchema = new Schema({
  blueprintName: String,
  // resources: [{
  //   resourceName: String,
  //   required: Boolean,
  //   database: String,
  //   type: { type: String},
  //   props: [{
  //     propName: String,
  //     type: { type: String},

    // }]
  // }]
  resources: [String],
  relatives: [String]

})


const userSchema = new Schema({
  email: String,
  blueprints: [blueprintSchema]
});

const model = mongoose.model('User', userSchema);

module.exports = model;

