const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const hbs = require("hbs");
const config = require("./config");
const crypto = require("crypto");
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

// app.use(
//   "/messenger/webhook",
//   bodyParser.json({
//     verify: verifyRequestSignature,
//   })
// );
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];
  console.log("la firma: ", signature);
  if (!signature) {
    throw new Error("Couldn't validate the signature.");
  } else {
    var elements = signature.split("=");
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto
      .createHmac("sha1", config.FB_APP_SECRET)
      .update(buf)
      .digest("hex");

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "20mb",
  })
);

// parse application/json
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

mongoose.connect(
  config.DBSTRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err, res) => {
    if (err) throw err;
    console.log("DB online ONLINE");
  }
);

app.use(
  session({
    secret: "ijegoierjgoiemrjgoiem",
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: false,
    saveUninitialized: true,
    vcookie: {
      httpOnly: true,
      maxAge: 2419200000,
    }, // configure when sessions expires
  })
);
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
// require("./chatbots/Telegram/telegramBot");
//api
app.use("/api", require("./routes/api"));

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
