const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Client = require('../models/client');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config()

jest.setTimeout(20000); // 20 seconds


let token;


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  const admin = await User.create({ email: 'admin@test.com', password: '123456', role: 'admin' });
  token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET_KEY);
});

afterAll(async () => {
  await Client.deleteMany();
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('POST /api/clients', () => {
  it('should create a client', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Client', email: 'test@client.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Client');
  });
});