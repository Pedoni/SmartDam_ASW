const controller = require("../api/controllers/controller");
const waterlevel = require("../api/model/waterlevel");

const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

jest.setTimeout(20 * 1000);

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });

    // it('should insert a doc into collection', async () => {
    //     const users = db.collection('waterlevels');

    //     const mockUser = { _id: 'some-user-id', name: 'John' };
    //     await users.insertOne(mockUser);

    //     const insertedUser = await users.findOne({ _id: 'some-user-id' });
    //     expect(insertedUser).toEqual(mockUser);
    // });

    it("GET /api/waterlevel", async () => {
        const post = await waterlevel.create({
            _id: ObjectId("abcdefghijkl"),
            timestamp: Date.now(),
            level: 100
        });
        console.log("eheheheh");

        await supertest(app).get("/api/waterlevel/" + post._id)
            .expect(200)
            .then((response) => {
                expect(response.body._id).toBe(post._id);
                expect(response.body.timestamp).toBe(post.timestamp);
                expect(response.body.level).toBe(post.level);
            });
    });
});

// test('string with a single number should result in the number itself', () => {
//     expect(1).toBe(1);
// });

// // test("Expected 400 if no request", () => {
// //     expect(
// //         controller.addNewWaterlevelData(null, new http.ServerReponse(), null)
// //     ).toBe({});
// // });