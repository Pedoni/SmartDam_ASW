const request = require("supertest");
const controller = require("../api/controllers/controller");

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

test("Expected 400 on POST /api/weather with no water temperature", async () => {
    await request("http://localhost:3000")
        .post("/api/weather")
        .send({
            air_temperature: 30,
            atmospheric_pressure: 1000,
            humidity: 60,
            rain: 15
        })
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.message).toBe("Missing data");
        });
});

test("Expected 400 on POST /api/weather with no air temperature", async () => {
    await request("http://localhost:3000")
        .post("/api/weather")
        .send({
            water_temperature: 30,
            atmospheric_pressure: 1000,
            humidity: 60,
            rain: 15
        })
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.message).toBe("Missing data");
        });
});

test("Expected 400 on POST /api/weather with no atmospheric pressure", async () => {
    await request("http://localhost:3000")
        .post("/api/weather")
        .send({
            water_temperature: 30,
            air_temperature: 30,
            humidity: 60,
            rain: 15
        })
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.message).toBe("Missing data");
        });
});

test("Expected 400 on POST /api/weather with no humidity", async () => {
    await request("http://localhost:3000")
        .post("/api/weather")
        .send({
            water_temperature: 30,
            air_temperature: 30,
            atmospheric_pressure: 1000,
            rain: 15
        })
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.message).toBe("Missing data");
        });
});

test("Expected 400 on POST /api/weather with no rain", async () => {
    await request("http://localhost:3000")
        .post("/api/weather")
        .send({
            water_temperature: 30,
            air_temperature: 30,
            atmospheric_pressure: 1000,
            humidity: 60,
        })
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.message).toBe("Missing data");
        });
});

test("Normal POST on /api/weather", async () => {
    await request("http://localhost:3000")
        .post("/api/weather")
        .send({
            water_temperature: 30,
            air_temperature: 30,
            atmospheric_pressure: 1000,
            humidity: 60,
            rain: 15
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

test("Normal GET request on /api/weather", async () => {
    await request("http://localhost:3000")
        .get("/api/weather")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.timestamp.length).toBe(10);
            expect(response.body.water_temperature.length).toBe(10);
            expect(response.body.air_temperature.length).toBe(10);
            expect(response.body.atmospheric_pressure.length).toBe(10);
            expect(response.body.humidity.length).toBe(10);
            expect(response.body.rain.length).toBe(10);
        });
});

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