<?php
    require_once "../php/php_functions.php";
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="../css/site-global.css">
    <link rel="stylesheet" href="../js/jvectormap/jquery-jvectormap-2.0.5.css" type="text/css" media="screen"/>
    <script src="../js/js_functions.js"></script>
    <script src="../js/d3.v7.js"></script>
    <script src="../js/jvectormap/jquery-3.7.0.js"></script>
    <script src="../js/jvectormap/jquery-jvectormap-2.0.5.min.js"></script>
    <script src="../js/jvectormap/jvectormap-world-mill.js"></script>
    <script src="packetData.js"></script>
</head>
<?php
printHeader();
?>

<body>
<section>
    <div class="stats">

        <div class="top-geolocation-pie"><h4>Top Geolocations</h4>
            <svg id="geolocation-svg" width="300" height="300"></svg>
            <script>drawPieChart("#geolocation-svg")</script>
        </div>

        <div class="top-ports-pie"><h4>Top Ports</h4>
            <svg id="top-ports-svg" width="300" height="300"></svg>
            <script>drawPieChart("#top-ports-svg")</script></div>

        <div class="top-usernames-pie"><h4>Top Usernames</h4>
            <svg id="top-usernames-svg" width="300" height="300"></svg>
            <script>drawPieChart("#top-usernames-svg")</script></div>

        <div class="top-passwords-pie"><h4>Top Passwords</h4>
            <svg id="top-passwords-svg" width="300" height="300"></svg>
            <script>drawPieChart("#top-passwords-svg")</script></div>

        <div class="live-map">Map
            <div id="world-map" style="width: 600px; height: 400px;margin: auto;border-radius: 20px;"></div>
            <script>
                document.getElementById("world-map").addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                });
            </script>
        <script>
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
        </script>
        </div>

        <div class="top-geolocation-vert">
            <h6 class="vert-h6">Top Geolocations</h6>
            <table>
                <tr><td>US</td><td class="numbers">1000</td></tr>
                <tr><td>RU</td><td class="numbers">969</td></tr>
                <tr><td>CN</td><td class="numbers">420</td></tr>
                <tr><td>CA</td><td class="numbers">323</td></tr>
                <tr><td>UK</td><td class="numbers">199</td></tr>
                <tr><td>MD</td><td class="numbers">10</td></tr>
            </table>
        </div>

        <div class="top-ports-vert">
            <h6 class="vert-h6">Top Ports</h6>
            <table>
                <tr><td>US</td><td class="numbers">1000</td></tr>
                <tr><td>RU</td><td class="numbers">969</td></tr>
                <tr><td>CN</td><td class="numbers">420</td></tr>
                <tr><td>CA</td><td class="numbers">323</td></tr>
                <tr><td>UK</td><td class="numbers">199</td></tr>
                <tr><td>MD</td><td class="numbers">10</td></tr>
            </table>
        </div>

        <div class="top-services-vert">
            <h6 class="vert-h6">Top Services</h6>
            <table>
                <tr><td>US</td><td class="numbers">1000</td></tr>
                <tr><td>RU</td><td class="numbers">969</td></tr>
                <tr><td>CN</td><td class="numbers">420</td></tr>
                <tr><td>CA</td><td class="numbers">323</td></tr>
                <tr><td>UK</td><td class="numbers">199</td></tr>
                <tr><td>MD</td><td class="numbers">10</td></tr>
            </table>
        </div>
        <div class="top-proto-vert">
            <h6 class="vert-h6">Top Protocols</h6>
            <table>
                <tr><td>US</td><td class="numbers">1000</td></tr>
                <tr><td>RU</td><td class="numbers">969</td></tr>
                <tr><td>CN</td><td class="numbers">420</td></tr>
                <tr><td>CA</td><td class="numbers">323</td></tr>
                <tr><td>UK</td><td class="numbers">199</td></tr>
                <tr><td>MD</td><td class="numbers">10</td></tr>
            </table>
        </div>
    </div>
</section>

</body>
<?php
printFooter();
?>

</html>