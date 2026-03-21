const express = require("express");

const logger = require("./middleware/logger");
const userRoutes = require("./routes/users");

const app = express();
const PORT = 4000;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/users", userRoutes);

const courses = [
  { id: 1, name: "React Mastery", duration: "6 weeks" },
  { id: 2, name: "Node.js Basics", duration: "4 weeks" },
  { id: 3, name: "MongoDB Fundamentals", duration: "5 weeks" }
];

app.get("/courses", (req, res) => {
  res.render("courses", { courses });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});