import express from "express";
import path from "path";
import ejs from "ejs";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 8080;
const app = express();

const renderTemplate = (alias, data) => {
  let filename = path.resolve(__dirname, "templates", "index.ejs");
  let dataForRender = {
    alias: alias,
  };
  return ejs.renderFile(filename, dataForRender);
};

app.get("/", (req, res) => {
  renderTemplate("Leaders", "").then((html) => {
    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
