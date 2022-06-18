const request = require("supertest");
const controller = require("../api/controllers/controller");

jest.setTimeout(20 * 1000);

test("Expected 400 when POSTing with no value", () => {
    request("http://localhost:3000")
        .post("/api/waterlevel")
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.message).toBe("value is missing");
        });
});