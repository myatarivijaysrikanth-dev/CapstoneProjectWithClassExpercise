const express = require("express");
const courseRoutes = require("./routes/courses");

const app = express();

app.use(express.json());

app.use("/api/v1/courses", courseRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});