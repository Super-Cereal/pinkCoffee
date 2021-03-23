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
      </head>
      <body class="theme_${themeColor}">
        <script type="text/javascript" src="data.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
        <script type="text/javascript" src="stories.js"></script>
        <script>
          let slide = ${slide};
          let slideAlias = window.data[slide].alias;
          let slideData = window.data[slide].data;
          console.log(slideData);
          const body = document.querySelector('body');
          body.innerHTML = window.renderTemplate(slideAlias, slideData);
        </script>
        <script>
          let dataD = [30, 32, 58, 62];
          let r = 120;

          let canvas = d3.select("body").select("svg")
            .attr("width", "240").attr("height", "240")
            .attr("viewbox", "0 0 240 240")
            .attr("fill", "none").attr("xmlns", "http://www.w3.org/2000/svg")
            .style("transform", "rotate(-31deg)");
          let group = canvas.append("g")
            .attr("transform", "translate(120, 120)");

          let whites = ["url(#paint03_radial)", "url(#paint00_radial)", "url(#paint02_radial)", "url(#paint01_radial)"],
            w = -1;
          const color_white = () => {
            w += 1;
            return whites[w];
          }

          let opacities = ["0.8", "0.6", "0.25", "0.5"], 
            o = -1;
          const opacity_white = () => {
            o += 1;
            return opacities[o];
          }

          let filters = ["url(#filter03_ii)", "url(#filter00_ii)", "url(#filter02_ii)", "url(#filter01_ii)"],
            f = -1;
          const filters_white = () => {
            f += 1;
            return filters[f]
          }
          let arc = d3.svg.arc()
            .innerRadius(0.7*r).outerRadius(r)
            .padAngle(0.02).cornerRadius(6);

          let pie = d3.layout.pie().sort(null).value(d => d);

          let arcs = group.selectAll(".arc")
            .data(pie(dataD))
            .enter().append("g")
            .attr("filter", d => filters_white())
          
          arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color_white())
            .attr("fill-opacity", d => opacity_white())
        </script>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}`);
});
