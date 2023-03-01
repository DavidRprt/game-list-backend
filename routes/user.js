const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")


router.get('/:id', async (request, response) => {
    try {
      const user = await User.findById(request.params.id)
      response.json(user)
    } catch (error) {
      response.status(404).send()
    }
  })

  module.exports = router