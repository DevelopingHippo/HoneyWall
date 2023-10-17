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
    <script src="../js/charts/chart.min.js"></script>
    <script src="../js/charts/chart.umd.js"></script>
    <!-- Map & Bar Graph Dependencies -->
    <script src="../js/jvectormap/jquery-3.7.0.js"></script>
    <link rel="stylesheet" href="../js/jvectormap/jquery-jvectormap-2.0.5.css" type="text/css" media="screen"/>
    <script src="../js/jvectormap/jquery-jvectormap-2.0.5.min.js"></script>
    <script src="../js/jvectormap/jvectormap-world-mill.js"></script>
    <script src="../js/d3.v7.js"></script>

    <!-- Internal Dependencies -->
    <link rel="stylesheet" href="dashboard.css" type="text/css">
    <link rel="stylesheet" href="../css/site-global.css" type="text/css">
    <script src="build_stats.js"></script>
</head>
<?php
printHeader();
?>
<?php
printPreloader();
?>
<section class="graphs-section">
    <div class="stats">
        <div class="control-panel">
            <h1>Control Panel</h1>
                <div class="control-panel-wrapper">
                    <table>
                        <tr><td><label for="pie-chart-1">Pie Chart 1</label></td>
                            <td><select name="pie-chart" id="pie-chart-1">
                            <option value="username" selected>Usernames</option>
                            <option value="password">Passwords</option>
                            <option value="service">Services</option>
                            <option value="port">Ports</option>
                            <option value="src_ip">Source IPs</option>
                            <option value="dst_port">Dest. Port</option>
                            <option value="location">Locations</option>
                        </select></td></tr>
                        <tr><td><label for="pie-chart-2">Pie Chart 2</label></td>
                            <td><select name="pie-chart" id="pie-chart-2">
                            <option value="username">Usernames</option>
                            <option value="password" selected>Passwords</option>
                            <option value="service">Services</option>
                            <option value="port">Ports</option>
                            <option value="src_ip">Source IPs</option>
                            <option value="dst_port">Dest. Port</option>
                            <option value="location">Locations</option>
                        </select></td></tr>
                        <tr><td><label for="pie-chart-3">Pie Chart 3</label></td>
                            <td><select name="pie-chart" id="pie-chart-3">
                            <option value="username">Usernames</option>
                            <option value="password">Passwords</option>
                            <option value="service">Services</option>
                            <option value="port">Ports</option>
                            <option value="src_ip" selected>Source IPs</option>
                            <option value="dst_port">Dest. Port</option>
                            <option value="location">Locations</option>
                        </select></td></tr>
                        <tr><td><label for="pie-chart-4">Pie Chart 4</label></td>
                            <td><select name="pie-chart" id="pie-chart-4">
                            <option value="username" selected>Usernames</option>
                            <option value="password">Passwords</option>
                            <option value="service">Services</option>
                            <option value="port">Ports</option>
                            <option value="src_ip">Source IPs</option>
                            <option value="dst_port">Dest. Port</option>
                            <option value="location" selected>Locations</option>
                        </select></td></tr>
                    </table>
                    <table>
                        <tr><td><label for="vert-1">Table 1</label></td>
                            <td><select name="vert-chart" id="vert-1">
                                <option value="username" selected>Usernames</option>
                                <option value="password">Passwords</option>
                                <option value="service">Services</option>
                                <option value="port">Ports</option>
                                <option value="src_ip">Source IPs</option>
                                <option value="dst_port">Dest. Port</option>
                                <option value="location">Locations</option>
                            </select></td></tr>
                        <tr><td><label for="vert-2">Table 2</label></td>
                                <td><select name="vert-chart" id="vert-2">
                                <option value="username">Usernames</option>
                                <option value="password" selected>Passwords</option>
                                <option value="service">Services</option>
                                <option value="port">Ports</option>
                                <option value="src_ip">Src. IPs</option>
                                <option value="dst_port">Source Port</option>
                                <option value="location">Locations</option>
                        </select></td></tr>
                        <tr><td><label for="vert-3">Table 3</label></td>
                                <td><select name="vert-chart" id="vert-3">
                                <option value="username">Usernames</option>
                                <option value="password">Passwords</option>
                                <option value="service">Services</option>
                                <option value="port">Ports</option>
                                <option value="src_ip" selected>Src. IPs</option>
                                <option value="dst_port">Source Port</option>
                                <option value="location">Locations</option>
                            </select></td></tr>
                        <tr><td><label for="vert-4">Table 4</label></td>
                                <td><select name="vert-chart" id="vert-4">
                                <option value="username" selected>Usernames</option>
                                <option value="password">Passwords</option>
                                <option value="service">Services</option>
                                <option value="port">Ports</option>
                                <option value="src_ip">Source IPs</option>
                                <option value="dst_port">Dest. Port</option>
                                <option value="location" selected>Locations</option>
                            </select></td></tr>
                    </table>
                </div>
            <button class="apply-button" onclick="storeSelection()">Apply</button>
        </div>
        <div class="bar-chart-wrapper">
            <canvas class="bar-chart-canvas" id="bar-chart"></canvas>
        </div>
        <div class="top-vert-1">
            <h6 class="vert-h6" id="vert-label-1"></h6>
            <div class="top-vert-wrapper">
            <table id="vert-table-1"></table>
            </div>
        </div>
        <div class="top-vert-2">
            <h6 class="vert-h6" id="vert-label-2"></h6>
            <div class="top-vert-wrapper">
            <table id="vert-table-2"></table>
            </div>
        </div>
        <div class="top-vert-3">
            <h6 class="vert-h6" id="vert-label-3"></h6>
            <div class="top-vert-wrapper">
            <table id="vert-table-3"></table>
            </div>
        </div>
        <div class="top-vert-4">
            <h6 class="vert-h6" id="vert-label-4"></h6>
            <div class="top-vert-wrapper">
            <table id="vert-table-4"></table>
            </div>
        </div>
        <div class="top-pie-1"><h4 id="pie-label-1"></h4>
            <canvas class="pie-chart-canvas" id="chart-pie-1"></canvas>
        </div>
        <div class="top-pie-2"><h4 id="pie-label-2"></h4>
            <canvas class="pie-chart-canvas" id="chart-pie-2"></canvas>
        </div>
        <div class="top-pie-3"><h4 id="pie-label-3"></h4>
            <canvas class="pie-chart-canvas" id="chart-pie-3"></canvas>
        </div>
        <div class="top-pie-4"><h4 id="pie-label-4"></h4>
            <canvas class="pie-chart-canvas" id="chart-pie-4"></canvas>
        </div>
        <div class="live-map">
            <div id="world-map" style="width: 750px; height: 325px;margin: auto;padding: 10px"></div>
        </div>
        <div id="latest-logs-container"></div>
        <script>
            build_bar_chart();
            build_map();
            build_pie(getCookie('pie-chart-1-selection'), 1);
            build_pie(getCookie('pie-chart-2-selection'), 2)
            build_pie(getCookie('pie-chart-3-selection'), 3);
            build_pie(getCookie('pie-chart-4-selection'), 4);
            build_vert(getCookie("vert-1-selection"), 1);
            build_vert(getCookie("vert-2-selection"), 2);
            build_vert(getCookie("vert-3-selection"), 3);
            build_vert(getCookie("vert-4-selection"), 4);
            build_latest_logs();
        </script>
    </div>
</section>
<?php
printFooter();
?>
</body>
</html>