const express = require("express")
const route = express.Router()
const sauceCtrl = require("../controllers/sauces")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")

route.post("/sauces", auth, multer, sauceCtrl.createSauce)
route.get("/sauces", auth, sauceCtrl.getAllSauces)

module.exports = route