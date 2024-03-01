const express = require("express");

function validateUser(name, email, phone, password) {
  const errors = [];
  if (!name || !name.match(/^[A-Za-z ]+$/)) {
    errors.push("Enter your name; only letters allowed.");
  }
  if (
    !email ||
    !email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
  ) {
    errors.push("Invalid email address.");
  }
  if (!phone || !phone.match(/^[0-9()+\s-]{8,20}$/)) {
    errors.push(
      "Enter your phone; only numbers, spaces, '+', and '-' allowed."
    );
  }
  if (!password || password.length < 6) {
    errors.push("Password should be at least 6 characters.");
  }
  return errors;
}

function validateCustomer(name, phone, email, password) {//nationality
  const errors = [];

  if (!name || !name.match(/^[A-Za-z ]+$/)) {
    errors.push("Enter your name; only letters allowed.");
  }

  if (!phone || !phone.match(/^[0-9()+\s-]{8,20}$/)) {
    errors.push(
      "Enter your phone; only numbers, spaces, '+', and '-' allowed."
    );
  }

  if (
    !email ||
    !email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
  ) {
    errors.push("Invalid email address.");
  }

  // if (!nationality || !nationality.match(/^[A-Za-z\u0080-\uFFFF ']+$/)) {
  //   errors.push("Invalid nationality.");
  // }

  if (!password || password.length < 6) {
    errors.push("Password should be at least 6 characters.");
  }

  return errors;
}

module.exports = {
  validateCustomer: validateCustomer,
  validateUser: validateUser,
};
