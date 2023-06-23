<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="dashboard.css">
    <script src="../js/js_functions.js"></script>
    <script src="../js/d3.v7.js"></script>
    <link rel="stylesheet" href="../js/jvectormap/jquery-jvectormap-2.0.5.css" type="text/css" media="screen"/>
    <script src="../js/jvectormap/jquery-3.7.0.js"></script>
    <script src="../js/jvectormap/jquery-jvectormap-2.0.5.min.js"></script>
    <script src="../js/jvectormap/jvectormap-world-mill.js"></script>
    <script src="packetData.js"
    <!--<script src="https://d3js.org/d3.v7.min.js"></script>-->
</head>
<h1><b>Dashboard</b></h1>
<body>
<section>
    <div class="stats">

        <div class="top-geolocation-pie">Top Geolocations</div>
        <div class="top-ports-pie">Top Ports</div>
        <div class="top-usernames-pie">Top Usernames</div>
        <div class="top-passwords-pie">Top Passwords</div>

        <div class="live-map">Map
            <div id="world-map" style="width: 600px; height: 400px;margin: auto"></div>
            <!--
            <script>
                const element = document.getElementById("world-map");
                element.addEventListener('contextmenu', event => event.preventDefault())
                $(function(){
                    $('#world-map').vectorMap({map: 'world_mill'});
                });
            </script>
            -->
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

        <div class="top-geolocation-vert">Top Geolocation</div>
        <div class="top-ports-vert">Top Ports</div>
        <div class="top-services-vert">Top Services</div>
        <div class="top-proto-vert">Top Protocols</div>


    </div>
</section>
</body>

</html>