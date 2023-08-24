const { Router } = require("express");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const user = Router();

user.post("/register", async (req, res) => {
  const { email,password } = req.body;
  try {
    const user = await userModel.find({email} );
    console.log(user)
    if (user.length !== 0) {
      res.send({ mesg: `user already registered` });
    } else {
      bcrypt.hash(password, 10,  (err, hash)=> {
        if(err){
          res.status(400).send({error:err.message});
        }else{
          const user = new userModel({...req.body,password:hash});
          user.save();
          res.status(201).send({ mesg: `user registered successfully` });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const arr = await userModel.find({ email });
    if (arr.length === 0) {
      res.status(400).send({mesg: `Unable find user with given email, please login first`,});
    } else {
      let ary = arr.map((el) => (el.password ? el.password : null));
      let userid=arr.map((el)=>el._id?el._id:null);
      bcrypt.compare(password, ary[0], (err, result)=> {
        if(err){
          res.status(400).send({error:err.message})
        }
        if(result){
          res.status(200).send({mesg: `User logged in successfully`,token: jwt.sign({ userId: userid[0] }, "mock13", 
          { expiresIn: "12h" }),userDetails:arr});
        }else {
          res.status(400).send({ error: `Invalid password, please enter a correct password` });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { user };