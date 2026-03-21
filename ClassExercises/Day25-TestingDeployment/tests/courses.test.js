const chai = require("chai");
const request = require("supertest");

const app = require("../server");

const expect = chai.expect;

describe("Courses API", () => {
  it("GET /api/courses should return courses", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
});
