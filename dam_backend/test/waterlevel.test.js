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

test("Expected same level when GETting after POST", async () => {
    const req = { value: 100 };
    await request("http://localhost:3000")
        .post("/api/waterlevel")
        .send(req)
        .expect(200);

    await request("http://localhost:3000")
        .get("/api/waterlevel")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            // the last value inserted is in the first position because
            // the values are returned sorted from the most recent to the oldest
            expect(response.body.waterlevel[0]).toBe(req.value);
        });
});

test("POSTing 10 values and expecting them in reverse order", async () => {
    const values = [13, 87, 65, 23, 44, 19, 85, 35, 26, 80];
    for (let i = 0; i < 10; i++) {
        await request("http://localhost:3000")
            .post("/api/waterlevel")
            .send({
                value: values[i]
            })
            .expect(200);
    }

    await request("http://localhost:3000")
        .get("/api/waterlevel")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(response => {
            expect(response.body.waterlevel).toStrictEqual(values.reverse());
        });
});

test("POSTing negative waterlevel values", async () => {
    await request("http://localhost:3000")
            .post("/api/waterlevel")
            .send({
                value: -1
            })
            .expect(400)
            .then(response => {
                expect(response.body.message).toBe("Invalid value");
            });
});