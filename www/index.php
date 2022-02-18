<?php
$time = time();

print <<<EOF
<!doctype html>
<html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="index.js?version$time"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.5/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.5/firebase-auth-compat.js"></script>

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

h1 {
	text-align: center;
}

h2 {
	text-align: center;
}

@keyframes bgcolor {
    0% {
        background-color: #ffcce6
    }

    50% {
        background-color: #ecccff
    }


    100% {
        background-color: #ccecff
    }
}

body {
    -webkit-animation: bgcolor 20s infinite;
    animation: bgcolor 10s infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
}

</style>
<body>
<h1>Big Canvas</h1>
<h2>Click on an empty cell to show your creativity!</h2>
<div id=mycanvasWrapper>
<canvas id=mycanvas></canvas>
</div>
</body>
</html>
EOF;
?>
