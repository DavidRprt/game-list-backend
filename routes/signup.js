const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require('bcrypt')
const { error } = require('../utils/logger')
const middleware = require('../utils/middleware')


router.post('/', async (request, response, next) => {
  const { username, password } = request.body

  if (username.length < 3 || password.length < 3) {
    response.status(409).send("Both password and username must be at least 3 characters  long")
  }

  else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      passwordHash
    })
    
    try {
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    }
    catch (error) {
      next(error)
  }}

  })

  module.exports = router