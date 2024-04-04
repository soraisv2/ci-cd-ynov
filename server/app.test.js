const request = require("supertest")
const app = require("./app")

require("dotenv").config();

describe("GET /api/product/get", () => {
    it("should return all users", async () => {
        return request(app)
            .get("/users/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                console.log(res)
                expect(res.statusCode).toBe(200);
                done();
            })
    });
});