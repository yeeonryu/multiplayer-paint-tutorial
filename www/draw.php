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

$time = time();
$x = intval($_REQUEST['x']);
$y = intval($_REQUEST['y']);

// Save data
if (isset($_REQUEST['submit'])) {
        //print_r($_REQUEST);
        $data = $_POST['data'];
        $data = json_encode($data);

        $key = "$x,$y";
        $filename = "tmp/$key";
        file_put_contents($filename, $data);
        $ret = null;
        $out = null;
        exec("python3 save.py 2>&1 '$x' '$y'", $out, $ret);
        if ($ret != 0) {
                print_r($out);
                die("Error saving($ret)");
	}

	// Redirect to homepage
        print "<script>window.location='index.php';</script>";

        return;
}

print <<<EOF
<!doctype html>
<html>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/classic.min.css"/> <!-- 'classic' theme -->
<script src="draw.js?version=$time"></script>
<script src="pickr/dist/pickr.min.js"></script>
<div id=picker></div>

<div>
<canvas id=mycanvas width=500 height=500 style="margin:8px;border:1px #000 solid"></canvas>
</div>

<!-- Save the x,y coordinates -->
<input type="submit" value = "Save" onclick="save($x, $y)">

<style>
html, body {
    height: 100%;
}

html {
    display: table;
    margin: auto;
}

body {
    display: table-cell;
    vertical-align: middle;
}


</style>

</body>
</html>
EOF;
?>
