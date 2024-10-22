const express = require("express");
const path = require("path");
const fs = require("fs");

const taskRout = require("./routes/tasks");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //to use ejs templet

app.use(express.static("public")); //serving static files

app.use(express.urlencoded({ extended: false })); //middleware to exratc incoming data form the files

app.use(taskRout);

app.listen(9090);
