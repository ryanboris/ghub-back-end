const request = require("supertest");
const authRouter = require("./authRouter");

describe("AUTHENTICATION routes", () => {
  describe("POST routes", () => {
    describe("REGISTER route", () => {
      it("should send a status code 201 if user is successfully registered", async () => {
          const res = await request(authRouter).post("/register").send({username: 'Leianne', password: 'password'});
          console.log(res)
          expect(res.status).toBe(3);
      });
    });
  });
});
