const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')

// const redirectToRole = require('../../middlewares/auth');
const upload = require('../middlewares/Cloudinary')

router.post('/user', upload.single('user_photo'), userControllers.createUser);

router.post("/user/login", userControllers.loginUser);// redirectToRole,

router.get("/user/profile", userControllers.profileUser);

router.get("/users", userControllers.searchUser);// a revoir

router.get("/user/:id", userControllers.getUserId);

router.get("/users", userControllers.allUsers);

router.get("/user/validate/:id", userControllers.validationUser);

router.put("/user/:id", userControllers.updateUser);

router.patch("/user/update/:id", upload.single('user_photo'), userControllers.updateIdUser);//upload.single('photo')

// router.delete("/user/delete", userControllers.deleteUser);

router.patch("/user/delete", userControllers.deleteUser);

module.exports = router