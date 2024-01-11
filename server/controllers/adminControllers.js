const express = require("express");
const xss = require("xss");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const adminValidation = require("../middlewares/validations");
require('dotenv').config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

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

async function loginAdmin (req, res){
    try {
        const {email, password}= req.body;
        const realEmail = xss(email);
        const realPass = xss(password);
        const checkAdmin = await admin.findOne({email: realEmail})
        if (!checkAdmin) {
            return res.status(401).json('invalid credentials')
        }else{
            const passwordMatch = await bcrypt.compare(realPass, checkAdmin.password)
                if (!passwordMatch ) {
                    return res.status(401).json('invalid credentials')
                }else{
                    const token = jwt.sign( {adminId: checkAdmin.id, email: checkAdmin.email}, secretKey, {expiresIn: '24h'});
                    const refreshToken = jwt.sign({adminId: checkAdmin.id}, refreshKey, {expiresIn: '500h'});
                    await checkAdmin.save();
                    console.log(token)
                    return res.status(200).json(
                        {
                            "access_token": token,
                            "token_type": "jwt",
                            "expires_in": "90s",
                            "refresh_token": refreshToken,
                        })
                }    
        }
    } catch (error) {
        res.status(500).json({err:error.message})
    }
    
}

async function updateAdmin(req, res) {
  const userId = req.params.id;
  const { name, email, phone, password } = req.body;

  const validationErrors = adminValidation.validateAdmin(name, phone, email, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  let updateData = { name, email, phone};
  if (hashedPassword) {
    updateData.password = hashedPassword;
  }

  try {
    const user = await  Admin.findByIdAndUpdate(userId, updateData, { new: true });
    if (user) {
      res.status(200).json({ message: 'User updated successfully', user });
    } else {
      res.status(404).json({ error: 'No user found with the provided Id' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createAdmin: createAdmin,
  loginAdmin: loginAdmin,
  updateAdmin: updateAdmin
};
