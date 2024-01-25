const express = require("express");
const xss = require("xss");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userValidation = require("../middlewares/validations");
require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

async function createUser(req, res) {
  const { name, email, phone, password } = req.body;
  const realName = xss(name);
  const realEmail = xss(email);
  const realPhone = xss(phone);
  const realPass = xss(password);

  const validationErrors = userValidation.validateUser(
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
            const existingUser = await User.findOne({ email: realEmail });
            if (existingUser) {
              return res
                .status(400)
                .json({ err: "Email is already in use, try something else" });
            } else {
              const newUser = await User.create({
                name: realName,
                email: realEmail,
                phone: realPhone,
                password: hash,
              });

              res.status(201).json(`signed in ${newUser}`);
            }
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ err: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const realEmail = xss(email);
    const realPass = xss(password);
    const checkUser = await User.findOne({ email: realEmail });
    if (!checkUser) {
      return res.status(401).json("invalid credentials");
    } else {
      const passwordMatch = await bcrypt.compare(realPass, checkUser.password);
      if (!passwordMatch) {
        return res.status(401).json("invalid credentials");
      } else {
        const token = jwt.sign(
          { userId: checkUser.id, email: checkUser.email },
          secretKey,
          { expiresIn: "24h" }
        );
        const refreshToken = jwt.sign({ userId: checkUser.id }, refreshKey, {
          expiresIn: "500h",
        });
        await checkUser.save();
        console.log(token);
        return res.status(200).json({
          access_token: token,
          token_type: "jwt",
          expires_in: "1h",
          refresh_token: refreshToken,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
}

async function getUserById(req, res) {
  const userid = req.params.id;
  try {
    const getamdin = await User.findById(userid);
    if (getamdin) {
      res.status(200).json(getamdin);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const user = await User.find({});
    if (!user) {
      throw new Error("No users Found");
    } else {
      res.status(200).json(user);
    }
  } catch {
    res.status(500).json({ error: "Error in fetching users." });
  }
}

// const getUser = async (req, res) => {
//   const { email, name } = req.query;

//   try {
//     const user = await User.findOne({
//       $or: [
//         { email: email },
//         { name: name },
//       ],
//     });

//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

async function getUserByMail(req, res) {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found by mail.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function getUserByName(req, res) {
  const { name } = req.params;

  try {
    const user = await User.findOne({ name });
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found by name.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// async function updateUser(req, res) {
//   const userId = req.params.id;
//   const { name, email, phone, password } = req.body;
//   let updateData = { name, email, phone, password };

//   try {
//     const user = await User.findByIdAndUpdate(userId, updateData);

//     if (user) {
//       res.status(200).json({ message: "User updated successfully" });
//     } else {
//       res.status(404).json({ error: "No user found with the provided Id" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, email, phone, password } = req.body;
  const realName = xss(name);
  const realEmail = xss(email);
  const realPhone = xss(phone);
  const realPass = xss(password);

  const validationErrors = userValidation.validateUser(
    realName,
    realEmail,
    realPhone,
    realPass
  );
  if (validationErrors.length > 0) {
    return res.status(400).json({ err: validationErrors });
  }

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  let updateData = { name, email, phone };
  if (hashedPassword) {
    updateData.password = hashedPassword;
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (user) {
      res.status(200).json({ message: "User updated successfully", user });
    } else {
      res.status(404).json({ error: "No user found with the provided Id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.status(200).json("user deleted successfully");
    } else {
      res.status(404).json("no user found with the provided Id");
    }
  } catch (error) {
    res.json(error);
  }
}

// async function setNewPass (req, res) {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//       const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpiration: { $gt: Date.now() },
//       });
//       if (!user) {
//           return res.status(400).json({ message: 'Invalid or expired token' });
//       }
//       const hashedPass = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPass;
//       user.resetToken = null;
//       user.resetTokenExpiration = null;
//       await user.save();

//       return res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//   }
// };



module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  getUserById: getUserById,
  getAllUsers: getAllUsers,
  getUserByMail: getUserByMail,
  getUserByName: getUserByName,
  updateUser: updateUser,
  deleteUser: deleteUser,
  // setNewPass: setNewPass,
};
