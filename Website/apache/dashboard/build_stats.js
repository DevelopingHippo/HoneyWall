async function build_bar_chart() {
    document.write('<div class="bar-chart">' +
        '<svg id="bar-chart" width="600" height="500"></svg></div>');

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#bar-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.json("/api/get-chart-data").then(function (data) {
        // format the data
        data.forEach(function (d) {
            d.packet_number = +d.packet_number;
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function (d) {
            return d.month;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.packet_number;
        })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.month);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.packet_number);
            })
            .attr("height", function (d) {
                return height - y(d.packet_number);
            });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .on("mouseover", onMouseOver) //Add listener for the mouseover event
            .on("mouseout", onMouseOut)   //Add listener for the mouseout event
            .attr("x", function (d) {
                return x(d.year);
            })
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("width", x.bandwidth())
            .transition()
            .ease(d3.easeLinear)
            .duration(400)
            .delay(function (d, i) {
                return i * 50;
            })
            .attr("height", function (d) {
                return height - y(d.value);
            });

    });

    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x.bandwidth() + 5)
            .attr("y", function (d) {
                return y(d.value) - 10;
            })
            .attr("height", function (d) {
                return height - y(d.value) + 10;
            });

        g.append("text")
            .attr('class', 'val')
            .attr('x', function () {
                return x(d.year);
            })
            .attr('y', function () {
                return y(d.value) - 15;
            })
            .text(function () {
                return ['$' + d.value];  // Value of the text
            });
    }

    //mouseout event handler function
    function onMouseOut(d, i) {
        // use the text label class to remove label on mouseout
        d3.select(this).attr('class', 'bar');
        d3.select(this)
            .transition()     // adds animation
            .duration(400)
            .attr('width', x.bandwidth())
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("height", function (d) {
                return height - y(d.value);
            });

        d3.selectAll('.val')
            .remove()
    }
}

async function build_map() {
    document.write('<div class="live-map">\n' +
        '<div id="world-map" style="width: 750px; height: 325px;margin: auto;padding: 10px"></div></div>')

    document.getElementById("world-map").addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    let mapData = await apiCall("/api/get-map-data");

    $('#world-map').vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: mapData,
                scale: ['#C8EEFF', '#0071A4'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionTipShow: function (e, el, code) {
            el.html(el.html() + ' (Packets - ' + mapData[code] + ')');
        }
    });
}



async function build_geo_pie() {
    document.write('<div class="top-geolocation-pie"><h4>Top Geolocations</h4>\n' +
        '<svg id="geolocation-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#geolocation-svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = width / 2;

    // Step 1
    var data = await apiCall("/api/get-pie-data?type=geo");

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Step 4
    var ordScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

    // Step 5
    var pie = d3.pie().value(function (d) {
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
        .attr("fill", function (d) {
            return ordScale(d.data.name);
        });

    // Step 7
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) {
            return d.data.name;
        })
        .style("font-family", "arial")
        .style("font-size", 15);
}

async function build_port_pie() {
    document.write('        <div class="top-ports-pie"><h4>Top Ports</h4>\n' +
        '            <svg id="top-ports-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#top-ports-svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = width / 2;

    // Step 1
    var data = await apiCall("/api/get-pie-data?type=port");

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Step 4
    var ordScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

    // Step 5
    var pie = d3.pie().value(function (d) {
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
        .attr("fill", function (d) {
            return ordScale(d.data.name);
        });

    // Step 7
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) {
            return d.data.name;
        })
        .style("font-family", "arial")
        .style("font-size", 15);
}

async function build_username_pie() {
    document.write('        <div class="top-usernames-pie"><h4>Top Usernames</h4>\n' +
        '            <svg id="top-usernames-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#top-usernames-svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = width / 2;

    // Step 1
    var data = await apiCall("/api/get-pie-data?type=username");

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Step 4
    var ordScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

    // Step 5
    var pie = d3.pie().value(function (d) {
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
        .attr("fill", function (d) {
            return ordScale(d.data.name);
        });

    // Step 7
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) {
            return d.data.name;
        })
        .style("font-family", "arial")
        .style("font-size", 15);
}


async function build_password_pie() {
    document.write('        <div class="top-passwords-pie"><h4>Top Passwords</h4>\n' +
        '<svg id="top-passwords-svg" width="275" height="275"></svg></div>');

    var svg = d3.select("#top-passwords-svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = width / 2;

    // Step 1
    var data = await apiCall("/api/get-pie-data?type=password");

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Step 4
    var ordScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

    // Step 5
    var pie = d3.pie().value(function (d) {
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
        .attr("fill", function (d) {
            return ordScale(d.data.name);
        });

    // Step 7
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) {
            return d.data.name;
        })
        .style("font-family", "arial")
        .style("font-size", 15);
}

async function build_vert_1() {
    let vert_data = await apiCall("/api/get-vert-data?type=geo");
    let top_vert_1 = document.getElementById("vert-1-table")
    for (let key in vert_data) {
        var row = top_vert_1.insertRow(-1);
        var c1 = row.insertCell(0);
        var c2 = row.insertCell(1);
        c1.innerText = key;
        c2.innerText = vert_data[key];
    }
}

async function build_vert_2()
{
    let vert_data = await apiCall("/api/get-vert-data?type=ports");
    let top_vert_2 = document.getElementById("vert-2-table")
    for(let key in vert_data)
    {
        var row = top_vert_2.insertRow(-1);
        var c1 = row.insertCell(0);
        var c2 = row.insertCell(1);
        c1.innerText = key;
        c2.innerText = vert_data[key];
    }
}

async function build_vert_3() {
    let vert_data = await apiCall("/api/get-vert-data?type=services");
    let top_vert_3 = document.getElementById("vert-3-table")
    for (let key in vert_data) {
        var row = top_vert_3.insertRow(-1);
        var c1 = row.insertCell(0);
        var c2 = row.insertCell(1);
        c1.innerText = key;
        c2.innerText = vert_data[key];
    }
}

async function build_vert_4() {
    let vert_data = await apiCall("/api/get-vert-data?type=ip");
    let top_vert_4 = document.getElementById("vert-4-table")
    for (let key in vert_data) {
        var row = top_vert_4.insertRow(-1);
        var c1 = row.insertCell(0);
        var c2 = row.insertCell(1);
        c1.innerText = key;
        c2.innerText = vert_data[key];
    }
}


async function apiCall(url) {
    const response = await fetch(url);
    return response.json();
}