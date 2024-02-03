const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");


router.post("/newevent", eventController.createEvent);
router.get("/events", eventController.allEvent);
router.put("/update/:id", eventController.updateEvent);
router.delete("/delete/:id", eventController.deleteEvent);
router.get("/searchevent", eventController.searchEvent);
router.get("/getbyname/:name", eventController.eventByName);
router.get("/getbyid/:id", eventController.eventById);
router.get("/filterevent", eventController.filterAndSortEvent);




module.exports = router;