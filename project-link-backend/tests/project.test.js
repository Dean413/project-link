const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Project = require('../models/project');
const Client = require('../models/client');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require ("dotenv").config()

jest.setTimeout(20000); // 20 seconds


let token, client;


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  const admin = await User.create({ email: 'admin2@test.com', password: '123456', role: 'admin' });
  client = await Client.create({ name: 'Client A' });
  token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET_KEY);
});

afterAll(async () => {
  await Project.deleteMany();
  await Client.deleteMany();
  await User.deleteMany();
  await mongoose.connection.close();
});

describe('PUT /api/projects/:id', () => {
  it('should update a project', async () => {
    const project = await Project.create({ title: 'Old Title', client: client._id });

    const res = await request(app)
      .put(`/api/projects/${project._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });
});