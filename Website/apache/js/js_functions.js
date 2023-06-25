
function changeColor() {
    // Generating random color each time
    document.body.style.background = "#" + (Math.random() * 16777215 | 0).toString(16);
}

function drawPieChart(chartType)
{
    var svg = d3.select(chartType),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = width / 2;

    // Step 1
    var data = [{name: "Alex", share: 20.70},
        {name: "Shelly", share: 30.92},
        {name: "Clark", share: 15.42},
        {name: "Matt", share: 13.65},
        {name: "Jolene", share: 19.31}];

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Step 4
    var ordScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);

    // Step 5
    var pie = d3.pie().value(function(d) {
        return d.share;
    });

    var arc = g.selectAll("arc")
        .data(pie(data))
        .enter();

    // Step 6
    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return ordScale(d.data.name); });

    // Step 7
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("text")
        .attr("transform", function(d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .text(function(d) { return d.data.name; })
        .style("font-family", "arial")
        .style("font-size", 15);
}