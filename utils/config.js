const dotenv = require('dotenv').config()

require('dotenv').config()

const PORT = process.env.PORT || 3001

const SECRET = process.env.SECRET

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_URL
  : process.env.URL


module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}