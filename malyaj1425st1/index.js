//requiring modules
const fs = require("fs");
// made by malyaj at chitkara university

const express = require("express");
const bodyParser = require("body-parser");
//making use of express js
var app = express();
// made by malyaj at chitkara university

app.use(bodyParser.urlencoded({ extended: true }));
//loading main page
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/main.html");
});
//loading form page
app.get("/form.html", function (request, response) {
  response.sendFile(__dirname + "/form.html");
});
app.get("/form", function (request, response) {
  const studentx = require("./scorecard");
  response.json(studentx);
});
//loading submission page
app.get("/datafile.html", function (request, response) {
  response.sendFile(__dirname + "/datafile.html");
});
// made by malyaj at chitkara university

app.get("/datafile", function (request, response) {
  const students = require("./scorecard");
  response.json(students);
});
//uploading data to server
app.post("/new", function (request, response) {
  const students = require("./scorecard");
  var id = Number(request.body.ID);
  var check = true;
  for (var i = 0; i < students.length; i++) {
    if (students[i].id == id) {
      check = false;
    }
  }
// made by malyaj at chitkara university

  var name = request.body.NAME;
  if (name.length > 30 || name.length < 1) {
    check = false;
  }
  var addr = request.body.ADDR;
  if (addr.length > 100 || addr.length < 10) {
    check = false;
  }
  var java = Number(request.body.JAVA);
  if (java < 0 || java > 100) {
    check = false;
  }
  var cpp = Number(request.body.CPP);
  if (cpp < 0 || cpp > 100) {
    check = false;
  }
  var nalr = Number(request.body.NALR);
  if (nalr < 0 || nalr > 100) {
    check = false;
  }
// made by malyaj at chitkara university

  var fd = Number(request.body.FD);
  if (fd < 0 || fd > 100) {
    check = false;
  }
  var bc = Number(request.body.BC);
  if (bc <0 || bc>100) {
    check = false;
  }

  if (check == true) {
    var total = java + cpp + nalr + fd + bc;
    var average = (java + cpp + nalr + fd + bc) / 5;
    var grade;
    if (average > 90) grade = "A";
    else if (average > 70 && average < 90) grade = "B";
    else if (average > 50 && average < 70) grade = "C";
    else if (average > 33 && average < 50) grade = "D";
    else grade = "F";

    let student = {
      id: id,
      name: name,
      addr: addr,
      java: java,
      cpp: cpp,
      nalr: nalr,
      fd: fd,
      bc: bc,
      total: total,
      average: average,
      grade: grade,
    };
    students.push(student);
    fs.writeFile("scorecard.json", JSON.stringify(students), (err) => {
      // Checking for errors
      if (err) throw err;

      console.log("Done writing");
    });
    fs.readFile("scorecard.json", function (err, data) {
      // Check for errors
      if (err) throw err;

      // Converting to JSON
      const users = JSON.parse(data);

      console.log(users); // Print users
    });
    json = JSON.stringify(student);
    json += "\n\n";
    fs.appendFile("data.txt", json, function (err) {
      if (err) throw err;
      console.log("Updated!");
    });

    response.sendFile(__dirname + "/main.html");
  } else {
    response.sendFile(__dirname + "/form.html");
  }
});
app.listen(3000);
// made by malyaj at chitkara university
