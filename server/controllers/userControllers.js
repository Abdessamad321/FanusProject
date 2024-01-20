const express = require("express");
const User = require("../models/User");
const userValidation = require("../middlewares/validations");
const bcrypt = require("bcrypt");
const xss = require("xss");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middlewares/EmailSender");

require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

async function createUser(req, res) {
  const { name, phone, email, nationality, password } = req.body;
  const realName = xss(name);
  const realPhone = xss(phone);
  const realEmail = xss(email);
  const realNationality = xss(nationality);
  const realPass = xss(password);
  const user_photo = req.file ? req.file.path : null;

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
                user_photo: user_photo,
              });
              await newUser.save();
              res.status(200).json("User created successfully");
              sendEmail.sendWelcomeEmail(newUser._id, email, password);
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

    // SEARCHING THE User AND COMPARE

    const checkUser = await User.findOne({
      email: realEmail,
    });

    if (!checkUser || !(await bcrypt.compare(realPass, checkUser.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!checkUser.valid_account || checkUser.isDeleted) {
      if (!checkUser.valid_account) {
        return res
          .status(401)
          .json({
            error: "Your account is not valid. Please check your email.",
          });
      } else {
        return res
          .status(401)
          .json({ error: "No User Found. Please Register" });
      }
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

async function validationUser(req, res) {
  const userid = req.params.id;
  try {
    const user = await User.findById(userid);
    if (!user) {
      throw new Error("No such User");
    } else {
      if (user._id) {
        user.valid_account = true;
        user.save();
        // res.redirect();
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function profileUser(req, res) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.send("Invalid Token");
      } else {
        const userid = decoded.userId;
        const user = await User.findById(userid, {
          password: 0,
          valid_account: 0,
        });
        if (user) {
          user.valid_account = true;
          console.log(user);
          res.json(user);
        } else {
          res.status(404).json({ error: "user not found" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

async function searchUser(req, res) {
  const sort = req.query.sort === "DESC" ? -1 : 1;
  const query = req.query.query || "";
  try {
    const user = await User.find({
      name: new RegExp(query, "i"),
    }).sort({ createdAt: sort });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getUserId(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function allUsers(req, res) {
  try {
    const user = await User.find({});
    if (!user) {
      throw new Error("No Users Found");
    } else {
      res.status(200).json(user);
    }
  } catch {
    res.status(500).json({ error: "Error in fetching users." });
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

async function updateIdUser(req, res) {
  const userId = req.params.id;
  const { old_password, new_password, name, phone, email, nationality } =
    req.body;

  const user_photo = req.file ? req.file.path : null;

  try {
    const user = await User.findById(userId);

    const isPasswordValid = await bcrypt.compare(old_password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    user.user_photo = user_photo;
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.nationality = nationality;
    user.password = hashedNewPassword;

    await user.save();
    user.valid_account = true;
    res.json(user);
    console.log(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    // const deletedUser = await User.findByIdAndDelete(userId);
    // if (deletedUser) {
    //   res.json(`User with ID ${userId} deleted successfully`);
    // } else {
    //   res.status(404).json(`User with ID ${userId} not found`);
    // }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    if (updatedUser) {
      res.json(`User with ID ${userId} marked as deleted`);
      // res.redirect()
    } else {
      res.status(404).json(`User with ID ${userId} not found`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  validationUser: validationUser,
  searchUser: searchUser,
  getUserId: getUserId,
  allUsers: allUsers,
  updateUser: updateUser,
  updateIdUser: updateIdUser,
  deleteUser: deleteUser,
  profileUser: profileUser,
};
