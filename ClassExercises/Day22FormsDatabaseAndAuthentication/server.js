const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

require("./config/passport")(passport);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "views")));

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
