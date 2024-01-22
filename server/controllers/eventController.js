<<<<<<< HEAD
const { Event } = require("../models/event");
const mongoose = require("mongoose");

// Xss+regular validations expressions
=======
const express = require("express")
const Event = require("../models/event");

>>>>>>> bd69d5aa153c0d3db1a7f3ae79593eeb52fd8cba
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
    res.status(200).json("Event created successfully");
    } else {
    res.status(400).json("Failed to create event! Please check your input data");
    }

  } catch (error) {
    res.status(500).json({error:error});
  }
};


exports.eventById= async function (req, res){
  const eventId = req.params.id;
  try {
  const event = await Event.findById(eventId);
if(event){
  res.status(200).json(event);
}else{
    res.status(404).json(`Event with this ID ${eventId} not found`)
  }
  
} catch (error) {
  res.status(500).json({error:error.messsage});
  console.log(error)
}
};

exports.allEvent= async function (req, res){
try {
  const events = await Event.find();
  res.status(200).json(events);
  if(!events){
    return res.status(404).json('No Events Found')
  }
} catch (error) {
  res.status(500).json({error:error});
}
};

//Sort req.query
// limit
exports.searchEvent = async function (req, res) {
  try {
    const eventName = req.query.name;
    const events = await Event.find({name:{$regex:eventName, $options:"i"}})

    if (events.length>0) {
      res.status(200).json({ events });
    } else  {
      return res.status(400).json("No event found !");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateEvent= async function (req, res){
  try {
    const { id } = req.params;
    const { body } = req;
    const event = await Event.findById(id);
    if (!event){
      return res.status(404).json("Event not found")
    }
    await Event.updateOne({ _id: id }, { $set: body });
    res.status(200).json("Event updated successfully");
  } catch (error) {
    res.status(500).json({error:error});
  }
};

exports.deleteEvent= async function (req, res){
try {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event){
    return res.status(404).json("Event not found")
  }
  await event.deleteOne()
  res.status(200).json("Event deleted successfully");
} catch (error) {
  res.status(500).json({error:error});
}
}