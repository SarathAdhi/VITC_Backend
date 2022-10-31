const express = require("express");
const cors = require("cors");
const { facultyRouter } = require("./src/routes/faculty.routes");
const { adminRouter } = require("./src/routes/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("hello"));

app.use("/faculty", facultyRouter);
app.use("/admin", adminRouter);

// app.delete("/educational-details/:id", deleteEducationalDetailsFaculty);

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
