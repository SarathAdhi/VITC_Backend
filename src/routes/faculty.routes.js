const express = require("express");
const prisma = require("../lib/prisma");
const uuid = require("uuid");

const router = express.Router();

// GET /faculty
router.get("/", async (req, res) => {
  console.log("get faculty");

  try {
    const faculties = await prisma.faculty.findMany({
      where: {
        isApproved: true,
      },
    });

    return res.status(200).send(faculties);
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

// GET /approvals
router.get("/approvals", async (req, res) => {
  const { isApproved } = req.query;

  try {
    const faculties = await prisma.faculty.findMany({
      where: {
        isApproved: isApproved === "true",
      },
    });

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

    console.log(faculty);

    if (faculty) {
      return res.status(200).send(faculty);
    }

    return res.status(400).send({ error: "Faculty not found" });
  } catch (error) {
    res.status(401).send({ error });
  }
});

// POST /faculty/create (create faculty)
router.post("/create", async (req, res) => {
  const { id, name, email } = req.body;

  let error = "";

  console.log("add faculty");

  if (!id) error = "Id shouldn't be empty";
  else if (!name) error = "Name shouldn't be empty";
  else if (!email) error = "Email shouldn't be empty";

  if (error) return res.status(400).send({ error });

  try {
    const data = {
      uuid: uuid.v4(),
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
router.put("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    await prisma.faculty.update({
      where: {
        id,
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

// PUT /faculty/approve/:id (approve faculty)
router.put("/approve/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.faculty.update({
      where: {
        id,
      },

      data: {
        isApproved: true,
      },
    });

    return res.status(200).send({
      message: "Faculty approved",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

// PUT /faculty/un-approve/:id (un-approve faculty)
router.put("/un-approve/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.faculty.update({
      where: {
        id,
      },

      data: {
        isApproved: false,
      },
    });

    return res.status(200).send({
      message: "Faculty un-approved",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

module.exports = { facultyRouter: router };
