const Sauce = require("../models/sauces")

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  console.log(sauceObject);
  const oneSauce = new Sauce({
    ...sauceObject,
    likes: 0,
    disLikes: 0,
    usersLiked: [],
    usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  })

  oneSauce.save()
    .then(() => res.status(201).json({message: "Votre sauce a été créée !"}))
    .catch(err => res.status(400).json({err}))
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({err}))
}