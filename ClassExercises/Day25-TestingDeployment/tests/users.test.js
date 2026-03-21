const request = require("supertest");
const chai = require("chai");

const app = require("../server");

const expect = chai.expect;

describe("Users API", () => {
  it("GET /api/users should return users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("POST /api/users should create user", async () => {
    const res = await request(app).post("/api/users").send({ name: "John" });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("User created");
  });
});
