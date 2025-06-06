const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

// Route to get all users
router.get("/", getUsers);

// Route to get a user by Id
router.get("/:id", getUserById);

// Route to create new user
router.post("/", createUser);

// Route to update user
router.put("/:id", updateUser);

// Route to delete a user
router.delete("/:id", deleteUser);

module.exports = router;
