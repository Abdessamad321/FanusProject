const express = require("express");
const xss = require("xss");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const adminValidation = require("../middlewares/validations");

async function createAdmin(req, res) {
  const { name, email, phone, password } = req.body;
  const realName = xss(name);
  const realEmail = xss(email);
  const realPhone = xss(phone);
  const realPass = xss(password);

  const validationErrors = adminValidation.validateAdmin(
    realName,
    realEmail,
    realPhone,
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
            const existingAdmin = await admin.findOne({ email: realEmail });
            if (existingAdmin) {
              return res
                .status(400)
                .json({ err: "Email is already in use, try something else" });
            } else {
              const newAdmin = await admin.create({
                name: realName,
                email: realEmail,
                phone: realPhone,
                password: hash,
              });

              res.status(201).json(`signed in ${newAdmin}`);
            }
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ err: "Internal server error" });
  }
}

module.exports = {
  createAdmin: createAdmin,
};
