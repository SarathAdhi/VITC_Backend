const client = require("../client");

const createFaculty = async (req, res) => {
  const { name, image } = req.body;

  try {
    const newFaculty = await client.query(
      "INSERT INTO faculty (name, image) VALUES($1, $2)",
      [name, image]
    );
    res.status(200).send(newFaculty.rows);
  } catch (error) {
    console.log(error);
    res.status(200).send({ error });
  }
};

const getFaculties = async (req, res) => {
  try {
    const faculties = await client.query("Select * from faculty");
    res.status(200).send(faculties.rows);
  } catch (error) {
    res.status(401).send({ error });
  }
};

const getFacultyById = async (req, res) => {
  const { uuid } = req.params;

  try {
    const faculty = await client.query(
      "Select * from faculty WHERE uuid = $1",
      [uuid]
    );

    if (faculty.rows[0]) {
      return res.status(200).send(faculty.rows[0]);
    }

    return res.status(400).send({ error: "Faculty not found" });
  } catch (error) {
    res.status(401).send({ error });
  }
};

module.exports = { createFaculty, getFaculties, getFacultyById };
