const router = require("express").Router();
const User = require('../models/User.model');
const fileUploader = require("../config/cloudinary.config");
const {isAuthenticated} = require("../middlewares/jwt.middleware");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload", fileUploader.single("imageUrl"), (req,res,next) => {

  const {_id} = req.payload;


  if(!req.file){
      next(new Error("No file uploaded!"));
      return;
  }

  if(!mongoose.Types.ObjectId.isValid(_id)){
    res.status(400).json("Id is Invalid");
    return;
}

  User.findByIdAndUpdate(_id, {image: req.file.path}, {new: true})
  .then(() => console.log("User Successfully Updated"))
  .catch((err) => console.log("Error Updating", err))

  res.json({fileUrl: req.file.path})
})

router.get("/user", isAuthenticated, (req,res,next) => {
  const {_id} = req.payload;
  User.findById(_id)
  .then((foundUser) => {
      const {username, course, campus, image} = foundUser;
      const user = {
          username,
          course,
          campus,
          image
      }
      res.status(200).json({user: user});
  })
  .catch((err) => {
      res.status(500).json({message: "Internal Server Error"});
  })
})

router.put("/user",isAuthenticated, (req,res,next) => {
  const {_id} = req.payload;
  const {username, campus, course} = req.body;
  
  if(!mongoose.Types.ObjectId.isValid(_id)){
      res.status(400).json("Id is Invalid");
      return;
  }

  User.findByIdAndUpdate(_id, req.body, {new:true})
  .then((response) => res.json(response))
  .catch((err) => res.json(err));

})

module.exports = router;
