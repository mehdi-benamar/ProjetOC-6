const mongoose = require("mongoose")

const sauceSchema = mongoose.Schema({
  userId: {type: String},
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z ]*$/.test(v);
      },
      message: props => `${props.value} n'est pas une donnée valide`
    }
  },
  manufacturer: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z ]*$/.test(v);
      },
      message: props => `${props.value} n'est pas une donnée valide`
    }
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z ]*$/.test(v);
      },
      message: props => `${props.value} n'est pas une donnée valide`
    }
  },
  mainPepper: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z ]*$/.test(v);
      },
      message: props => `${props.value} n'est pas une donnée valide`
    }
  },
  imageUrl: {type: String},
  heat: {type: Number, default: 0},
  likes: {type: Number, default: 0},
  dislikes: {type: Number, default: 0},
  usersLiked: {type: Array},
  usersDisliked: {type: Array}
})

module.exports = mongoose.model("Sauces", sauceSchema)