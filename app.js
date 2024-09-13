const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
// const flash = require("connect-flash");

const listing = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

main()
  .then((res) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(Mongo_url);
}

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.get("/", (req, res) => {
  res.send("Hie , I am root");
});

app.use(session(sessionOptions));
// app.use(flash());

// app.use((req, res, next) => {
//   res.locals.successMsg = req.flash("success");
//   next();
// });

app.use("/listings", listing);
app.use("/listings/:id/reviews", reviews);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong !!" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
  console.log(err);
});

app.listen("8080", () => {
  console.log("server is listening on port 8080");
});
