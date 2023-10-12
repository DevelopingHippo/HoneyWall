<!DOCTYPE html>
<?php
require_once "../../php/web_functions.php";
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

    <!-- Internal Dependencies -->
    <link rel="stylesheet" href="dashboard.css" type="text/css">
    <link rel="stylesheet" href="../../css/site-global.css" type="text/css">
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
</body>
</html>