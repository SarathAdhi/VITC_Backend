const client = require("../lib/client");

const createFaculty = async (req, res) => {
  const { id, name, image, email } = req.body;

  console.log("hello");

  let error = "";

  if (!id) error = "Id shouldn't be empty";
  else if (!name) error = "Name shouldn't be empty";
  else if (!email) error = "Email shouldn't be empty";

  if (error) return res.status(400).send({ error });

  try {
    const newFaculty = await client.query(
      "INSERT INTO faculty (id, name, image, email) VALUES($1, $2, $3, $4)",
      [id, name, image, email]
    );

    res.status(200).send(newFaculty.rows);
  } catch (error) {
    res.status(401).send({ error });
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
  const { id } = req.params;

  try {
    const faculty = await client.query("Select * from faculty WHERE id = $1", [
      id,
    ]);

    if (faculty.rows[0]) {
      return res.status(200).send(faculty.rows[0]);
    }

    return res.status(400).send({ error: "Faculty not found" });
  } catch (error) {
    res.status(401).send({ error });
  }
};

module.exports = { createFaculty, getFaculties, getFacultyById };
