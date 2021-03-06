let movieDataUrl =
"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let movieData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawTreeMap = () => {
  let hierarchy = d3.
  hierarchy(movieData, node => node.children).
  sum(node => node.value).
  sort((node1, node2) => node2.value - node1.value);

  let createTreeMap = d3.treemap().size([1000, 600]);

  createTreeMap(hierarchy);

  let movieTiles = hierarchy.leaves();
  console.log(movieTiles);

  let blocks = canvas.
  selectAll("g").
  data(movieTiles).
  enter().
  append("g").
  attr("transform", d => "translate(" + d.x0 + ", " + d.y0 + ")");

  blocks.
  append("rect").
  attr("class", "tile").
  attr("fill", d => {
    let category = d.data.category;
    if (category === "Action") {
      return "#FEA47F";
    } else if (category === "Drama") {
      return "#25CCF7";
    } else if (category === "Adventure") {
      return "#EAB543";
    } else if (category === "Family") {
      return "#55E6C1";
    } else if (category === "Animation") {
      return "#2C3A47";
    } else if (category === "Comedy") {
      return "#82589F";
    } else if (category === "Biography") {
      return "#c23616";
    }
  }).
  attr("data-name", d => d.data.name).
  attr("data-category", d => d.data.category).
  attr("data-value", d => d.data.value).
  attr("width", d => d.x1 - d.x0).
  attr("height", d => d.y1 - d.y0).
  on("mouseover", d => {
    tooltip.transition().style("visibility", "visible");
    tooltip.html("Total Earning of " + d.data.name + ": $" + d.data.value);
    tooltip.attr("data-value", d.data.value);
  }).
  on("mouseout", d => {
    tooltip.transition().style("visibility", "hidden");
  });

  blocks.
  append("text").
  text(d => d.data.name).
  attr("x", 5).
  attr("y", 20);
};

d3.json(movieDataUrl).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    movieData = data;
    console.log(movieData);
  }
  drawTreeMap();
});