const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

// GET /faculty
router.get("/", async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany({});

    return res.status(200).send(faculties);
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

// GET /faculty/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const faculty = await prisma.faculty.findUnique({
      where: {
        id: id,
      },
    });

    if (faculty) {
      return res.status(200).send(faculty);
    }

    return res.status(400).send({ error: "Faculty not found" });
  } catch (error) {
    res.status(401).send({ error });
  }
});

// POST /faculty (create faculty)
router.post("/", async (req, res) => {
  const { id, name, email } = req.body;

  let error = "";

  console.log("add faculty");

  if (!id) error = "Id shouldn't be empty";
  else if (!name) error = "Name shouldn't be empty";
  else if (!email) error = "Email shouldn't be empty";

  if (error) return res.status(400).send({ error });

  try {
    const data = {
      ...req.body,
    };

    const faculty = await prisma.faculty.create({
      data,
    });

    return res
      .status(200)
      .send({ faculty, message: "Faculty added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

// PUT /faculty/:id (update faculty)
router.put("/:uuid", async (req, res) => {
  let { uuid } = req.params;

  uuid = parseInt(uuid);

  try {
    await prisma.faculty.update({
      where: {
        uuid,
      },

      data: {
        ...req.body,
      },
    });

    return res.status(200).send({
      message: "Faculty updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

module.exports = { facultyRouter: router };
