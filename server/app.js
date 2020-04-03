const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const profileRouter = require("./routes/profileRouter");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/profile", profileRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

// connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      return console.log(err);
    }
    console.log("connected to mongodb");
  }
);
module.exports = app;
