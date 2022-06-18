const request = require("supertest");

jest.setTimeout(20 * 1000);

test("Normal GET request on /api/summary", async () => {
    await request("http://localhost:3000")
        .get("/api/summary")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.timestamp).toBeDefined();
            expect(response.body.level).toBeDefined();
            expect(response.body.water_temperature).toBeDefined();
            expect(response.body.air_temperature).toBeDefined();
            expect(response.body.atmospheric_pressure).toBeDefined();
            expect(response.body.humidity).toBeDefined();
            expect(response.body.rain).toBeDefined();
            expect(response.body.total_volume).toBeDefined();
            expect(response.body.volume).toBeDefined();
            expect(response.body.volume_percentage).toBeDefined();
        });
});