const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")
const authRoute = require("./routes/users")
const sauceRoute = require("./routes/sauces")

dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@projet6.qwy3bra.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connexion à la base MongoDB réussie"))
.catch((err) => console.log("Echec de la connexion à la base MongoDB"))


const app = express()
app.use(express.json())


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use("/images", express.static(path.join(__dirname, "images")))

app.use("/api/auth", authRoute)
app.use("/api", sauceRoute)

module.exports = app