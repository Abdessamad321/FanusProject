const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");

router.post("/admin", adminControllers.createAdmin);

router.post("/admin/login", adminControllers.loginAdmin);

router.put('/admin/:id', adminControllers.updateAdmin)

router.delete('/admin/:id', adminControllers.deleteAdmin)

module.exports = router;
