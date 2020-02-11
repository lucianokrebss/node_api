const app = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);

const User = require("../src/models/userModel");
const { setupDB } = require("./test-setup");

setupDB("endpoint-testing", true);

// USER ROUTE /signup
it("Should save user to database", async done => {
  const res = await request.post(`/users/signup`).send({
    email: "testing@email.com",
    password: "12345678"
  });

  // Ensures response
  expect(res.status).toBe(201);
  expect(res.body.message).toBe("User successfully registered");

  // Searches the user in the database
  const user = await User.findOne({ email: "testing@email.com" });
  expect(user.password).toBeTruthy();
  expect(user.email).toBeTruthy();

  done();
});

// USER ROUTE /CPF/:id
it("Should save CPF to database", async done => {
  const findUser = await User.findOne({ email: "testing@email.com" });
  const userID = findUser._id;
  const res = await request.post(`/users/CPF/${userID}`).send({
    cpf: "99337807009",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMTE5YTQ0M2NhNDM1MzBlOTY0ZGEiLCJpYXQiOjE1ODEyNTcxNTEsImV4cCI6MTU4MTY4OTE1MX0.fZAL5N5GueqWRdLTMP6xFly3qCgyAlHwG_tM_aLhH_Y"
  });

  // Ensures response
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  // Searches the CPF in the database
  const user = await User.findOne({ cpf: "99337807009" });
  expect(user.cpf).toBeTruthy();

  done();
});

// USER ROUTE /fullname/:id
it("Should save Fullname to database", async done => {
  const findUser = await User.findOne({ email: "testing@email.com" });
  const userID = findUser._id;
  const res = await request.post(`/users/fullname/${userID}`).send({
    fullName: "Usuário Teste",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMTE5YTQ0M2NhNDM1MzBlOTY0ZGEiLCJpYXQiOjE1ODEyNTcxNTEsImV4cCI6MTU4MTY4OTE1MX0.fZAL5N5GueqWRdLTMP6xFly3qCgyAlHwG_tM_aLhH_Y"
  });

  // Ensures response
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  // Searches the name in the database
  const user = await User.findOne({ firstName: "Usuário" });
  expect(user.firstName).toBeTruthy();
  expect(user.lastName).toBeTruthy();

  done();
});

// USER ROUTE /birthday/:id
it("Should save Birthday to database", async done => {
  const findUser = await User.findOne({ email: "testing@email.com" });
  const userID = findUser._id;
  const res = await request.post(`/users/birthday/${userID}`).send({
    birthday: "01/01/2001",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMTE5YTQ0M2NhNDM1MzBlOTY0ZGEiLCJpYXQiOjE1ODEyNTcxNTEsImV4cCI6MTU4MTY4OTE1MX0.fZAL5N5GueqWRdLTMP6xFly3qCgyAlHwG_tM_aLhH_Y"
  });

  // Ensures response
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  // Searches birthdate in the database
  const user = await User.findOne({ birthday: "01/01/2001" });
  expect(user.birthday).toBeTruthy();

  done();
});

// USER ROUTE /phone/:id
it("Should save Birthday to database", async done => {
  const findUser = await User.findOne({ email: "testing@email.com" });
  const userID = findUser._id;
  const res = await request.post(`/users/phone/${userID}`).send({
    data: "11111111",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMTE5YTQ0M2NhNDM1MzBlOTY0ZGEiLCJpYXQiOjE1ODEyNTcxNTEsImV4cCI6MTU4MTY4OTE1MX0.fZAL5N5GueqWRdLTMP6xFly3qCgyAlHwG_tM_aLhH_Y"
  });

  // Ensures response
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  // Searches phone in the database
  expect.objectContaining({data: "11111111"});

  done();
});

// USER ROUTE /address/:id
it("Should save Address to database", async done => {
  const findUser = await User.findOne({ email: "testing@email.com" });
  const userID = findUser._id;
  const res = await request.post(`/users/address/${userID}`).send({
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMTE5YTQ0M2NhNDM1MzBlOTY0ZGEiLCJpYXQiOjE1ODEyNTcxNTEsImV4cCI6MTU4MTY4OTE1MX0.fZAL5N5GueqWRdLTMP6xFly3qCgyAlHwG_tM_aLhH_Y",
    cep: "05040000",
    number: 67
  });

  // Ensures response
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  // Searches the user in the database
  expect.objectContaining({ cep: "05040000" });
  expect.objectContaining({ number: 67 });

  done();
});

// USER ROUTE /amount/:id
it("Should save Birthday to database", async done => {
  const findUser = await User.findOne({ email: "testing@email.com" });
  const userID = findUser._id;
  const res = await request.post(`/users/amount/${userID}`).send({
    requestedAmount: "2500",
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMTE5YTQ0M2NhNDM1MzBlOTY0ZGEiLCJpYXQiOjE1ODEyNTcxNTEsImV4cCI6MTU4MTY4OTE1MX0.fZAL5N5GueqWRdLTMP6xFly3qCgyAlHwG_tM_aLhH_Y"
  });

  // Ensures response
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  // Searches requested Amount in the database
  const user = await User.findOne({ requestedAmount: "2500"});
  expect(user.requestedAmount).toBeTruthy();

  done();
});
