const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all suppliers
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('suppliers').find();
    const suppliers = await result.toArray();
    res.setHeader('Content-Type', 'application/json');

    if (suppliers.length === 0) {
      res.status(404).json({ message: 'No suppliers found' });
    } else {
      res.status(200).json(suppliers);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single supplier
const getSingle = async (req, res) => {
  try {
    const supplierId = new ObjectId(String(req.params.id));
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('suppliers')
      .find({ _id: supplierId });
    const suppliers = await result.toArray();
    res.setHeader('Content-Type', 'application/json');

    if (!suppliers[0]) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(suppliers[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create supplier
const createSupplier = async (req, res) => {
  try {
    const supplier = {
      companyName: req.body.companyName,
      contactName: req.body.contactName,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        street: req.body.address?.street,
        city: req.body.address?.city,
        state: req.body.address?.state,
        postalCode: req.body.address?.postalCode,
        tax_id: req.body.address?.tax_id,
        country: req.body.address?.country,
      },
      productsSupplied: req.body.productsSupplied || [],
      isActive: req.body.isActive !== false, // default to true if not provided
      createdAt: new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('suppliers')
      .insertOne(supplier);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Supplier created successfully',
        id: response.insertedId,
      });
    } else {
      res.status(500).json({ message: 'Failed to create supplier' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update supplier
const updateSupplier = async (req, res) => {
  try {
    const supplierId = new ObjectId(String(req.params.id));
    const updatedSupplier = {
      companyName: req.body.companyName,
      contactName: req.body.contactName,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        street: req.body.address?.street,
        city: req.body.address?.city,
        state: req.body.address?.state,
        postalCode: req.body.address?.postalCode,
        tax_id: req.body.address?.tax_id,
        country: req.body.address?.country,
      },
      productsSupplied: Array.isArray(req.body.productsSupplied)
        ? req.body.productsSupplied
        : [],
      isActive: req.body.isActive,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('suppliers')
      .updateOne({ _id: supplierId }, { $set: updatedSupplier });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json({ message: 'Supplier updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE supplier
const deleteSupplier = async (req, res) => {
  try {
    const supplierId = new ObjectId(String(req.params.id));
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('suppliers')
      .deleteOne({ _id: supplierId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
