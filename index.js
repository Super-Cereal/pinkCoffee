import express from "express";
import path from "path";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 8080;
const app = express();
app.use(express.static(__dirname + "/build"));

app.get("/", (req, res) => {
  let themeColor = req.query.theme ?? "dark";
  let slide = (req.query.slide ?? 1) - 1;

  let html = /* html */ `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/stories.css">
        <meta name="viewport" content="width=device-width">
        <link rel="icon" href="/images/lightFavicon.png" type="image/x-icon">
      </head>
      <body class="theme_${themeColor}">
        <script type="text/javascript" src="data.js"></script>
        <script type="text/javascript" src="stories.js"></script>
        <script>
          let slide = ${slide};
          let slideAlias = window.data[slide].alias;
          let slideData = window.data[slide].data;
          console.log(slideData);
          const body = document.querySelector('body');
          body.innerHTML = window.renderTemplate(slideAlias, slideData);
        </script>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
