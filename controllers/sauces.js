const Sauce = require("../models/sauces")
const fs = require("fs")

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
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

exports.getOneSauce = (req, res, next) => {
    Sauce.findById({_id: req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(err => res.status(400).json({err}))
}

exports.updateOneSauce = (req, res, next) => {
    if(!req.file){
      Sauce.updateOne({_id: req.params.id}, {...req.body})
        .then(() => res.status(200).json({message: "Sauce mise à jour"}))
        .catch(err => res.status(400).json({err}))
    }else{
      Sauce.findById({_id: req.params.id})
        .then(sauce => {
          const oldImage = sauce.imageUrl.split("/images/")[1]
          const sauceObject = JSON.parse(req.body.sauce)
          fs.unlink("images/" + oldImage, () => {
            Sauce.updateOne({_id: req.params.id}, {
              ...sauceObject,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            })
            .then(() => res.status(200).json({message: "Sauce mise à jour"}))
            .catch(err => res.status(400).json({err}))
          })
        })
        .catch(err => res.status(400).json({err}))
    }
}

exports.deleteOneSauce = (req, res, next) => {
  Sauce.findById({_id: req.params.id})
    .then(sauce => {
      const oldImage = sauce.imageUrl.split("/images/")[1]
      fs.unlink("images/" + oldImage, () => {
        Sauce.deleteOne({_id: sauce._id})
          .then(() => res.status(200).json({message: "Sauce supprimée !"}))
          .catch(err => res.status(400).json({err}))
      })
    })
    .catch(err => res.status(400).json({err}))
}

exports.likeOneSauce = (req, res, next) => {

      if(req.body.like === 1){
        Sauce.updateOne({_id: req.params.id}, {$push: {usersLiked: req.body.userId}, $inc:{likes: 1}})
          .then(() => res.status(200).json({message: "Like ajouté"}))
          .catch(err => res.status(400).json({err}))

      }
      else if(req.body.like === -1){
        Sauce.updateOne({_id: req.params.id}, {$push: {usersDisliked: req.body.userId}, $inc:{dislikes: 1}})
          .then(() => res.status(200).json({message: "Dislike ajouté"}))
          .catch(err => res.status(400).json({err}))

      }
      else{
        Sauce.findOne({_id: req.params.id})
          .then(sauce => {
            const tabUsersLiked = sauce.usersLiked.find(id => id === req.body.userId)
            const tabUsersDisliked = sauce.usersDisliked.find(id => id === req.body.userId)
            if(tabUsersLiked){
              Sauce.updateOne({_id: sauce._id}, {$pull: {usersLiked: req.body.userId}, $inc:{likes: -1}})
                .then(() => res.status(200).json({message: "Like supprimé !"}))
                .catch(err => res.status(400).json({err}))
            }
            if(tabUsersDisliked){
              Sauce.updateOne({_id: sauce._id}, {$pull: {usersDisliked: req.body.userId}, $inc:{dislikes: -1}})
                .then(() => res.status(200).json({message: "Dislike supprimé !"}))
                .catch(err => res.status(400).json({err}))
            }
          })
          .catch(err => res.status(400).json({err}))
      }
}