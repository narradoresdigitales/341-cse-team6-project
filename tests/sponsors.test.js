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

// Bypass validation:
jest.mock('../middleware/sponsorValidator', () => ({
  validateSponsor: (req, res, next) => next(),
  validateSponsorId: (req, res, next) => next(),
}));

const { ObjectId } = require('mongodb');
const {
  validateSponsor,
  validateSponsorId,
} = require('../middleware/sponsorValidator');

jest.mock('../data/database', () => {
  const knownIds = ['64b65bfeb6d3a93a12345680', '64b65bfeb6d3a93a12345681'];

  return {
    getDatabase: () => ({
      db: () => ({
        collection: (name) => {
          if (name === 'sponsors') {
            // or 'users'
            return {
              find: (query) => {
                if (!query || Object.keys(query).length === 0) {
                  return {
                    toArray: async () => [
                      { _id: '64b65bfeb6d3a93a12345680', name: 'Sponsor A' },
                      { _id: '64b65bfeb6d3a93a12345681', name: 'Sponsor B' },
                    ],
                  };
                }
                if (query._id) {
                  const idStr = query._id.toString();
                  if (knownIds.includes(idStr)) {
                    return {
                      toArray: async () => [
                        { _id: idStr, name: 'Sponsor Found' },
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

describe('Sponsors API', () => {
  it('GET /sponsors - returns all sponsors', async () => {
    const res = await request(app).get('/sponsors');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('_id');
  });

  it('GET /sponsors/:id - returns a single sponsor', async () => {
    const testId = '64b65bfeb6d3a93a12345680';
    const res = await request(app).get(`/sponsors/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(testId);
  });

  it('GET /sponsors/:id - returns 404 if sponsor not found', async () => {
    const res = await request(app).get(`/sponsors/000000000000000000000000`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
  });
});
