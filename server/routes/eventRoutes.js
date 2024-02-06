const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");


router.route("/new").post(eventController.createEvent);
router.route("/update/:id").put(eventController.updateEvent);
router.route("/all").get(eventController.allEvents);
router.route("/delete/:id").delete(eventController.deleteEvent);
router.route("/search").get( eventController.searchEvent);
router.route("/name/:name").get(eventController.eventByName);
router.route("/:id").get(eventController.eventById);

module.exports = router;
