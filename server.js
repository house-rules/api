const express           = require("express");
const mustacheExpress   = require("mustache-express");
const bodyParser        = require("body-parser");
const path              = require("path");
const routes            = require("./routes/index");
const morgan            = require("morgan");
const passport          = require('passport');
const BasicStrategy     = require('passport-http').BasicStrategy;

const app = express();

// below line is required for production app...setting the port
app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, "public")));

app.engine("mustache", mustacheExpress());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "mustache");
// app.set("layout", "layout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));

app.use(routes);

// the "if" is used for testing.
// getting the port from above..do this for production instead of localhost:3000
if (require.main === module) {
  app.listen(app.get('port'), function() {
    console.log("Node app is running on port", app.get('port'));
  });
}
