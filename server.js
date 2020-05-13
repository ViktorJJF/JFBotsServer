const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const hbs = require("hbs");
const config = require("./config");
require("./hbs/helpers/helpers");
//mongo session
const cors = require("cors");
const session = require("express-session"); //session managment
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
//Express HBS engine
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
//Helpers

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

// mongoose.connect(
//   config.DBSTRING,
//   {
//     useNewUrlParser: true,
//   },
//   (err, res) => {
//     if (err) throw err;
//     console.log("DB online ONLINE");
//   }
// );

// app.use(
//   session({
//     secret: "ijegoierjgoiemrjgoiem",
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//     }),
//     resave: false,
//     saveUninitialized: true,
//     vcookie: {
//       httpOnly: true,
//       maxAge: 2419200000,
//     }, // configure when sessions expires
//   })
// );
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});

//routes
app.use("/", require("./routes"));
app.use("/messenger", require("./chatbots/Facebook/facebookBot"));
require("./chatbots/Telegram/telegramBot");
//api
app.use("/api", require("./routes/api"));

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
