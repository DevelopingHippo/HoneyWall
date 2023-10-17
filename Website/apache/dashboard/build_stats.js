async function build_bar_chart() {

    let data_api = await apiCall('/api/get-chart-data')

    const label_array = data_api.map(
        function(index){
            return index.date_time;
        });
    const data_array = data_api.map(
        function(index){
            return index.total_connections;
        });

    var chrt = document.getElementById("bar-chart").getContext("2d");
    var chartId = new Chart(chrt, {
        type: 'bar',
        data: {
            labels: label_array,
            datasets: [{
                label: '# of Connections',
                data: data_array,
                backgroundColor: [
                    'rgb(38, 100, 110, 0.2)',
                    'rgb(42, 157, 143, 0.2)',
                    'rgb(233, 196, 106, 0.2)',
                    'rgb(244, 162, 97, 0.2)',
                    'rgb(231, 111, 81, 0.2)'
                ],
                borderColor: [
                    'rgb(38, 100, 110)',
                    'rgb(42, 157, 143)',
                    'rgb(233, 196, 106)',
                    'rgb(244, 162, 97)',
                    'rgb(231, 111, 81)'
                ],
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                labels: {
                    fontColor: '#FFF'
                }
            }
        }
    });
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
    let data_api = await apiCall("/api/get-pie-data?type=" + type);

    const label_array = data_api.map(
        function(index){
            return index.name;
        });
    const data_array = data_api.map(
        function(index){
            return index.share;
        });

    var canvas = document.getElementById("chart-pie-" + position);
    var ctx = canvas.getContext('2d');

    var options = {
        tooltip: {
            enabled: true
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            labels: {
                fontColor: '#FFF'
            }
        }
    };

    var data = {
        labels: label_array,
        datasets: [{
            fill: true,
            backgroundColor: [
                'rgb(38, 70, 83)',
                'rgb(42, 157, 143)',
                'rgb(233, 196, 106)',
                'rgb(244, 162, 97)',
                'rgb(231, 111, 81)'
            ],
            data: data_array,
            hoverOffset: 4
        }]
    };

    const myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });

    let pie_label = document.getElementById('pie-label-' + position);
    let pie_label_text = "";
    // Replace the text with your desired content
    switch (type) {
        case "location":
            pie_label_text = "Top 5 Locations";
            break;
        case "dst_port":
            pie_label_text = "Top 5 Ports";
            break;
        case "src_ip":
            pie_label_text = "Top 5 IPs";
            break;
        case "username":
            pie_label_text = "Top 5 Usernames";
            break;
        case "password":
            pie_label_text = "Top 5 Passwords";
            break;
        case "service":
            pie_label_text = "Top 5 Services";
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
            vert_label_text = "Top 15 Locations";
            break;
        case "dst_port":
            vert_label_text = "Top 15 Ports";
            break;
        case "src_ip":
            vert_label_text = "Top 15 IPs";
            break;
        case "username":
            vert_label_text = "Top 15 Usernames";
            break;
        case "password":
            vert_label_text = "Top 15 Passwords";
            break;
        case "service":
            vert_label_text = "Top 15 Services";
            break;
    }
    vert_label.textContent = vert_label_text;
}

async function build_latest_logs() {
    let latest_data = await apiCall("/api/get-latest-connection");

    let container = document.getElementById("latest-logs-container");
    let table = document.createElement("table");
    table.setAttribute('class','logs-table');

    // Get the keys (column names) of the first object in the JSON data
    let cols = Object.keys(latest_data[0]);

    // Create the header element
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    thead.setAttribute('id','logs-table-thead');
    tr.setAttribute('id','logs-table-tr');


    cols.forEach((item) => {
        let th = document.createElement("th");
        th.innerText = item; // Set the column name as the text of the header cell
        tr.appendChild(th); // Append the header cell to the header row
    });

    thead.appendChild(tr); // Append the header row to the header
    table.append(tr) // Append the header to the table

    // Loop through the JSON data and create table rows
    latest_data.forEach((item) => {
        let tr = document.createElement("tr");
        tr.setAttribute('id','logs-table-tr');
        // Get the values of the current object in the JSON data
        let vals = Object.values(item);

        // Loop through the values and create table cells
        vals.forEach((elem) => {
            let td = document.createElement("td");
            td.innerText = elem; // Set the value as the text of the table cell
            tr.appendChild(td); // Append the table cell to the table row
        });
        table.appendChild(tr); // Append the table row to the table
    });
    container.appendChild(table) // Append the table to the container element
}

function storeSelection() {
    document.cookie = "pie-chart-1-selection=" + document.getElementById('pie-chart-1').value;
    document.cookie = "pie-chart-2-selection=" + document.getElementById('pie-chart-2').value;
    document.cookie = "pie-chart-3-selection=" + document.getElementById('pie-chart-3').value;
    document.cookie = "pie-chart-4-selection=" + document.getElementById('pie-chart-4').value;

    document.cookie = "vert-1-selection=" + document.getElementById('vert-1').value;
    document.cookie = "vert-2-selection=" + document.getElementById('vert-2').value;
    document.cookie = "vert-3-selection=" + document.getElementById('vert-3').value;
    document.cookie = "vert-4-selection=" + document.getElementById('vert-4').value;
    location.reload()
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


async function apiCall(url) {
    const response = await fetch(url);
    return response.json();
}