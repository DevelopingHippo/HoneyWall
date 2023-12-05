<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Raven Test</title>
    <link rel="stylesheet" href="../css/site-global.css" type="text/css">
    <link rel="stylesheet" href="raven-test.css" type="text/css">
</head>

 <body>
<?php
require('../php/web_functions.php');
printHeader();
?>
<div class="container">
<iframe id="raven-iframe" src="./raven/raven.html" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>
    <script type="text/javascript">
        document.getElementById('raven-iframe').addEventListener("load", function() {
            var raven_options = {
            'world_type': null,
            'selected_countries': [],
            'remove_countries': ['aq'],
            'height': window.innerHeight,
            'width': window.innerWidth,
            'backup_background_color': '#212222',
            'orginal_country_color': '#737373',
            'clicked_country_color': '#6c4242',
            'selected_country_color': '#ff726f',
            'attack_output': true,
            'global_timeout': 2000,
            'global_stats_limit': 10,
            'db_length': 1000,
            'location': 'scripts',
            'panels': ['multi-output', 'single-output','tooltip', 'random', 'insert','taskbar'],
            'disable': [],
            'verbose': true
            }
            window['raven'] = document.getElementById('raven-iframe').contentWindow.raven
            window['raven'].init_all(raven_options)
            window['raven'].init_world()
        });
        raven.add_to_data_to_table({'from':'seattle,wa,us','to':'delhi,in'},{'line':{'from':null,'to':null}},2000,['line','multi-output','single-output'])
    </script>
  </div>
  </body>
 </html>









