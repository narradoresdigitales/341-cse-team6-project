const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Events']
    try {
        const result = await mongodb.getDatabase().db().collection('events').find();
        const events = await result.toArray();
        res.setHeader('Content-Type', 'application/json');

        if (events.length === 0) {
            res.status(404).json({ message: 'No events found'});
        } else {
            res.status(200).json(events);  
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const getSingle = async (req, res) => {
    //#swagger.tags=['Events']
    try {
        const eventId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('events').find({ _id: eventId});
        const events = await result.toArray();
        res.setHeader('Content-Type', 'application/json');

        if (!events[0]) {
            return res.status(404).json({ message: 'Event not found'})
        }
        res.status(200).json(events[0]);

        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createEvent = async (req, res) => {
 //#swagger.tags=['Events']
    try {
        const event = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            organizer: req.body.organizer,
            attendees: req.body.attendees || [],
            createdAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('events').insertOne(event);

        if (response.acknowledge) {
            res.status(201).json({ message: 'Event created successfully', id: response.insertedId});
        } else {
            res.status(500).json({ message: 'Failed to create event'});
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEvent = async (req, res) => {
    //#swagger.tags=['Events']
    console.log('Request body:', req.body);
    try {
        const eventId = new ObjectId(req.params.id);
        const updatedEvent = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            organizer: req.body.organizer,
            attendees: Array.isArray(req.body.attendees)
                ? req.body.attendees
                : typeof req.body.attendees === 'string'
                ? [req.body.attendees]
                : [],
        };

    const response = await mongodb.getDatabase().db().collection('events').updateOne(
        { _id: eventId },
        { $set: updatedEvent }
    );

    if (response.matchedCount === 0) {
        return res.status(404).json({ message: 'Event not found'});
    }

    res.status(200).json({ message: 'Event updated successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}; 

const deleteEvent = async (req, res ) => {
    //#swagger.tags=['Events']
    try {
        const eventId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('events').deleteOne({ _id: eventId});
    
    if (response.deletedCount ===0) {
        return res.status(404).json({ message: 'Event not found'});
    }

    res.status(200).json({ message: 'Event deleted successfully'});

    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};


module.exports = {
    getAll,
    getSingle,
    createEvent,
    updateEvent,
    deleteEvent
}
