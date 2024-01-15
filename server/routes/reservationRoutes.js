const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationControllers');



// Create a new reservation
router.post('/',reservationController.createReservation);
// List all the Reservation
router.get('/',reservationController.ListReservation);
//Get a Reservation by ID
router.get('/:id',reservationController.getReservationById);
// Update Reservation data by ID
router.patch('/:id',reservationController.updateReservation);
// Delete a Reservation by ID
router.delete('/:id',reservationController.deleteReservation);
module.exports = router;
