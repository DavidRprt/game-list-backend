const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

router.post('/', async (request, response, next) => {
    const { username, password } = request.body
    const user = await User.findOne({ username: username })
    if (user == null) {
        response.status(403).json({error: "The username is incorrect"})
    }
    else {
        const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
        if (!passwordCorrect){
            response.status(401).json({error: 'invalid username or password'})
        }
        else {
            const userForToken = {
                username: user.username,
                id: user._id,
              }
            
              try{
                const token = jwt.sign(
                    userForToken, 
                    config.SECRET,
                    { expiresIn: 60*60 }
                  )
                response.status(200).send({ token, username: user.username, id: user._id, games: user.games })
              }
              catch (err){
                next(err)
              }
              
        }

    }
  })

module.exports = router