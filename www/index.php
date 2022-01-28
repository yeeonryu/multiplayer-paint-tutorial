<?php

$time = time();

print <<<EOF
<!doctype html>
<html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="index.js?version$time"></script>

<style>
body {
	background-color: #f0f0f0;
	margin: 16px;
	font-family: Arial, Helevetica, sans-serif;
}

#mycanvas {
	border: 1px #000 solid;
	background-color: #fff;
	cursor:pointer;
}

#mycanvasWrapper {
	position:relative;
}
#selectedBox {
	border: 1px rgba(0, 50, 100, 0.5) solid;
	background-color: rgba(0, 50, 100, 0.25);
	position:absolute;
	pointer-events: none;
}
</style>

<body>
Big Canvas

<div id=mycanvasWrapper>
<canvas id=mycanvas></canvas>
</div>

</body>
</html>

EOF;
?>
