const express = require("express");
const cors = require("cors");
const { facultyRouter } = require("./src/routes/faculty.routes");
const { authRouter } = require("./src/routes/auth.routes");

// const bcrypt = require("bcrypt");
// const hashPassword = await bcrypt.hash("admin", 10);
// console.log(hashPassword);

const app = express();

app.use(cors());
app.use(express.json());

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => res.send("hello"));

app.use("/faculty", facultyRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`App running on port ${port}.`);
});
