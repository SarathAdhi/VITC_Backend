const express = require("express");
const cors = require("cors");
const {
  createFaculty,
  getFaculties,
  getFacultyById,
} = require("./controllers/faculty.controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("hello"));
app.get("/faculty", getFaculties);
app.get("/faculty/:uuid", getFacultyById);

app.post("/faculty", createFaculty);

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
