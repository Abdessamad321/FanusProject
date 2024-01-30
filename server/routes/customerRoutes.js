const express = require("express");
const router = express.Router();
const customerControllers = require("../controllers/customerControllers");

// const redirectToRole = require('../../middlewares/auth');
const upload = require("../middlewares/Cloudinary");

router.post("/create", customerControllers.createCustomer);//upload.single("customer_photo"), 

router.post("/login", customerControllers.loginCustomer); // redirectToRole,

router.get("/list", customerControllers.allCustomers);

router.get("/profile", customerControllers.profileCustomer);

// a revoir
// router.get("/customers", customerControllers.searchCustomer);

router.get("/:id", customerControllers.getCustomerId);

router.get("/validate/:id", customerControllers.validationCustomer);

router.put("/:id", customerControllers.updateCustomer);

router.patch(
  "/update/:id",
  upload.single("customer_photo"),
  customerControllers.updateIdCustomer
); //upload.single('photo')

// router.delete("/customer/delete", customerControllers.deleteCustomer);

router.patch("/delete", customerControllers.deleteCustomer);

module.exports = router;
