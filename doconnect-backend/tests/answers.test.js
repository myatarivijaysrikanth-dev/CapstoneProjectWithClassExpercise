const request = require("supertest");
const { expect } = require("chai");
const { app } = require("../server");

describe("Answers API", () => {
  let userToken;
  let adminToken;
  let questionId;
  let answerId;

  before(async () => {
    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@test.com", password: "password123" });
    userToken = userLogin.body.token;

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "testadmin@test.com", password: "password123" });
    adminToken = adminLogin.body.token;

    console.log('userToken:', userToken ? 'OK' : 'UNDEFINED');
    console.log('adminToken:', adminToken ? 'OK' : 'UNDEFINED');
    const q = await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        title: "What is Express.js middleware and how does it work?",
        description:
          "Please explain how middleware works in Express.js with examples",
        topic: "Express.js",
      });
    questionId = q.body._id;

    await request(app)
      .put(`/api/questions/${questionId}/approve`)
      .set("Authorization", `Bearer ${adminToken}`);
  });

  describe("POST /api/answers/:questionId", () => {
    it("should post an answer to an open approved question", async () => {
      const res = await request(app)
        .post(`/api/answers/${questionId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          content:
            "Middleware is a function that runs between request and response.",
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("status", 2);
      answerId = res.body._id;
    });

    it("should not post an answer without login", async () => {
      const res = await request(app)
        .post(`/api/answers/${questionId}`)
        .send({ content: "Some answer text here" });
      expect(res.status).to.equal(401);
    });
  });

  describe("GET /api/answers/:questionId", () => {
    it("should get approved answers for a question", async () => {
      const res = await request(app).get(`/api/answers/${questionId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("PUT /api/answers/:id/approve", () => {
    it("should approve an answer as admin", async () => {
      const res = await request(app)
        .put(`/api/answers/${answerId}/approve`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", 1);
    });

    it("should not approve answer as regular user", async () => {
      const res = await request(app)
        .put(`/api/answers/${answerId}/approve`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).to.equal(403);
    });
  });

  describe("DELETE /api/answers/:id", () => {
    it("should delete an answer as admin", async () => {
      const res = await request(app)
        .delete(`/api/answers/${answerId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Answer deleted");
    });
  });
});
