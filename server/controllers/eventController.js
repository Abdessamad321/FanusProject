const { Event } = require("../models/event");
const mongoose = require("mongoose");


exports.createEvent = async function (req, res) {
  try {
    const {
      name,
      description,
      date,
      time,
      price,
      location,
      capacity,
      remaining_places,
    } = req.body;

    const existingEvent = await Event.findOne({ date, time, location });

    if (existingEvent) {
      return res.status(200).json("Location already reserved for the same date and time!");
    }

    const event = new Event({
      name,
      description,
      date,
      time,
      price,
      location,
      capacity,
      remaining_places,
    });

    const result = await event.save();

    if (result) {
      return res.status(201).json("Event created successfully");
    } else {
      return res.status(400).json("Failed to create event! Please check your input data");
    }

  } catch (error) {
 
    return res.status(500).json("Something went wrong, please try again");
  }
};


exports.searchEvent= async function (req, res){

};

exports.eventById= async function (req, res){

};

exports.allEvent= async function (req, res){

};

exports.updateEvent= async function (req, res){

};

exports.deleteEvent= async function (req, res){

}