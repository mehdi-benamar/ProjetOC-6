const Sauce = require("../models/sauces")

exports.createSauce = (req, res, next) => {
  const sauce = new Sauce({
    ...req.body,
    likes: 0,
    disLikes: 0,
    usersLiked: [],
    usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  })

  sauce.save()
    .then(res.status(201).json({message: "Votre sauce a été créée !"}))
    .catch(err => res.status(400).json({err}))
}