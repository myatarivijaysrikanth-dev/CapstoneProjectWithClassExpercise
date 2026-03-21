const express = require("express");

const app = express();
const PORT = 4000;

const coursesRoutes = require("./routes/courses");

// middleware to parse json
app.use(express.json());

//Challenge 1 — Basic Route Setup (Easy)
app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere LMS API");
});

app.use("/courses", coursesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
