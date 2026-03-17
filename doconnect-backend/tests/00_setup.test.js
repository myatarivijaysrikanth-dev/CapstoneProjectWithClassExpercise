const { expect } = require('chai');
const request = require('supertest');
const { app } = require('../server');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

describe('Test Setup', () => {
  it('should clean up and create test users', async () => {
    await User.deleteMany({
      email: { $in: ['testuser@test.com', 'testadmin@test.com'] }
    });
    await Question.deleteMany({});
    await Answer.deleteMany({});

    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'password123',
        roleId: 1
      });
    expect(userRes.status).to.equal(201);

    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testadmin',
        email: 'testadmin@test.com',
        password: 'password123',
        roleId: 2
      });
    expect(adminRes.status).to.equal(201);
  });
});