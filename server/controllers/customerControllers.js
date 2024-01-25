const express = require("express");
const Customer = require("../models/customer");
const customerValidation = require("../middlewares/validations");
const bcrypt = require("bcrypt");
const xss = require("xss");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middlewares/EmailSender");

require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;
const refreshKey = process.env.REFRESH_KEY;

async function createCustomer(req, res) {
  const { name, phone, email, nationality, password } = req.body;
  const realName = xss(name);
  const realPhone = xss(phone);
  const realEmail = xss(email);
  const realNationality = xss(nationality);
  const realPass = xss(password);
  const customer_photo = req.file ? req.file.path : null;

  const validationErrors = customerValidation.validateCustomer(
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
            const existingCustomer = await Customer.findOne({
              email: realEmail,
            });
            if (existingCustomer) {
              return res
                .status(400)
                .json({ err: "Email is already in use, try something else" });
            } else {
              // Create a new customer
              const newCustomer = new Customer({
                name: realName,
                phone: realPhone,
                email: realEmail,
                nationality: realNationality,
                password: hash,
                customer_photo: customer_photo,
              });
              await newCustomer.save();
              res.status(200).json("Customer created successfully");
              sendEmail.sendWelcomeEmail(newCustomer._id, email, password);
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

async function loginCustomer(req, res) {
  try {
    const { email, password } = req.body;
    const realEmail = xss(email);
    const realPass = xss(password);

    // SEARCHING THE Customer AND COMPARE

    const checkCustomer = await Customer.findOne({
      email: realEmail,
    });

    if (!checkCustomer || !(await bcrypt.compare(realPass, checkCustomer.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!checkCustomer.valid_account || checkCustomer.isDeleted) {
      if (!checkCustomer.valid_account) {
        return res
          .status(401)
          .json({
            error: "Your account is not valid. Please check your email.",
          });
      } else {
        return res
          .status(401)
          .json({ error: "No Customer Found. Please Register" });
      }
    }

    // GENERATING A TOKEN
    const token = jwt.sign(
      { customerId: checkCustomer._id, isDeleted: checkCustomer.isDeleted },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign({ id: checkCustomer.id }, refreshKey, {
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

async function validationCustomer(req, res) {
  const customerid = req.params.id;
  try {
    const customer = await Customer.findById(customerid);
    if (!customer) {
      throw new Error("No such Customer");
    } else {
      if (customer._id) {
        customer.valid_account = true;
        customer.save();
        // res.redirect();
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function profileCustomer(req, res) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.send("Invalid Token");
      } else {
        const customerid = decoded.customerId;
        const customer = await Customer.findById(customerid, {
          password: 0,
          valid_account: 0,
        });
        if (customer) {
          customer.valid_account = true;
          console.log(customer);
          res.json(customer);
        } else {
          res.status(404).json({ error: "customer not found" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

async function searchCustomer(req, res) {
  const sort = req.query.sort === "DESC" ? -1 : 1;
  const query = req.query.query || "";
  try {
    const customer = await Customer.find({
      name: new RegExp(query, "i"),
    }).sort({ createdAt: sort });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getCustomerId(req, res) {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function allCustomers(req, res) {
  try {
    const customer = await Customer.find({});
    if (!customer) {
      throw new Error("No Customers Found");
    } else {
      res.status(200).json(customer);
    }
  } catch {
    res.status(500).json({ error: "Error in fetching customers." });
  }
}

async function updateCustomer(req, res) {
  const customerId = req.params.id;
  const { name, phone, email, nationality } = req.body;

  try {
    const customer = await Customer.findByIdAndUpdate(customerId, {
      name,
      phone,
      email,
      nationality,
    });

    if (!customer) {
      throw new Error("No such Customer");
    } else {
      res.status(200).json("Customer updated successfully");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateIdCustomer(req, res) {
  const customerId = req.params.id;
  const { old_password, new_password, name, phone, email, nationality } =
    req.body;

  const customer_photo = req.file ? req.file.path : null;

  try {
    const customer = await Customer.findById(customerId);

    const isPasswordValid = await bcrypt.compare(old_password, customer.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    customer.customer_photo = customer_photo;
    customer.name = name;
    customer.phone = phone;
    customer.email = email;
    customer.nationality = nationality;
    customer.password = hashedNewPassword;

    await customer.save();
    customer.valid_account = true;
    res.json(customer);
    console.log(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCustomer(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const customerId = decodedToken.customerId;
    // const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    // if (deletedCustomer) {
    //   res.json(`Customer with ID ${customerId} deleted successfully`);
    // } else {
    //   res.status(404).json(`Customer with ID ${customerId} not found`);
    // }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { isDeleted: true },
      { new: true }
    );

    if (updatedCustomer) {
      res.json(`Customer with ID ${customerId} marked as deleted`);
      // res.redirect()
    } else {
      res.status(404).json(`Customer with ID ${customerId} not found`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

module.exports = {
  createCustomer: createCustomer,
  loginCustomer: loginCustomer,
  validationCustomer: validationCustomer,
  searchCustomer: searchCustomer,//a revoir
  getCustomerId: getCustomerId,
  allCustomers: allCustomers,
  updateCustomer: updateCustomer,
  updateIdCustomer: updateIdCustomer,
  deleteCustomer: deleteCustomer,
  profileCustomer: profileCustomer,
};