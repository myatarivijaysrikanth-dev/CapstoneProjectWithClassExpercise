require("dotenv").config();

const express = require("express");
const app = express();

const mysqlRoutes = require("./routes/mysqlRoutes");
const mongoRoutes = require("./routes/mongoRoutes");
const sequelizeRoutes = require("./routes/sequelizeRoutes");

app.use(express.json());

app.use("/mysql", mysqlRoutes);
app.use("/mongo", mongoRoutes);
app.use("/sequelize", sequelizeRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
