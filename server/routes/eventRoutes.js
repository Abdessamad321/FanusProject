const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require('../middlewares/Cloudinary')

router.route("/new").post(upload.single('event_photo'), eventController.createEvent);

router.route("/update/:id").put(eventController.updateEvent);
router.route("/all").get(eventController.allEvents);
router.route("/:id").get(eventController.eventById);
router.route("/delete/:id").delete(eventController.deleteEvent);
router.route("/search").get( eventController.searchEvent);
router.route("/name/:name").get(eventController.eventByName);


module.exports = router;
