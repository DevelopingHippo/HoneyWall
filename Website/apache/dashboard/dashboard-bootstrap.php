<?php
session_start();
?>

<!DOCTYPE html>
<?php
require_once "../php/web_functions.php";
loginCheck();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>

    <!-- Pie Graph Dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" type="text/css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.4/Chart.bundle.min.js'></script>

    <!-- Map & Bar Graph Dependencies -->
    <script src="../js/jvectormap/jquery-3.7.0.js"></script>
    <link rel="stylesheet" href="../js/jvectormap/jquery-jvectormap-2.0.5.css" type="text/css" media="screen"/>
    <script src="../js/jvectormap/jquery-jvectormap-2.0.5.min.js"></script>
    <script src="../js/jvectormap/jvectormap-world-mill.js"></script>
    <script src="../js/d3.v7.js"></script>

    <!-- Internal Dependencies -->
    <link rel="stylesheet" href="dashboard.css" type="text/css">
    <link rel="stylesheet" href="../css/site-global.css" type="text/css">
    <script src="build_stats-bootstrap.js"></script>

</head>
<body>
<?php
printHeader();
?>
<?php
printPreloader();
?>
    <section>
    <div class="stats">
        <div class="control-panel">
            <h1>Control Panel</h1>
        </div>
        <div class="bar-chart">
            <svg id="bar-chart" width="600" height="500"></svg>
        </div>
        <div class="top-vert-1">
            <h6 class="vert-h6" id="vert-label-1">Vert Label 1</h6>
            <table id="vert-table-1"></table>
        </div>
        <div class="top-vert-2">
            <h6 class="vert-h6" id="vert-label-2">Vert Label 2</h6>
           <table id="vert-table-2"></table>
        </div>
        <div class="top-vert-3">
            <h6 class="vert-h6" id="vert-label-3">Vert Label 3</h6>
            <table id="vert-table-3"></table>
        </div>
        <div class="top-vert-4">
            <h6 class="vert-h6" id="vert-label-4">Vert Label 4</h6>
            <table id="vert-table-4"></table>
        </div>
        <div class="top-pie-1"><h4 id="pie-label-1">Label 1</h4>
            <canvas id="chart-pie-1" width="300" height="200" class="chartjs-render-monitor" style="display: block; width: 300px; height: 200px;"></canvas>
        </div>
        <div class="top-pie-2"><h4 id="pie-label-2">Label 2</h4>
            <canvas id="chart-pie-2" width="300" height="200" class="chartjs-render-monitor" style="display: block; width: 300px; height: 200px;"></canvas>
        </div>
        <div class="top-pie-3"><h4 id="pie-label-3">Label 3</h4>
            <canvas id="chart-pie-3" width="300" height="200" class="chartjs-render-monitor" style="display: block; width: 300px; height: 200px;"></canvas>
        </div>
        <div class="top-pie-4"><h4 id="pie-label-4">Label 4</h4>
            <canvas id="chart-pie-4" width="300" height="200" class="chartjs-render-monitor" style="display: block; width: 300px; height: 200px;"></canvas>
        </div>

        <div class="live-map">
            <div id="world-map" style="width: 750px; height: 325px;margin: auto;padding: 10px"></div>
        </div>

        <script>
            build_bar_chart();
            build_map();
            build_pie("location", 1);
            build_pie("dst_port", 2)
            build_pie("src_ip", 3);
            build_pie("service", 4);
            build_vert("location", 1);
            build_vert("dst_port", 2);
            build_vert("service", 3);
            build_vert("src_ip", 4);
        </script>
    </div>
    </section>
<?php
printFooter();
?>

<script>
    $(document).ready(function() {
        var ctx = $("#chart-line");
        var myLineChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Spring", "Summer", "Fall", "Winter"],
                datasets: [{
                    data: [1200, 1700, 800, 200],
                    backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)", "rgba(200, 50, 255, 0.5)", "rgba(0, 100, 255, 0.5)"]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Weather'
                }
            }
        });
    });
</script>

<canvas id="chart-line" width="300" height="200" class="chartjs-render-monitor" style="display: block; width: 299px; height: 200px;"></canvas>

</body>
</html>