function build_map()
{
    document.write('<div class="live-map">Map\n'+
        '<div id="world-map" style="width: 600px; height: 360px;margin: auto;"></div></div>')

    document.getElementById("world-map").addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    $('#world-map').vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: gdpData,
                scale: ['#C8EEFF', '#0071A4'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionTipShow: function(e, el, code){
            el.html(el.html()+' (GDP - '+gdpData[code]+')');
        }
    });
}

function build_geo_pie()
{
    document.write('<div class="top-geolocation-pie"><h4>Top Geolocations</h4>\n' +
        '<svg id="geolocation-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#geolocation-svg"),
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

function build_port_pie()
{
    document.write('        <div class="top-ports-pie"><h4>Top Ports</h4>\n' +
        '            <svg id="top-ports-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#top-ports-svg"),
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

function build_username_pie()
{
    document.write('        <div class="top-usernames-pie"><h4>Top Usernames</h4>\n' +
        '            <svg id="top-usernames-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#top-usernames-svg"),
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


function build_password_pie()
{
    document.write('        <div class="top-passwords-pie"><h4>Top Passwords</h4>\n' +
        '<svg id="top-passwords-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#top-passwords-svg"),
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

function build_geo_vert()
{
    document.write('        <div class="top-geolocation-vert">\n' +
        '            <h6 class="vert-h6">Top Geolocations</h6>\n' +
        '            <table>\n' +
        '                <tr><td>US</td><td class="numbers">1000</td></tr>\n' +
        '                <tr><td>RU</td><td class="numbers">969</td></tr>\n' +
        '                <tr><td>CN</td><td class="numbers">420</td></tr>\n' +
        '                <tr><td>CA</td><td class="numbers">323</td></tr>\n' +
        '                <tr><td>UK</td><td class="numbers">199</td></tr>\n' +
        '                <tr><td>MD</td><td class="numbers">10</td></tr>\n' +
        '            </table>\n' +
        '        </div>');
}

function build_ports_vert()
{
    document.write('        <div class="top-ports-vert">\n' +
        '            <h6 class="vert-h6">Top Ports</h6>\n' +
        '            <table>\n' +
        '                <tr><td>US</td><td class="numbers">1000</td></tr>\n' +
        '                <tr><td>RU</td><td class="numbers">969</td></tr>\n' +
        '                <tr><td>CN</td><td class="numbers">420</td></tr>\n' +
        '                <tr><td>CA</td><td class="numbers">323</td></tr>\n' +
        '                <tr><td>UK</td><td class="numbers">199</td></tr>\n' +
        '                <tr><td>MD</td><td class="numbers">10</td></tr>\n' +
        '            </table>\n' +
        '        </div>');
}

function build_services_vert()
{
    document.write('        <div class="top-services-vert">\n' +
        '            <h6 class="vert-h6">Top Services</h6>\n' +
        '            <table>\n' +
        '                <tr><td>US</td><td class="numbers">1000</td></tr>\n' +
        '                <tr><td>RU</td><td class="numbers">969</td></tr>\n' +
        '                <tr><td>CN</td><td class="numbers">420</td></tr>\n' +
        '                <tr><td>CA</td><td class="numbers">323</td></tr>\n' +
        '                <tr><td>UK</td><td class="numbers">199</td></tr>\n' +
        '                <tr><td>MD</td><td class="numbers">10</td></tr>\n' +
        '            </table>\n' +
        '        </div>');
}

function build_protocols_vert()
{
    document.write('        <div class="top-proto-vert">\n' +
        '            <h6 class="vert-h6">Top Protocols</h6>\n' +
        '            <table>\n' +
        '                <tr><td>US</td><td class="numbers">1000</td></tr>\n' +
        '                <tr><td>RU</td><td class="numbers">969</td></tr>\n' +
        '                <tr><td>CN</td><td class="numbers">420</td></tr>\n' +
        '                <tr><td>CA</td><td class="numbers">323</td></tr>\n' +
        '                <tr><td>UK</td><td class="numbers">199</td></tr>\n' +
        '                <tr><td>MD</td><td class="numbers">10</td></tr>\n' +
        '            </table>\n' +
        '        </div>');
}
