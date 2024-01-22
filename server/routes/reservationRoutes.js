const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationControllers');



// Create a new reservation
router.post('/reservation/',reservationController.createReservation);
// List all the Reservation
router.get('/reservation/',reservationController.ListReservation);
//Get a Reservation by ID
router.get('/reservation/:id',reservationController.getReservationById);
// Update Reservation data by ID
router.patch('/reservation/:id',reservationController.updateReservation);
// Delete a Reservation by ID
router.delete('/reservation/:id',reservationController.deleteReservation);

module.exports = router;
