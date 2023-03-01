const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")

router.post('/addgame', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.id)
    try{
      const token = request.token
      if(!token){
        return response.status(401).json({ error: 'missing or invalid token' })
      }
  
      const user = await User.findById(token.id)
      if(!user) response.status(400).json({ error: 'user not found' })
  
      const newGame = {
        slug: body.slug,
        completed: body.completed,
        radar: body.radar
      }
  
      user.games.push(newGame)
      await user.save()
      
      response.status(204).end()
    }
    catch (error){
      next(error)
    }
  })

  router.patch('/updategame', async (request, response, next) => {
    const body = request.body

    try{
      const token = request.token
      if(!token){
        return response.status(401).json({ error: 'missing or invalid token' })
      }
  
      const user = await User.findById(token.id)
      if(!user) response.status(400).json({ error: 'user not found' })

      const game = user.games.find(game => game.slug === body.slug)
      if(!game) response.status(400).json({ error: 'game not found' }) 

      if (body.completed === true) game.completed = !game.completed

      else game.radar = !game.radar

      await user.save()
      response.status(200).send(game)
    }
    catch (error){
      next(error)
    }
    
  })
    
 


  module.exports = router