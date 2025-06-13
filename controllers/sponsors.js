const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('sponsors').find();
        const sponsors = await result.toArray();
        res.setHeader('Content-Type', 'application/json');

        if (sponsors.length === 0) {
            return res.status(404).json({ message: 'No sponsors found'});
        }
        return res.status(200).json(sponsors); 
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSingle = async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('sponsors').find({ _id });
        const sponsors = await result.toArray();
        res.setHeader('Content-Type', 'application/json');

        if (sponsors.length === 0) {
            return res.status(404).json({ message: 'Sponsor not found'})
        }
        return res.status(200).json(sponsors[0]);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createSponsor = async (req, res) => {
    try {
        const { name, email, phone, website, supplierID } = req.body;

        const response = await mongodb.getDatabase().db().collection('sponsors').insertOne(
            {
                name,
                email, 
                phone,
                website,
                supplierID,
                createdAt: new Date()
            }
        );
        if (response.acknowledged) {
            res.status(201).json({ message: 'Sponsor created successfully', id: response.insertedId});
        } else {
            res.status(500).json({ message: 'Failed to create sponsor'});
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateSponsor = async (req, res) => {
    try {
        const sponsorId = new ObjectId(req.params.id);
        const { name, email, phone, website, supplierID } = req.body;

        const response = await mongodb.getDatabase().db().collection('sponsors').updateOne(
            { _id: sponsorId },
            { $set: { name, email, phone, website, supplierID } }
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Sponsor not found'});
        }

        res.status(200).json({ message: 'Sponsor updated successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteSponsor = async (req, res) => {
    try {
        const sponsorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('sponsors').deleteOne({ _id: sponsorId});
    
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'Sponsor not found'});
        }

        res.status(200).json({ message: 'Sponsor deleted successfully'});

    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

module.exports = { getAll, getSingle, createSponsor, updateSponsor, deleteSponsor }