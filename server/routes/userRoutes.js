const express = require("express");
const router = express.Router();

const { redirectToRole } = require("../middlewares/auth");
const userControllers = require("../controllers/userControllers");

router.route("/create").post(userControllers.createUser);

router.route("/login").post(userControllers.loginUser);

router.route("/list").get(userControllers.getAllUsers);

//Merge into one route /search?keyword=value
// const user = await User.findOne({
//   $or: [
//     { email: keyword },
//     { name: keyword },
//   ],
// });
//Else 404 not found
// ==>
router.route("/search/mail/:email").get(userControllers.getUserByMail);
router.route("/search/name/:name").get(userControllers.getUserByName);
// <==

router
  .route("/:id")
  .get(userControllers.getUserById)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

// router.get("/users", userControllers.allUsers);
 
// router.get("/user/validate/:id", userControllers.validationUser);

// router.put("/user/:id", userControllers.updateUser);

// router.patch("/user/update/:id", upload.single('user_photo'), userControllers.updateIdUser); //upload.single('photo')

// router.delete("/user/delete", userControllers.deleteUser);

// router.patch("/user/delete", userControllers.deleteUser);

module.exports = router;
