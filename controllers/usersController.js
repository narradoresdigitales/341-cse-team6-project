const User = require("../models/usersModel");

// Get all users from the Users database
const getUsers = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Get a single user by Id
const getUserById = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user." });
  }
};

// Create a new user
const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const {
      name,
      username,
      githubId,
      email,
      password,
      role,
      permissions,
      events_created,
      invitations,
    } = req.body;

    const newUser = new User({
      name,
      username,
      githubId,
      email,
      password,
      role,
      permissions: permissions || [],
      events_created: events_created || [],
      invitations: invitations || [],
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Update a user
const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
