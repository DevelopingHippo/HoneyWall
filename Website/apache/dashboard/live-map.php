<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Live Map</title>
    <style type="text/css">
    html {
    overflow: auto;
}

    html,
    body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    border: none;
}

    iframe {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    display: block;
    border: none;
    overflow: hidden;
}
  </style>
</head>
    <body>
        <iframe id="raven-iframe" src="./raven/raven.html" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>
        <script type="text/javascript">
            let base_url = window.location.host;
            base_url = "wss://" + base_url + "/raven";
            document.getElementById('raven-iframe').addEventListener("load", function() {
            let raven_options = {
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
                'websocket':{'server':base_url,
                    'request_timeout':3000},
                'verbose': false
            };
            window['raven'] = document.getElementById('raven-iframe').contentWindow.raven;
            window['raven'].init_all(raven_options);
            window['raven'].init_world();
            window['raven'].fetch_data_from_server();
            });
        </script>
    </body>
</html>