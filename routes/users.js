const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get all users
router.get("/", getUsers);

// Route to get a user by Id
router.get("/:id", getUserById);

// Route to create new user
router.post("/", isAuthenticated, createUser);

// Route to update user
router.put(
  "/:id",
  isAuthenticated,
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
router.delete("/:id", isAuthenticated, deleteUser);

module.exports = router;
