const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnection = require("./database/db-connect").mongoConnection;


const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const errorController = require("./controllers/error_controller");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use(errorController.route_404);

mongoConnection(() => {
  app.listen(3000);
});
