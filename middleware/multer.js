const multer = require("multer")
const uuid = require("uuid")

const v4 = uuid.v4()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1]
    const nameFile = file.originalname.split(" ").join("-")
    cb(null,  nameFile + "-" + v4 + "." + extension)
  }
})

module.exports = multer({storage}).single("image")