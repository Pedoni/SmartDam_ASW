const request = require("supertest");

jest.setTimeout(20 * 1000);

test("Normal GET request on /api/opening", async () => {
    await request("http://localhost:3000")
        .get("/api/opening")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.timestamp).toBeDefined();
            expect(response.body.percentage).toBeDefined();
            expect(response.body.percentage).toBeLessThanOrEqual(100);
            expect(response.body.percentage).toBeGreaterThanOrEqual(0);
        });
});

test("Normal POST request on /api/opening", async () => {
    await request("http://localhost:3000")
        .post("/api/opening")
        .send({
            percentage: 60
        })
        .expect(200);
});

test("Expected 400 on POST /api/opening if no percentage", async () => {
    await request("http://localhost:3000")
        .post("/api/opening")
        .send({})
        .expect(400)
        .then(response => {
            expect(response.body.message).toBe("Percentage missing");
        });
});

test("Expected 400 on POST /api/opening if negative percentage", async () => {
    await request("http://localhost:3000")
        .post("/api/opening")
        .send({
            percentage: -1
        })
        .expect(400)
        .then(response => {
            expect(response.body.message).toBe("Invalid percentage");
        });
});

test("Expected 400 on POST /api/opening if percentage too high", async () => {
    await request("http://localhost:3000")
        .post("/api/opening")
        .send({
            percentage: 101
        })
        .expect(400)
        .then(response => {
            expect(response.body.message).toBe("Invalid percentage");
        });
});