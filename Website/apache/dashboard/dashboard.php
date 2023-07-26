<!DOCTYPE html>
<?php
require_once "../php/web_functions.php";
loginCheck();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="../css/site-global.css">
    <link rel="stylesheet" href="../js/jvectormap/jquery-jvectormap-2.0.5.css" type="text/css" media="screen"/>
    <script src="../js/d3.v7.js"></script>
    <script src="../js/jvectormap/jquery-3.7.0.js"></script>
    <script src="../js/jvectormap/jquery-jvectormap-2.0.5.min.js"></script>
    <script src="../js/jvectormap/jvectormap-world-mill.js"></script>
    <script src="build_stats.js"></script>
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
            <h6 class="vert-h6">Top Geolocations</h6>
            <table id="vert-1-table">
            </table>
        </div>
        <div class="top-vert-2">
            <h6 class="vert-h6">Top Ports</h6>
           <table id="vert-2-table">
           </table>
        </div>
        <div class="top-vert-3">
            <h6 class="vert-h6">Top Services</h6>
            <table id="vert-3-table">
            </table>
        </div>
        <div class="top-vert-4">
            <h6 class="vert-h6">Top IP</h6>
            <table id="vert-4-table">
            </table>
        </div>
        <div class="top-pie-1"><h4 id="pie-label-1">Label 1</h4>
            <svg id="svg-pie-1" width="275" height="275"></svg>
        </div>
        <div class="top-pie-2"><h4 id="pie-label-2">Label 2</h4>
            <svg id="svg-pie-2" width="275" height="275"></svg>
        </div>
        <div class="top-pie-3"><h4 id="pie-label-3">Label 3</h4>
            <svg id="svg-pie-3" width="275" height="275"></svg>
        </div>
        <div class="top-pie-4"><h4 id="pie-label-4">Label 4</h4>
            <svg id="svg-pie-4" width="275" height="275"></svg>
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
            build_pie("services", 4);
            build_vert_1();
            build_vert_2();
            build_vert_3();
            build_vert_4();
        </script>
    </div>
    </section>
<?php
printFooter();
?>
</body>
</html>