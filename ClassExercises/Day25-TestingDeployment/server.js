const express = require("express");

const coursesRoutes = require("./routes/courses");
const usersRoutes = require("./routes/users");

const app = express();

app.use(express.json());

app.use("/api/courses", coursesRoutes);
app.use("/api/users", usersRoutes);

app.get("/status", (req, res) => {
  res.send("App is live");
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;