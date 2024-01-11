const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')


router.post('/user', userControllers.createUser)

router.post("/user/login", userControllers.loginUser);

router.put("/user/:id", userControllers.updateUser);

router.delete("/user/delete", userControllers.deleteUser);




module.exports = router
