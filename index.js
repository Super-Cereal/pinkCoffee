import express from "express";
import path from "path";
import ejs from "ejs";

import data from "./data.js";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 8080;
const app = express();
app.use(express.static(__dirname + '/public'));

const renderTemplate = (alias, data) => {
  let filename = path.resolve(__dirname, "templates", "index.ejs");
  return ejs.renderFile(filename, { alias, data });
};

app.get("/", (req, res) => {
  // let theme = req.query.theme ?? "dark"
  let slide = (req.query.slide ?? 1) - 1;
  renderTemplate(data[slide].alias, data[slide].data).then((html) => {
    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
