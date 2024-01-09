const express = require("express");
const User = require("../models/User");
const userValidation = require("../middlewares/validations");
const bcrypt = require("bcrypt");
const xss = require("xss");
const jwt = require("jsonwebtoken");

// create user logic ==============================

async function createUser(req, res) {
  const { name, phone, role, email, nationality, password } = req.body;
  const realName = xss(name);
  const realPhone = xss(phone);
  const realEmail = xss(email);
  const realNationality = xss(nationality);
  const realPass = xss(password);
  const photo = req.file ? req.file.path : null;

  const validationErrors = userValidation.validateUser(
    realName,
    realPhone,
    role,
    realEmail,
    realNationality,
    realPass
  );
  if (validationErrors.length > 0) {
    return res.status(400).json({ err: validationErrors });
  }

  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ err: "Internal server error" });
      } else {
        bcrypt.hash(realPass, salt, async (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ err: "Internal server error" });
          } else {
            const existingUser = await User.findOne({
              email: realEmail
            });
            if (existingUser) {
              return res
                .status(400)
                .json({ err: "Email is already in use, try something else" });
            } else {
              // Create a new user
              const newUser = new User({
                name: realName,
                phone: realPhone,
                role: role,
                email: realEmail,
                nationality: realNationality,
                password: hash,
                photo: photo,
              });
              await newUser.save();
              res.status(200).json("User created success");
            }
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}




module.exports = {
  createUser: createUser,
};
