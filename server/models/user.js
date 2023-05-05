const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Zumby = require("./zumby")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  name: String,
  surname: String,
  passwordHash: {
    type: String,
    required: true
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  image: {
    type: String,
  },
  bio: {
    type: String,
    maxLength: 240
  },
  zumbies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zumby'
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zumby'
    }
  ]
  
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
