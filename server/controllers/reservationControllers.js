const mongoose = require('mongoose');
const Reservation = require('../models/reservation');
const event = require('../models/event'); 


const ObjectId = mongoose.Types.ObjectId;


// Create a new Reservation
const createReservation = async (req, res) => {
  try {
    const { payment_method, transaction_time } = req.body;

    const newReservation = new Reservation({
      transaction_time,  // Keep the order consistent with the schema
      payment_method,
    });

    const savedReservation = await newReservation.save();

    res.status(201).json({
      status: 201,
      message: "Reservation created successfully",
      newReservation: savedReservation,  // Use savedReservation instead of newReservation
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};



//get all reservation
const ListReservation = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const reservations = await Reservation.find(); // Use uppercase 'Reservation' here

    res.status(200).json(reservations);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


// Get a product by ID
const getReservationById = async (req, res) => {
  const { id } = req.params;

  console.log("Received reservation ID:", id);

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ status: 400, message: 'Invalid reservation ID' });
    }

    
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ status: 404, message: 'Reservation not found' });
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
  const { id } = req.params
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          "status": 400,
          "message": "the field xxx should be of type xxx"
        })
      }
    
      const newReservation = await Reservation.findOneAndUpdate({_id: id}, {
        ...req.body
      })
    
      if (!newReservation) {
        return res.status(204).json({error: 'No such new reservation'})
      }
    
      res.status(200).json({
        "status": 200,
        "message": "Reservation updated successfully"
      })}
   
   

// delete a product
const deleteReservation = async (req, res) => {
  const { id } = req.params;
      
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      "status": 404,
      "message": "invalid Reservation id"
    })
  }

  const  deletedReservation= await Reservation.findOneAndDelete({_id: id})

  if(!deletedReservation) {
    return res.status(403).json({
      "status": 403,
      "message": "you don't have enough privilege"
    })
  }

  res.status(200).json({
    "status": 200,
    "message": "Reservation deleted successfully"
  })
}





module.exports = {
  ListReservation,
  createReservation,
  
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationById,
 
};
