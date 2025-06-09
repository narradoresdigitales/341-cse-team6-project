
const request = require('supertest');
const app = require('../app');  

// Mock the database module with string _id values
const { ObjectId } = require('mongodb'); // Add this line at top of your test file

jest.mock('../data/database', () => {
  const knownIds = ['64b65bfeb6d3a93a12345678', '64b65bfeb6d3a93a12345679'];

  return {
    getDatabase: () => ({
      db: () => ({
        collection: () => ({
          find: (query) => {
            if (!query || Object.keys(query).length === 0) {
              // Mock response for getAll
              return {
                toArray: async () => [
                  { _id: '64b65bfeb6d3a93a12345678', title: 'Test Event 1' },
                  { _id: '64b65bfeb6d3a93a12345679', title: 'Test Event 2' },
                ],
              };
            }
            if (query._id) {
              // Convert _id to string to compare correctly
              const idStr = query._id.toString();
              if (knownIds.includes(idStr)) {
                return {
                  toArray: async () => [
                    { _id: idStr, title: 'Single Test Event' },
                  ],
                };
              } else {
                return { toArray: async () => [] };
              }
            }
            return { toArray: async () => [] };
          },
        }),
      }),
    }),
  };
});



describe('Events API', () => {
  it('GET /events - returns all events', async () => {
    const res = await request(app).get('/events');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('title');
  });

  it('GET /events/:id - returns a single event', async () => {
    const testId = '64b65bfeb6d3a93a12345678';
    const res = await request(app).get(`/events/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toBe(testId);
    expect(res.body).toHaveProperty('title'); 
  });

  it('GET /events/:id - returns 404 if event not found', async () => {
    const testId = '000000000000000000000000';
    const res = await request(app).get(`/events/${testId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Event not found');
  });
});
