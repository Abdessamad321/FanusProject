const express = require("express");
const router = express.Router();
const customerControllers = require("../controllers/customerControllers");

// const redirectToRole = require('../../middlewares/auth');
const upload = require("../middlewares/Cloudinary");

router.post("/customer", upload.single("customer_photo"), customerControllers.createCustomer);

router.post("/customer/login", customerControllers.loginCustomer); // redirectToRole,

router.get("/customer/profile", customerControllers.profileCustomer);

router.get("/customers", customerControllers.searchCustomer); // a revoir

router.get("/customer/:id", customerControllers.getCustomerId);

router.get("/customers", customerControllers.allCustomers);

router.get("/customer/validate/:id", customerControllers.validationCustomer);

router.put("/customer/:id", customerControllers.updateCustomer);

router.patch(
  "/customer/update/:id",
  upload.single("customer_photo"),
  customerControllers.updateIdCustomer
); //upload.single('photo')

// router.delete("/customer/delete", customerControllers.deleteCustomer);

router.patch("/customer/delete", customerControllers.deleteCustomer);

module.exports = router;
