const express = require('express');

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : null;
    const adminRole = req.admin ? req.admin.role : null;

    if (allowedRoles.includes(userRole) || allowedRoles.includes(adminRole)) {
      next();
    } else {
        res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }
    };
};
  
module.exports = checkRole;  
