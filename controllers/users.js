const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(() => res.status(201).json({ message: "Utisateur créé !" }))
        .catch(error => res.status(400).json({error}))
    })
}

exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({message: "Utilisateur non trouvé !"})
      }
      bcrypt.compare(req.body.password, user.password)
        .then(pwd => {
          if(!pwd){
            return res.status(401).json({message: "mot de passe incorrecte !"})
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({userId: user._id}, "VERIFY_AND_CHECK_JWT_TOKEN", {expiresIn: "12h"})
          })
        })
    })
}