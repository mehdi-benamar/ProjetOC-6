const express = require("express")
const route = express.Router()
const sauceCtrl = require("../controllers/sauces")
const auth = require("../middleware/auth")
const multer = require("../middleware/multer")

route.post("/sauces", auth, multer, sauceCtrl.createSauce)
route.get("/sauces", auth, sauceCtrl.getAllSauces)
route.get("/sauces/:id", auth, sauceCtrl.getOneSauce)
route.put("/sauces/:id", auth, multer, sauceCtrl.updateOneSauce)
route.delete("/sauces/:id", auth, sauceCtrl.deleteOneSauce)
route.post("/sauces/:id/like", auth, sauceCtrl.likeOneSauce)

module.exports = route