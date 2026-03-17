const request = require("supertest");
const { expect } = require("chai");
const { app } = require("../server");
const User = require("../models/User");

describe("Admin API", () => {
  let adminToken;
  let userToken;
  let userId;

  before(async () => {
    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@test.com", password: "password123" });
    userToken = userLogin.body.token;

    const userInDb = await User.findOne({ email: "testuser@test.com" });
    userId = userInDb._id.toString();

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "testadmin@test.com", password: "password123" });
    adminToken = adminLogin.body.token;
  });

  describe("GET /api/admin/users", () => {
    it("should get all users as admin", async () => {
      const res = await request(app)
        .get("/api/admin/users")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });

    it("should not allow regular user to get all users", async () => {
      const res = await request(app)
        .get("/api/admin/users")
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).to.equal(403);
    });

    it("should not allow unauthenticated access", async () => {
      const res = await request(app).get("/api/admin/users");
      expect(res.status).to.equal(401);
    });
  });
describe("PUT /api/admin/users/:id/deactivate", () => {
    it("should deactivate a user as admin", async () => {
      const res = await request(app)
        .put(`/api/admin/users/${userId}/deactivate`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "User deactivated");
    });

    it("should not allow regular user to deactivate", async () => {
      const res = await request(app)
        .put(`/api/admin/users/${userId}/deactivate`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).to.equal(401);
    });

    
    after(async () => {
      await request(app)
        .put(`/api/admin/users/${userId}/activate`)
        .set("Authorization", `Bearer ${adminToken}`);
    });
  });

  describe("PUT /api/admin/users/:id/activate", () => {
    it("should activate a user as admin", async () => {
      const res = await request(app)
        .put(`/api/admin/users/${userId}/activate`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "User activated");
    });
  });

  describe("GET /api/admin/questions", () => {
    it("should get all questions including pending as admin", async () => {
      const res = await request(app)
        .get("/api/admin/questions")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /api/admin/answers", () => {
    it("should get all answers including pending as admin", async () => {
      const res = await request(app)
        .get("/api/admin/answers")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
});
