const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const uuid = require("uuid");

const router = express.Router();

// POST /admin (create admin)
// router.post("/create", async (req, res) => {
//   const { username, password } = req.body;

//   let error = "";

//   if (!username) error = "Username shouldn't be empty";
//   else if (!password) error = "password shouldn't be empty";

//   if (error) return res.status(400).send({ error });

//   try {
//     const hashPassword = await bcrypt.hash(password, 10);

//     const data = {
//       uuid: uuid.v4(),
//       username,
//       password: hashPassword,
//     };

//     const admin = await prisma.admin.create({
//       data,
//     });

//     return res
//       .status(200)
//       .send({ admin, message: "Admin created successfully" });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(401).send({ error: error.message });
//   }
// });

router.post("/login", async (req, res) => {
  const { id, password } = req.body;

  let error = "";

  if (!id) error = "Id shouldn't be empty";
  else if (!password) error = "password shouldn't be empty";

  if (error) return res.status(400).send({ error });

  try {
    const faculty = await prisma.faculty.findUnique({ where: { id } });

    if (!faculty) {
      return res.status(401).send({ error: "Id not found" });
    }

    const isCorrectPassword = await bcrypt.compare(password, faculty.password);

    if (!isCorrectPassword) {
      return res.status(401).send({ error: "Invalid Credentials" });
    }

    return res
      .status(200)
      .send({ message: "Login successful", token: faculty.uuid });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

// POST /verify (verify token)
router.post("/verify", async (req, res) => {
  const { token } = req.body;

  const faculty = await prisma.faculty.findFirst({ where: { uuid: token } });

  if (!faculty) {
    return res.status(200).send({ isAuth: false });
  }

  const { password, ...rest } = faculty;

  return res.status(200).send({ isAuth: true, user: { ...rest } });
});

module.exports = { authRouter: router };
