async function build_bar_chart() {

    let data_api = await apiCall('/api/get-chart-data')

    const label_array = data_api.map(
        function(index){
            return index.month;
        });
    const data_array = data_api.map(
        function(index){
            return index.num_connections;
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
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y:{
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: true
        },
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
        maintainAspectRatio: true
    };

    var data = {
        labels: label_array,
        datasets: [{
            fill: true,
            backgroundColor: [
                'rgb(255, 107, 107)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 255, 86)',
                'rgb(199, 244, 100)'
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
            pie_label_text = "Top 5 Port";
            break;
        case "src_ip":
            pie_label_text = "Top 5 IPs";
            break;
        case "username":
            pie_label_text = "Top 5 Username";
            break;
        case "password":
            pie_label_text = "Top 5 Password";
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
            vert_label_text = "Top 8 Locations";
            break;
        case "dst_port":
            vert_label_text = "Top 8 Port";
            break;
        case "src_ip":
            vert_label_text = "Top 8 IP";
            break;
        case "username":
            vert_label_text = "Top 8 Username";
            break;
        case "password":
            vert_label_text = "Top 8 Password";
            break;
        case "service":
            vert_label_text = "Top 8 Services";
            break;
    }
    vert_label.textContent = vert_label_text;
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