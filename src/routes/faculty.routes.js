const express = require("express");
const prisma = require("../lib/prisma");
const { defaultFacultyStructure } = require("../utils/constants");

const router = express.Router();

// GET /faculty
router.get("/", async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany({
      include: {
        educationalDetails: true,
        researchDetails: true,
        patentPublishedDetails: true,
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
      include: {
        educationalDetails: true,
        researchDetails: true,
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
  const {
    id,
    name,
    email,
    educationalDetails,
    researchDetails,
    patentPublishedDetails,
  } = req.body;

  let error = "";

  console.log("add faculty");

  if (!id) error = "Id shouldn't be empty";
  else if (!name) error = "Name shouldn't be empty";
  else if (!email) error = "Email shouldn't be empty";

  if (error) return res.status(400).send({ error });

  try {
    const data = {
      ...req.body,
      educationalDetails: {
        create: [...educationalDetails],
      },
      researchDetails: {
        create: { ...researchDetails },
      },
      // patentPublishedDetails: {
      //   create: patentPublishedDetails ? [...patentPublishedDetails] : [],
      // },
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

  const { educationalDetails, researchDetails, ...rest } = req.body;

  try {
    await prisma.faculty.update({
      where: {
        uuid,
      },

      data: {
        ...rest,
      },
    });

    await prisma.researchDetails.update({
      where: {
        facultyUuid: uuid,
      },

      data: {
        ...researchDetails,
      },
    });

    educationalDetails.forEach(async (item) => {
      await prisma.educationalDetails.upsert({
        where: {
          id: item?.id || 999999,
        },
        update: item,
        create: {
          ...item,
          facultyUuid: uuid,
        },
      });
    });

    return res.status(200).send({
      message: "Faculty updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error });
  }
});

// DELETE /faculty/educational-details/:id (delete educational detail)
router.delete("/educational-details/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    await prisma.educationalDetails.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res
      .status(200)
      .send({ message: "Educational Details deleted successfully" });
  } catch (error) {
    return res.status(401).send({ error: "Something went wrong" });
  }
});

module.exports = { facultyRouter: router };
