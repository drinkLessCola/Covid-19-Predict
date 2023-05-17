const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  hostURL: process.env.HOST_URL,
  port: process.env.PORT
}