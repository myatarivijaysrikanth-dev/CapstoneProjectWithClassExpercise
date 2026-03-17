const request = require("supertest");
const { expect } = require("chai");
const { app } = require("../server");

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("should not register with duplicate email", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          username: "testuser",
          email: "testuser@test.com",
          password: "password123",
          roleId: 1,
        });
      expect(res.status).to.equal(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with correct credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "testuser@test.com", password: "password123" });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });

    it("should not login with wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "testuser@test.com", password: "wrongpassword" });
      expect(res.status).to.equal(401);
    });

    it("should not login with wrong email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nobody@test.com", password: "password123" });
      expect(res.status).to.equal(401);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should logout successfully with valid token", async () => {
      const login = await request(app)
        .post("/api/auth/login")
        .send({ email: "testuser@test.com", password: "password123" });
      const token = login.body.token;

      const res = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Logged out successfully");
    });

    it("should not logout without token", async () => {
      const res = await request(app).post("/api/auth/logout");
      expect(res.status).to.equal(401);
    });
  });
});
