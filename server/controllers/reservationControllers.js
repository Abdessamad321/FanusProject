const mongoose = require("mongoose");
const Reservation = require("../models/reservation");
const Event  = require("../models/event");


const ObjectId = mongoose.Types.ObjectId;

// Create a new Reservation
const createReservation = async (req, res) => {
  try {
    const { payment_method, transaction_time, eventLink ,userLink} = req.body;

    console.log("Request body:", req.body); 

    if (!payment_method) {
      return res.status(400).json({
        status: 400,
        error: "Payment method is required.",
      });
    }

    const newReservation = new Reservation({
      transaction_time,
      payment_method,
      eventLink,
      userLink,
    });
    const savedReservation = await newReservation.save();
    res.status(201).json({
      status: 201,
      message: "Reservation created successfully",
      newReservation: savedReservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error); // Add this line for debugging
    res.status(500).json({ status: 500, error: error.message });
  }
};

//get all reservation
const ListReservation = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const reservations = await Reservation.find().populate('userLink').populate('eventLink') ;

    res.status(200).json(reservations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get a product by ID
const getReservationById = async (req, res) => {
  const { id } = req.params;

  console.log("Received reservation ID:", id);

  try {
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid reservation ID" });
    }

    const reservation = await Reservation.findById(id).populate('userLink').populate('eventLink');

    if (!reservation) {
      return res
        .status(404)
        .json({ status: 404, message: "Reservation not found" });
    }

    res.status(200).json({ status: 200, data: reservation });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: `Error retrieving reservation with id: ${id}`,
      error: error.message,
    });
  }
};

// Update the product data
const updateReservation = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 400,
        error: "Invalid reservation ID",
      });
    }

    const updatedReservation = await Reservation.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true, runValidators: true } 
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "No such reservation found" });
    }

    res.status(200).json({
      status: 200,
      message: "Reservation updated successfully",
      updatedReservation,
    });
  } catch (error) {
    console.error("Error updating reservation:", error); 
    res.status(500).json({ status: 500, error: error.message });
  }
};


// delete a product
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Invalid Reservation id",
      });
    }

    const deletedReservation = await Reservation.findOneAndDelete({ _id: id });

    if (!deletedReservation) {
      return res.status(404).json({
        status: 404,
        message: "No such reservation found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting reservation:", error); // Log the error for debugging
    res.status(500).json({ status: 500, error: error.message });
  }
};
module.exports = {
  ListReservation,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  
};
