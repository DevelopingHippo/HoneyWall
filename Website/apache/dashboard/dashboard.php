<?php
    require_once "../php/web_functions.php";
    loginCheck();
?>
<!DOCTYPE html>
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
<?php
printHeader();
?>
<body>
<section>
    <div class="stats">
        <div class="control-panel">
            <h1>Control Panel</h1>
        </div>
        <script>

        </script>

        <script>
            build_bar_chart();
        </script>
        <script>
            build_geo_pie();
            build_port_pie();
            build_username_pie();
            build_password_pie();
        </script>
        <script>build_map()</script>
        <script>
            build_geo_vert()
            build_ports_vert()
            build_services_vert()
            build_protocols_vert()
        </script>
    </div>
</section>
</body>
<?php
printFooter();
?>

</html>