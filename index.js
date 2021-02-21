import express from "express";
import path from "path";
import ejs from "ejs";

import data from "data.js"

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 8080;
const app = express();

const renderTemplate = (alias, data) => {
  let filename = path.resolve(__dirname, "templates", "index.ejs");
  let dataForRender = {
    alias: alias,
    data: data,
  };
  return ejs.renderFile(filename, dataForRender);
};

app.get("/", (req, res) => {
  // let theme = req.query.theme ?? "dark"
  let slide = req.query.slide - 1 ?? 0
  renderTemplate(data[slide].alias, data[slide].data).then((html) => {
    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
