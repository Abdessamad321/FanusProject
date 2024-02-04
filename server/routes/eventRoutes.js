const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");


router.post("/newevent", eventController.createEvent);
router.put("/update/:id", eventController.updateEvent);
router.get("/events", eventController.allEvents);
router.delete("/delete/:id", eventController.deleteEvent);
router.get("/searchevent", eventController.searchEvent);
router.get("/getbyname/:name", eventController.eventByName);
router.get("/getbyid/:id", eventController.eventById);





module.exports = router;