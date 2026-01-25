const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const supertest = require("supertest");

const app = require('../app');
const User = require("../models/users");
const { info, error } = require("../utils/logger");
const mongoose = require("mongoose")

const api = supertest(app);

describe("test creating a user via Post /api/users", async () => {
        const usersCount = 1;
        beforeEach(async () => {
                await User.deleteMany({});
                await User.insertOne({
                        username: "username-1",
                        passwordHash: "passwordHash-1",
                })
        });
        test("creating valid user", async () => {
                const validNewUser = {
                        username: "new-user-1",
                        password: "new-user-1-pass",
                }
                await api.post("/api/users").send(validNewUser).expect(201);


                const response = await api.get("/api/users").expect(200);
                const users = response.body;


                const expectedUsersCount = usersCount + 1;
                const actualUsersCount = users.length;
                assert.strictEqual(actualUsersCount, expectedUsersCount)
        });

        test("creating invalid user with invalid username(shorter than 3 chars)", async () => {
                const invalidNewUser = {
                        username: "aa",
                        password: "password"
                }
                await api.post("/api/users").send(invalidNewUser).expect(400);
                const response = await api.get("/api/users");
                const users = response.body;
                const actualUsersCount = users.length;
                const expectedUsersCount = usersCount;
                assert.strictEqual(actualUsersCount, expectedUsersCount);
        })


        test("creating invalid user with invalid username(non unique)", async () => {
                const invalidNewUser = {
                        username: "username-1",
                        password: "password-1"
                };

                await api.post("/api/users").send(invalidNewUser).expect(409);
                const response = await api.get("/api/users");
                const users = response.body;

                const actualUsersCount = users.length;
                const expectedUsersCount = usersCount;
                assert.strictEqual(actualUsersCount, expectedUsersCount);
        })

});

// describe("querying users :", async () => {
//         beforeEach(async () => {
//         })
//         test("listing all users",async () => {
//                 {}
//         })
// })
//
after(
        async () => {
                await mongoose.connection.close();
        }

)


// describe("initially having some users", async () => {
//         beforeEach(async () => {
//
//         })
// });
//



