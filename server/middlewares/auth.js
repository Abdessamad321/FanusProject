const express = require("express");

function redirectToRole(req, res, next) {
    // Assuming that your authentication middleware sets the user/admin information in req.user or req.admin
    const { user, admin } = req;
  
    if (admin) {
      // Redirect to admin dashboard
      return res.redirect('/admin/dashboard');
    } else if (user) {
      // Redirect to user store
      return res.redirect('/store');
    }
  
    // Continue to the next middleware or route handler
    next();
  }
  
  module.exports = redirectToRole;
  