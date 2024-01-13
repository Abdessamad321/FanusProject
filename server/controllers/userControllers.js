const express = require("express");
const User = require("../models/User");
const userValidation = require("../middlewares/validations");
const bcrypt = require("bcrypt");
const xss = require("xss");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

// create user logic ==============================

async function createUser(req, res) {
  const { name, phone, email, nationality, password } = req.body;
  const realName = xss(name);
  const realPhone = xss(phone);
  const realEmail = xss(email);
  const realNationality = xss(nationality);
  const realPass = xss(password);
  const photo = req.file ? req.file.path : null;

  const validationErrors = userValidation.validateUser(
    realName,
    realPhone,
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
              email: realEmail,
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

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const realEmail = xss(email);
    const realPass = xss(password);
    console.log(email, password);

    // SEARCHING THE User AND COMPARE

    const checkUser = await User.findOne({ email: realEmail });

    if (!checkUser || !(await bcrypt.compare(realPass, checkUser.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // GENERATING A TOKEN
    const token = jwt.sign(
      { userId: checkUser._id, isDeleted: checkUser.isDeleted },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign({ id: checkUser.id }, refreshKey, {
      expiresIn: "60s",
    });
    console.log(token);
    console.log(refreshToken);
    return res.status(200).json({
      access_token: token,
      token_type: "jwt",
      expires_in: "1h",
      refresh_token: refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, phone, email, nationality } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      name,
      phone,
      email,
      nationality,
    });

    if (!user) {
      throw new Error("No such User");
    } else {
      res.status(200).json("User updated successfully");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// async function updateIdUser(req, res) {
//   const userId = req.params.id;
//   const { old_password, new_password, name, email } = req.body;

//   const photo = req.file ? req.file.path : null;

//   try {
//     const user = await User.findById(userId);

//     const isPasswordValid = await bcrypt.compare(
//       old_password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid old password" });
//     }

//     const hashedNewPassword = await bcrypt.hash(new_password, 10);
//     user.photo = photo;
//     user.name = name;
//     user.email = email;
//     user.password = hashedNewPassword;

//     await user.save();

//     res.json(user);
//     console.log(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

async function deleteUser(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.json(`User with ID ${userId} deleted successfully`);
    } else {
      res.status(404).json(`User with ID ${userId} not found`);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
}

module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  updateUser: updateUser,
  // updateIdUser: updateIdUser,
  deleteUser: deleteUser,
};
