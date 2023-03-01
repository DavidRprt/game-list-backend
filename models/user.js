const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const gameSchema = new mongoose.Schema(
  {
    slug: String,
    completed: Boolean,
    radar: Boolean
  }, { _id : false }
)

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true
      },
      passwordHash: {
        type: String,
        required: true,
      },
      games: [gameSchema]
    }, 
    { versionKey: false }) 



    userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })
    
    module.exports = mongoose.model("User", userSchema);
  

   