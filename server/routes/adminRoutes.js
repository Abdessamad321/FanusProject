const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");

router.post("/admin", adminControllers.createAdmin);

router.post("/admin/login", redirectToRole, adminControllers.loginAdmin);

router.get('/admin/:id', adminControllers.getAdminId);

router.put('/admin/:id', adminControllers.updateAdmin);

router.delete('/admin/:id', adminControllers.deleteAdmin);

// router.post('/admin/password/reset/:token', adminControllers.setNewPass)

module.exports = router;
