const request = require('supertest');
const app = require('../app');
const User = require('../models/usersModel');

// Bypass auth:
jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => {
    req.user = { id: 'mockUserId' };
    next();
  },
  isAdmin: (req, res, next) => next(),
}));

jest.mock('../models/usersModel'); // Mock the Mongoose User model

describe('Users API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /users - returns all users', async () => {
    User.find.mockResolvedValue([
      { _id: '64b65bfeb6d3a93a12345690', username: 'user1' },
      { _id: '64b65bfeb6d3a93a12345691', username: 'user2' },
    ]);

    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('username');
  });

  it('GET /users/:id - returns a single user', async () => {
    const testId = '64b65bfeb6d3a93a12345690';
    User.findById.mockResolvedValue({ _id: testId, username: 'singleUser' });

    const res = await request(app).get(`/users/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', testId);
    expect(res.body).toHaveProperty('username');
  });

  it('GET /users/:id - returns 404 if user not found', async () => {
    User.findById.mockResolvedValue(null);

    const res = await request(app).get(`/users/000000000000000000000000`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found.');
  });

  it('GET /users/:id - returns 400 if ID format is invalid', async () => {
  const invalidId = 'invalid-id';
  const res = await request(app).get(`/users/${invalidId}`);
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty('error', 'Invalid user ID');
  });
});
