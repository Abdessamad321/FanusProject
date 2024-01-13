const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/event', eventController.createEvent );
router.get('/event/:id', eventController.eventById);
router.get('/event/allevents', eventController.allEvent);
router.put('/event/update/:id', eventController.updateEvent);
router.delete('/event/delete/:id', eventController.deleteEvent);

module.exports = router