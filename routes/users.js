const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const { isAuthenticated, isAdmin } = require('../middleware/authenticate');

// Route to get all users
router.get('/', isAdmin, getUsers);

// Route to get a user by Id
router.get('/:id', isAdmin, getUserById);

// Route to create new user
router.post(
  '/',
  /* 
    #swagger.tags = ['Users']
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User fields to update',
      required: true,
      schema: {
        githubId: "string",
        username: "string",
        displayName: "string",
        isAdmin: false
      }
    }
  */
  createUser
);

// Route to update user
router.put(
  '/:id',
  /* 
    #swagger.tags = ['Users']
    #swagger.parameters['id'] = { description: 'User ID', in: 'path', required: true }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User fields to update',
      required: true,
      schema: {
        githubId: "string",
        username: "string",
        displayName: "string",
        isAdmin: false
      }
    }
  */
  isAuthenticated,
  updateUser
);

// Route to delete a user
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
