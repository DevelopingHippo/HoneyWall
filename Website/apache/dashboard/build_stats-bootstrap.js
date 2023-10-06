async function build_bar_chart() {
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


async function build_pie(type, position){

    // Step 1: Gather Data
    let position_tag = "#chart-pie-" + position;
    let data = await apiCall("/api/get-pie-data?type=" + type);

    const label_array = Object.keys(data);
    const data_array = Object.values(data);



    $(document).ready(function() {
        var ctx = position_tag;
        var myLineChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: label_array,
                datasets: [{
                    data: data_array,
                    backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)", "rgba(200, 50, 255, 0.5)", "rgba(0, 100, 255, 0.5)", "rgba(0, 255, 255, 0.5)"]
                }]
            }
        });
    });



    let pie_label = document.getElementById('pie-label-' + position);
    let pie_label_text = "";
    // Replace the text with your desired content
    switch (type) {
        case "location":
            pie_label_text = "Top Geolocations";
            break;
        case "dst_port":
            pie_label_text = "Top Port";
            break;
        case "src_ip":
            pie_label_text = "Top IP";
            break;
        case "username":
            pie_label_text = "Top Username";
            break;
        case "password":
            pie_label_text = "Top Password";
            break;
        case "service":
            pie_label_text = "Top Services";
            break;
    }
    pie_label.textContent = pie_label_text;
}

async function build_vert(type, position) {
    let vert_data = await apiCall("/api/get-vert-data?type=" + type);
    let top_vert = document.getElementById("vert-table-" + position)
    for (let key in vert_data) {
        var row = top_vert.insertRow(-1);
        var c1 = row.insertCell(0);
        var c2 = row.insertCell(1);
        c1.innerText = key;
        c2.innerText = vert_data[key];
    }

    let vert_label = document.getElementById('vert-label-' + position);
    let vert_label_text = "";
    // Replace the text with your desired content
    switch (type) {
        case "location":
            vert_label_text = "Top Geolocations";
            break;
        case "dst_port":
            vert_label_text = "Top Port";
            break;
        case "src_ip":
            vert_label_text = "Top IP";
            break;
        case "username":
            vert_label_text = "Top Username";
            break;
        case "password":
            vert_label_text = "Top Password";
            break;
        case "service":
            vert_label_text = "Top Services";
            break;
    }
    vert_label.textContent = vert_label_text;
}


async function apiCall(url) {
    const response = await fetch(url);
    return response.json();
}