// When the browser window is resized, responsify() is called.
// d3.select(window).on("resize", makeResponsive);

// // When the browser loads, makeResponsive() is called.
// makeResponsive();

// // The code for the chart is wrapped inside a function that automatically resizes the chart
// function makeResponsive() {
  // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
  // var svgArea = d3.select(".chart").select("svg");
  // if (!svgArea.empty()) {
  //   svgArea.remove();
  // }

  // SVG wrapper dimensions are determined by the current width and height of the browser window.
  var svgWidth = 960;
  var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
 var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Append a div to the body to create tooltips, assign it a class
d3.select("#scatter")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", .2);


// Retrieve data from csv
d3.csv("data/data.csv", function(err, usData) {
  if (err) throw err;
 
 // Convert value to an integer
  usData.forEach(function(data) {
    data.income = +data.income;
    data.depression = +data.depression;
    data.abb = data.abb;
  });


var chart = svg.selectAll("g")
  .data(usData)

var Nchart = chart.enter()
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // Create scale functions
  var yLinearScale = d3.scaleLinear()
    .range([height, 0]);

  var xLinearScale = d3.scaleLinear()
    .range([0, width]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  // Scale the domain
  xLinearScale.domain([15000, d3.max(usData, function(data) {
    return +data.income;
  })]);
  yLinearScale.domain([0, d3.max(usData, function(data) {
    return +data.depression * 1.2;
  })]);




// // Grabbing extra info when doing click event
//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(data) {
//       var state = data.state;
//       var abb = data.abb;
//       var income = +data.income;
//       var depression = +data.depression;

//       console.log(state)

//       return (state + "<br> Median Income: " + income + "<br> Depression: " + depression);
//     });


//   chart.call(toolTip);


  Nchart.append("circle")
    // .data(usData)
    // .enter().append("circle")
      .attr("cx", function(data, index) {
        console.log(data.income);
        return xLinearScale(data.income);
      })
      .attr("cy", function(data, index) {
        return yLinearScale(data.depression);
      })
      .attr("r", "15")
      .attr("fill", "blue")
      .attr("opacity", ".7")
      .on("click", function(data) {
        toolTip.show(data);
      })

    Nchart.append("text")
      .attr("x", function(data, index){
      return xLinearScale(data.income);
    })
    .attr("y", function(data, index){
      return yLinearScale(data.depression);
    })
    .text(function(data) {
      return data.abb})
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "white");

      // // onmouseout event
      // .on("mouseout", function(data, index) {
      //   toolTip.hide(data);
      // });



  Nchart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  Nchart.append("g")
    .call(leftAxis);

  Nchart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Rate of Depression (%)");

// Append x-axis labels
  Nchart.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 30) + ")")
    .attr("class", "axisText")
    .text("Median Income ($)");
  });
// };
