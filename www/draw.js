$(document).ready(function () {
	let CANVAS = $("#mycanvas");
	let CTX = CANVAS.get(0).getContext("2d");
	let DIMENSION = 25;
	let WIDTH = CANVAS.width();
	let HEIGHT = CANVAS.height();
	let PIXELSIZE = WIDTH / DIMENSION;
	let COLOR = '#222244';
	let ENABLED = true;

	CTX.strokeStyle = 'rgba(0,0,0,0.1)';
	for (let i =0; i < DIMENSION; ++i) {
		x = Math.floor(i * WIDTH / DIMENSION);
		CTX.beginPath();
		CTX.moveTo(x, 0);
		CTX.lineTo(x, HEIGHT);
		CTX.stroke();

		y = Math.floor(i * HEIGHT / DIMENSION);
		CTX.beginPath();
		CTX.moveTo(0, y);
		CTX.lineTo(WIDTH, y);
		CTX.stroke();
	}

        CANVAS.on('mousemove touchmove touchstart mousedown', mouseFill);
	function mouseFill(e) {
		if (!ENABLED) return;
		let offsetX = e.offsetX;
		let offsetY = e.offsetY;
		
		if (e.which != 1) return;
		pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
		fillPixel(pixel);
	}

	function fillPixel(pixel){
		CTX.fillStyle = COLOR;
		CTX.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
	}

// Simple example, see optional options for more configuration.
const PICKR = Pickr.create({
    el: '#picker',
    theme: 'classic', // or 'monolith', or 'nano'
    comparison: false,
    components: {
	    opacity: false,
	    hue: true,
	    palette: true,
	    interaction: {
		    input: true,
	    }
    }
});
	PICKR.on('init', function () {
		PICKR.setColor(COLOR);
	});
	PICKR.on('show', function () {
		ENABLED = false;
	});
	PICKR.on('hide', function () {
		setTimeout(function () {
			ENABLED = true;
		}, 300);
	});
	PICKR.on('change', function () {
		COLOR = PICKR.getColor().toHEXA().toString();
	});
});
