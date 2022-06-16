const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1]
    const clearToken = jwt.verify(token, "VERIFY_AND_CHECK_JWT_TOKEN")
    const userId = clearToken.userId
    if(req.body.userId && req.body.userId != userId){
      throw "ID utilisateur invalide"
    }else{
      next()
    }

  }catch(err){
     res.status(403).json({message: err.message})
  }
}

