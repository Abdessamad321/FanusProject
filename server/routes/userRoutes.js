const express = require("express");
const router = express.Router();
const {
  checkAdminRole,
  checkSuperAdminRole,
} = require("../middlewares/checkRole");

const { redirectToRole } = require("../middlewares/auth");
const userControllers = require("../controllers/userControllers");

router.route("/create").post(checkAdminRole, userControllers.createUser);

router.route("/login").post(userControllers.loginUser);

router.route("/list").get(checkAdminRole, userControllers.getAllUsers);

// A VOIR
router.route("/search").get(checkAdminRole, userControllers.getUser);

//Merge into one route /search?keyword=value
// const user = await User.findOne({
//   $or: [
//     { email: keyword },
//     { name: keyword },
//   ],
// });
//Else 404 not found
// ==>
// router.route("/search/mail/:email").get(userControllers.getUserByMail);

// router.route("/search/name/:name").get(userControllers.getUserByName);
// <==

router
  .route("/:id")
  .get(checkAdminRole, userControllers.getUserById)
  .put(checkSuperAdminRole, userControllers.updateUser)
  .delete(checkSuperAdminRole, userControllers.deleteUser);

module.exports = router;
