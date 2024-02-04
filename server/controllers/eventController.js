const express = require("express");
const Event = require("../models/event");


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

exports.allEvents = async function (req, res) {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const params = req.query || {};
    const object = {};

    if (params.price !== undefined) {
      const price = parseFloat(params.price);
      if (!isNaN(price)) {
        object.price = price;
      }
    }

    if (params.remaining_places !== undefined) {
      const remainingPlaces = parseInt(params.remaining_places);
      if (!isNaN(remainingPlaces)) {
        object.remaining_places = remainingPlaces;
      }
    }

    if (params.location !== null && params.location !== undefined) {
      object.location = params.location;
    }

    if (params.date) {
      object.date = new Date(params.date);
    }

    const sortDirection = params.sort === 'asc' ? 1 : -1;

    let events;

    if  (Object.keys(object).length === 0) {
      events = await Event.find();
    } else {
      events = await Event.aggregate([
        {
          $match: object,
        },
        {
          $sort:{ price: sortDirection },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            date: 1,
            time: 1,
            price: 1,
            location: 1,
            capacity: 1,
            remaining_places: 1,
          },
        },
      ]);
  
    }
  
      
    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found with the specified filter.'});
    }

    res.status(200).json(events);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
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

exports.searchEvent = async function (req, res) {
  try {
    const eventName = req.query.name;
    const eventOwner = req.query.owner;

    let queryObj = {};

    if (eventName) {
      queryObj = { name: { $regex: eventName, $options: "i" } };
    } else if (eventOwner) {
      queryObj = { owner: { $regex: eventOwner, $options: "i" } };
    } else {
      return res.status(400).json("Please provide either 'name' or 'owner'.");
    }

    const events = await Event.find(queryObj);

    if (events.length > 0) {
      res.status(200).json({ events });
    } else {
      return res.status(404).json("No events found!");
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

exports.eventByName = async function (req,res) {
  const eventName = req.params.name;
  try {
  const event = await Event.findOne({name:eventName});
if(event){
  res.status(200).json(event);
}else{
    res.status(404).json(`Event with this name not found`)
  }
  
} catch (error) {
  res.status(500).json({error:error.messsage});
  console.log(error)
}
};

