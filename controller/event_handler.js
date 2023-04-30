const Event = require('../model/event');
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

//get an event
module.exports.getEvent = async function(req, res){
    try{
        //check if event_id is correct
        const eventId = req.params.event_id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        //finding event
        const event = await Event.findById(req.params.event_id);
        if(!event){
            // console.log('Event does not exist');
            return res.status(404).json({message: 'Event does not exist'});
        }

        return res.status(200).json({event});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    } 
}

module.exports.getEvents = async function(req, res){
    const { type, limit, page } = req.query;

    console.log(type, limit, page);
    //set default values if not provided in params
    const eventType = type || 'latest';
    const eventsPerPage = limit ? parseInt(limit) : 5;
    const pageNumber = page ? parseInt(page) : 1;

    
    try{
        const events = await Event.find({ type: eventType })
        .sort({ schedule: 'desc' })
        .skip((pageNumber - 1) * eventsPerPage)
        .limit(eventsPerPage)
        .exec();
        console.log(events);
        return res.status(200).json({events});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}

//create an event
module.exports.postEvent = async function(req, res){
    try{
        const event = await Event.create({
            type: req.body.type,
            name: req.body.name,
            tagline: req.body.tagline,
            schedule: req.body.schedule,
            description: req.body.description,
            moderator: req.body.moderator,
            category: req.body.category,
            sub_category: req.body.sub_category,
            rigor_rank: req.body.rigor_rank
        });

        if(req.file){
            event.files = {
                data: req.file.buffer,
                contentType: "image/jpeg",
            };
        }

        const savedEvent = await event.save();
        console.log(savedEvent);
        return res.status(200).json({savedEvent});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}

//update an event
module.exports.updateEvent = async function(req, res){
    try{
        console.log(req.file);
        const eventId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message: 'Event not found'});
        }

        console.log('req.body:', req.body);

        await event.updateOne({
            type: req.body.type,
            name: req.body.name,
            tagline: req.body.tagline,
            schedule: req.body.schedule,
            description: req.body.description,
            moderator: req.body.moderator,
            category: req.body.category,
            sub_category: req.body.sub_category,
            rigor_rank: req.body.rigor_rank
        });

        if(req.file){
            event.files = {
                data: req.file.buffer,
                contentType: "image/*",
            };
        }
        await event.save();

        console.log('updated event:', event);

        return res.status(200).json({message: 'Event updated successfully'});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}

//delete an event
module.exports.deleteEvent = async function(req, res){
    try{
        const eventId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }

        const event = await Event.findByIdAndDelete(req.params.id);

        return res.status(200).json({message: 'Event deleted successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
}
