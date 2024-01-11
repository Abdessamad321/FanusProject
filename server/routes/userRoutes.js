const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')
// const upload = require('../../middlewares/Cloudinary')


router.post('/user', userControllers.createUser);

router.post("/user/login", userControllers.loginUser);

router.put("/user/:id", userControllers.updateUser);

// router.patch("/user/update/:id", userControllers.updateIdUser);//upload.single('photo')

router.delete("/user/delete", userControllers.deleteUser);


module.exports = router