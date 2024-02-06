const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationControllers');



// Create a new reservation
router.post(reservationController.createReservation);
// List all the Reservation
router.route('/').get(reservationController.ListReservation);
//Get a Reservation by ID
router.route('/:id').get(reservationController.getReservationById);
// Update Reservation data by ID
router.route('/:id').patch(reservationController.updateReservation);
// Delete a Reservation by ID
router.route('/:id').delete(reservationController.deleteReservation);

module.exports = router;
