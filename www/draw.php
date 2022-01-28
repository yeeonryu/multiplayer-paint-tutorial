<?php
/*
 * DEBUG 1 = show errors when they occur
 * DEBUG 0 = disable error reporting
 */
define('DEBUG', 1);
if (DEBUG) {
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
}

print <<<EOF
<!doctype html>
<html>

<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/classic.min.css"/> <!-- 'classic' theme -->
<script src="draw.js"></script>
<script src="pickr/dist/pickr.min.js"></script>
<div id=picker></div>
<canvas id=mycanvas width=500 height=500 style="margin:8px;border:1px #000 solid"></canvas>

</body>

</html>
EOF;
?>
