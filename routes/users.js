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
// In your routes/users.js
router.put(
  "/:id",
  /* 
    #swagger.tags = ['Users']
    #swagger.parameters['id'] = { description: 'User ID', in: 'path', required: true }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User fields to update',
      required: true,
      schema: {
        name: "string",
        username: "string",
        githubId: "string",
        email: "string",
        password: "string",
        role: "string",
        permissions: ["string"],
        events_created: ["number"],
        invitations: ["string"]
      }
    }
  */
  updateUser
);

// Route to delete a user
router.delete("/:id", deleteUser);

module.exports = router;
