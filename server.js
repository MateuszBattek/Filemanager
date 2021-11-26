var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;
var path = require("path");
var formidable = require("formidable");
var hbs = require("express-handlebars");

let context = {
  leftContent: [
    {
      text: "multiupload",
    },
    {
      text: "filemanager",
      click: "USUŃ DANE O PLIKACH Z TABLICY",
    },
    {
      text: "file info",
    },
  ],
  files: [],
};
let i = 1;

app.get("/", function (req, res) {
  res.render("upload.hbs", context); // nie podajemy ścieżki tylko nazwę pliku
  // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
});

app.get("/upload", function (req, res) {
  res.render("upload.hbs", context);
});
app.get("/filemanager", function (req, res) {
  if (req.query.delete == "true") {
    let index = context.files.indexOf(
      context.files.find((x) => x.id == req.query["id"])
    );
    context.files.splice(index, 1);
  }

  res.render("filemanager.hbs", context);
});

app.post("/filemanager", function (req, res) {
  let form = formidable({});

  form.uploadDir = __dirname + "/static/upload/"; // folder do zapisu zdjęcia

  form.keepExtensions = true; // zapis z rozszerzeniem pliku

  form.multiples = true; // wiecej plikow

  form.parse(req, function (err, fields, files) {
    console.log("----- przesłane formularzem pliki ------");
    console.log(files.files);
    if (Array.isArray(files.files)) {
      for (let file of files.files) {
        file["id"] = i;
        i++;
        file["savedate"] = Date.now();
        const searchTerm = "upload";
        let index = file["path"].indexOf(searchTerm) - 1;
        let finalPath = file["path"].slice(index, file["path"].length);
        finalPath = ".." + finalPath;
        file["downloadPath"] = finalPath;

        file["image"] = file["name"].slice(-3);
        console.log(file["image"]);
        context.files.push(file);
      }
    } else {
      files.files["id"] = i;
      i++;
      files.files["savedate"] = Date.now();
      const searchTerm = "static";
      let index = files.files["path"].indexOf(searchTerm) - 1;
      let finalPath = files.files["path"].slice(
        index,
        files.files["path"].length
      );
      finalPath = ".." + finalPath;
      files.files["downloadPath"] = finalPath;
      files.files["image"] = files.files["name"].slice(-3);
      context.files.push(files.files);
    }

    //res.send(JSON.stringify(files));
    res.render("filemanager.hbs", context);
  });
});

app.get("/info", function (req, res) {
  context.myFile = context.files.find((x) => x.id == req.query["id"]);
  res.render("info.hbs", context);
});

app.get("/reset", function (req, res) {
  context.files = [];
  res.render("filemanager.hbs", context);
});

app.use(express.static("static"));
app.set("views", path.join(__dirname, "views")); // ustalamy katalog views
app.engine("hbs", hbs({ defaultLayout: "main.hbs" })); // domyślny layout, potem można go zmienić
app.set("view engine", "hbs");

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
