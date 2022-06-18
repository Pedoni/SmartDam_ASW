const request = require("supertest");

jest.setTimeout(20 * 1000);

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

test("Expected same values when GETting after POST", async () => {
    const req = {
        water_temperature: 31,
        air_temperature: 29,
        atmospheric_pressure: 1000,
        humidity: 60,
        rain: 15
    };
    await request("http://localhost:3000")
        .post("/api/weather")
        .send(req)
        .expect(200);

    await request("http://localhost:3000")
        .get("/api/weather")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            // the last value inserted is in the first position because
            // the values are returned sorted from the most recent to the oldest
            expect(response.body.water_temperature[0]).toBe(req.water_temperature);
            expect(response.body.air_temperature[0]).toBe(req.air_temperature);
            expect(response.body.atmospheric_pressure[0]).toBe(req.atmospheric_pressure);
            expect(response.body.humidity[0]).toBe(req.humidity);
            expect(response.body.rain[0]).toBe(req.rain);
        });
});

test("POSTing 10 values and expecting them in reverse order", async () => {
    const values = {
        water_temperature: [],
        air_temperature: [],
        atmospheric_pressure: [],
        humidity: [],
        rain: []
    };
    for (let i = 0; i < 10; i++) {
        let req = {};

        let x = 30+i;
        req.water_temperature = x;
        values.water_temperature.push(x);

        x = 25+i;
        req.air_temperature = x;
        values.air_temperature.push(x);

        x = 1000+i;
        req.atmospheric_pressure = x;
        values.atmospheric_pressure.push(x);

        x = 60+i;
        req.humidity = x;
        values.humidity.push(x);

        x = 5+i;
        req.rain = x;
        values.rain.push(x);

        await request("http://localhost:3000")
            .post("/api/weather")
            .send(req)
            .expect(200);
    }

    await request("http://localhost:3000")
        .get("/api/weather")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.water_temperature).toStrictEqual(values.water_temperature.reverse());
            expect(response.body.air_temperature).toStrictEqual(values.air_temperature.reverse());
            expect(response.body.atmospheric_pressure).toStrictEqual(values.atmospheric_pressure.reverse());
            expect(response.body.humidity).toStrictEqual(values.humidity.reverse());
            expect(response.body.rain).toStrictEqual(values.rain.reverse());
        });
});