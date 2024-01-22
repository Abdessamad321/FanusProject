const express = require("express");
const router = express.Router();

const { redirectToRole } = require('../middlewares/auth');
const adminControllers = require("../controllers/adminControllers");

router.post("/admin", adminControllers.createAdmin);

router.post("/admin/login", adminControllers.loginAdmin);//redirectToRole

router.get('/admin/:id', adminControllers.getAdminById);

router.get('/admins', adminControllers.getAllAdmins);

router.get('/admin/by-mail/:email', adminControllers.getAdminByMail);

router.get('/admin/by-name/:name', adminControllers.getAdminByName);

router.put('/admin/:id', adminControllers.updateAdmin);

router.delete('/admin/:id', adminControllers.deleteAdmin);

// router.post('/admin/password/reset/:token', adminControllers.setNewPass)


module.exports = router;
