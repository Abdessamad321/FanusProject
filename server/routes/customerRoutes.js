const express = require("express");
const router = express.Router();
const customerControllers = require("../controllers/customerControllers");

// const redirectToRole = require('../../middlewares/auth');
const upload = require("../middlewares/Cloudinary");

router.post("/create",upload.single("customer_photo"), customerControllers.createCustomer);

router.post("/login", customerControllers.loginCustomer); // redirectToRole,

router.get("/list", customerControllers.allCustomers);

router.get("/profile", customerControllers.profileCustomer);

// a revoir
// router.get("/customers", customerControllers.searchCustomer);

router.get("/:id", customerControllers.getCustomerId);

router.get("/validate/:id", customerControllers.validationCustomer);

router.put("/:id",upload.single("customer_photo"), customerControllers.updateCustomer);

// router.patch("/update/:id", upload.single("customer_photo"), customerControllers.updateIdCustomer); 
// delete
// router.delete("/:id", customerControllers.deleteCustomer);

// router.post("/verifyPassword/:id", customerControllers.verifyPassword);

router.patch(
  "/update/:id",
  customerControllers.updatePassCustomer
); 

// router.delete("/customer/delete", customerControllers.deleteCustomer);

router.patch("/delete/:id", customerControllers.deleteCustomer);

router.post("/delete-email", customerControllers.deletionEmail);

router.post("/refresh/token", customerControllers.refreshTokens);

router.post('/password/reset', customerControllers.resetRquist);

router.get('/password/reset/verify/:token', customerControllers.verifyResetToken);

router.post('/password/reset/update/:token', customerControllers.setNewPass);

// router.post("/authpost", customerControllers.authPost);

module.exports = router;
