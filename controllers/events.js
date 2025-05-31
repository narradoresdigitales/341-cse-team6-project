const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('events').find();
        const events = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const getSingle = async (req, res) => {
    try {
        const eventId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('events').find({ _id: eventId});
        const events = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle
}
