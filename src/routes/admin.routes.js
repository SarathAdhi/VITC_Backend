const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const uuid = require("uuid");

const router = express.Router();

// POST /admin (create admin)
router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  let error = "";

  if (!username) error = "Username shouldn't be empty";
  else if (!password) error = "password shouldn't be empty";

  if (error) return res.status(400).send({ error });

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const data = {
      uuid: uuid.v4(),
      username,
      password: hashPassword,
    };

    const admin = await prisma.admin.create({
      data,
    });

    return res
      .status(200)
      .send({ admin, message: "Admin created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ error: error.message });
  }
});

// GET /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let error = "";

  if (!username) error = "Username shouldn't be empty";
  else if (!password) error = "password shouldn't be empty";

  if (error) return res.status(400).send({ error });

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return res.status(401).send({ error: "Invalid Credentials" });
    }

    const isCorrectPassword = await bcrypt.compare(password, admin.password);

    if (!isCorrectPassword) {
      return res.status(401).send({ error: "Invalid Credentials" });
    }

    return res
      .status(200)
      .send({ message: "Login successful", token: admin.uuid });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

// POST /token
router.post("/verify", async (req, res) => {
  const { token } = req.body;

  try {
    const admin = await prisma.admin.findFirst({ where: { uuid: token } });

    if (!admin) {
      return res.status(200).send({ isAuth: false });
    }

    return res.status(200).send({ isAuth: true });
  } catch (error) {
    return res.status(401).send({ error });
  }
});

module.exports = { adminRouter: router };
