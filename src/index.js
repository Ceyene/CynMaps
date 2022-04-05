//dependencies
const express = require("express");
const engine = require("ejs-mate");
const path = require("path");

const app = express();

//setting a view engine
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use(require("./routes/"));

//static files
app.use(express.static(path.join(__dirname, "public")));

//starting server
app.listen(4000, () => {
	console.log("Server on port 4000...");
});
