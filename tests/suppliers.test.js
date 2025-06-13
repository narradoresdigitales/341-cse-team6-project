const request = require('supertest');
const app = require('../app');

// Bypass auth:
jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => {
    req.user = { id: 'mockUserId' };
    next();
  },
  isAdmin: (req, res, next) => next(),
}));

const { ObjectId } = require('mongodb');

jest.mock('../data/database', () => {
  const knownIds = ['64b65bfeb6d3a93a12345670', '64b65bfeb6d3a93a12345671'];

  return {
    getDatabase: () => ({
      db: () => ({
        collection: (name) => {
          if (name === 'suppliers') {
            return {
              find: (query) => {
                if (!query || Object.keys(query).length === 0) {
                  return {
                    toArray: async () => [
                      {
                        _id: '64b65bfeb6d3a93a12345670',
                        name: 'Test Supplier 1',
                      },
                      {
                        _id: '64b65bfeb6d3a93a12345671',
                        name: 'Test Supplier 2',
                      },
                    ],
                  };
                }

                if (query._id) {
                  const idStr = query._id.toString();
                  if (knownIds.includes(idStr)) {
                    return {
                      toArray: async () => [
                        { _id: idStr, name: 'Single Test Supplier' },
                      ],
                    };
                  } else {
                    return { toArray: async () => [] };
                  }
                }

                return { toArray: async () => [] };
              },
            };
          }

          return {};
        },
      }),
    }),
  };
});

//  Tests for GET routes
describe('Suppliers API', () => {
  it('GET /suppliers - returns all suppliers', async () => {
    const res = await request(app).get('/suppliers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('name');
  });

  it('GET /suppliers/:id - returns a single supplier', async () => {
    const testId = '64b65bfeb6d3a93a12345670';
    const res = await request(app).get(`/suppliers/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toBe(testId);
    expect(res.body).toHaveProperty('name');
  });

  it('GET /suppliers/:id - returns 404 if supplier not found', async () => {
    const testId = '000000000000000000000000';
    const res = await request(app).get(`/suppliers/${testId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Supplier not found');
  });

it('GET /suppliers/:id - returns 400 if ID format is invalid', async () => {
  const invalidId = 'not-a-valid-id';
  const res = await request(app).get(`/suppliers/${invalidId}`);
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty('errors');
  expect(res.body.errors[0]).toHaveProperty('msg', 'Invalid supplier ID format');
  });

});
