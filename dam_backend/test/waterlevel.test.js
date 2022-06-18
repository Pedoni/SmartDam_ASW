const request = require("supertest");

jest.setTimeout(20 * 1000);

test("Expected 400 on POST /api/waterlevel with no value", async () => {
    await request("http://localhost:3000")
        .post("/api/waterlevel")
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.message).toBe("value is missing");
        });
});

test("Normal POST on /api/waterlevel", async () => {
    await request("http://localhost:3000")
        .post("/api/waterlevel")
        .send({
            value: 100
        })
        .expect(200);
});

test("Normal GET request on /api/waterlevel", async () => {
    await request("http://localhost:3000")
        .get("/api/waterlevel")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.waterlevel.length).toBe(10);
            expect(response.body.timestamp.length).toBe(10);
        });
});