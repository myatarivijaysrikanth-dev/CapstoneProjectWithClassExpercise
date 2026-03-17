const request = require("supertest");
const { expect } = require("chai");
const { app } = require("../server");

describe("Questions API", () => {
  let userToken;
  let adminToken;
  let questionId;

  before(async () => {
    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@test.com", password: "password123" });
    userToken = userLogin.body.token;

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "testadmin@test.com", password: "password123" });
    adminToken = adminLogin.body.token;
  });

  describe("POST /api/questions", () => {
    it("should create a question when logged in", async () => {
      const res = await request(app)
        .post("/api/questions")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          title: "What is Node.js and how does it work in detail?",
          description:
            "I want to understand the Node.js event loop in detail please explain",
          topic: "Node.js",
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("status", 2);
      expect(res.body).to.have.property("isOpen", true);
      questionId = res.body._id;
    });

    it("should not create a question without login", async () => {
      const res = await request(app).post("/api/questions").send({
        title: "What is Node.js and how does it work?",
        description: "I want to understand Node.js",
        topic: "Test",
      });
      expect(res.status).to.equal(401);
    });
  });

  describe("GET /api/questions", () => {
    it("should get all approved questions", async () => {
      const res = await request(app).get("/api/questions");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /api/questions/search", () => {
    it("should search questions by keyword", async () => {
      const res = await request(app).get("/api/questions/search?keyword=Node");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });

    it("should return 400 if no keyword provided", async () => {
      const res = await request(app).get("/api/questions/search");
      expect(res.status).to.equal(400);
    });
  });

  describe("PUT /api/questions/:id/approve", () => {
    it("should approve a question as admin", async () => {
      const res = await request(app)
        .put(`/api/questions/${questionId}/approve`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", 1);
    });

    it("should not approve a question as regular user", async () => {
      const res = await request(app)
        .put(`/api/questions/${questionId}/approve`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(res.status).to.equal(403);
    });
  });

  describe("PUT /api/questions/:id/close", () => {
    it("should close a question thread as admin", async () => {
      const res = await request(app)
        .put(`/api/questions/${questionId}/close`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("isOpen", false);
    });
  });

  describe("DELETE /api/questions/:id", () => {
    it("should delete a question as admin", async () => {
      const res = await request(app)
        .delete(`/api/questions/${questionId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Question deleted");
    });
  });
});
