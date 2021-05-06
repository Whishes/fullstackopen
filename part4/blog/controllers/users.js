const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //console.log(body.password.length);
  if (body.password === undefined || body.username === undefined) {
    response.status(400).send({ error: "Username and/or password is missing" });
  }
  if (body.password.length < 3) {
    response.status(400).send({ error: "Password is too short" });
  }
  if (body.username.length < 3) {
    response.status(400).send({ error: "Username is too short" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  //console.log(user);

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    user: 1,
    title: 1,
    likes: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
