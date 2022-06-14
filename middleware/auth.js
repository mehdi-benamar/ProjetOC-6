const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1]
    const clearToken = jwt.verify(token, "VERIFY_AND_CHECK_JWT_TOKEN")
    const userId = clearToken.userId
    req.headers.userId = clearToken.userId
    if(req.headers.userId && req.headers.userId !== userId){
      throw new Error("ID utilisateur invalide")
    }else{
      next()
    }

  }catch(err){
    return res.status(401).json({message: err.message})
  }
}

