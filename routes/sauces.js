const express = require("express")
const route = express.Router()
const auth = require("../middleware/auth")

route.get("/sauces", (req, res, next) => {
  console.log(req.headers.authorization);
})

module.exports = route