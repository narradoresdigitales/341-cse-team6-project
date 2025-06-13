const User = require('../models/usersModel');
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const mongoose = require('mongoose');

// Get all users from the Users database
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

// Get a single user by Id
const getUserById = async (req, res) => {
  //#swagger.tags=['Users']

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user.' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { githubId, username, displayName, isAdmin = false } = req.body;

    const newUser = new User({
      githubId,
      username,
      displayName: displayName || null,
      isAdmin: Boolean(isAdmin),
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(String(req.params.id));

    const updatedUser = {
      githubId: req.body.githubId,
      username: req.body.username,
      displayName: req.body.displayName,
      isAdmin: req.body.isAdmin,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .updateOne({ _id: userId }, { $set: updatedUser });

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error deleting user', details: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
