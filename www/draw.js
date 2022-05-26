function locationCoords() {
    let x = null;
    let y = null;

    urlStr = window.location.href;
    let params = urlStr.split('?')[1];
    let queryString = new URLSearchParams(params);

    for (let pair of queryString.entries()) {
        let key = pair[0];
        let val = pair[1];
        if (key === 'x')
            x = val;
        if (key === 'y')
            y = val;
    }

    return [x, y];
}

$(document).ready(function () {
	let CANVAS = $("#mycanvas");
	let CTX = CANVAS.get(0).getContext("2d");
	let DIMENSION = 25;
	let WIDTH = CANVAS.width();
	let HEIGHT = CANVAS.height();
	let PIXELSIZE = WIDTH / DIMENSION;
	let COLOR = '#000000';
	let ENABLED = true;
	let FILLED = {};
        
	// Canvas
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
        
	// Fill pixel by the mousemove
        CANVAS.on('mousemove touchmove touchstart mousedown', mouseFill);
	function mouseFill(e) {
		if (!ENABLED) return;
		let offsetX = e.offsetX;
		let offsetY = e.offsetY;

	// Fill only when the mouse is pressed down	
		if (e.which != 1) return;
		pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
		fillPixel(pixel);
	}

	function fillPixel(pixel, color=COLOR){
		let key = pixel[0] + ',' + pixel[1];
                FILLED[key] = color;

		CTX.fillStyle = color;
		CTX.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
	}

// Color picker
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
	
        // Save data
	window.save = function(x, y){
		var data = {};
		data['x'] = x;
		data['y'] = y;
		data['data'] = FILLED;

		//Send data to php script
		$.post('draw.php?submit=1', data, function(rsp) {
			$('body').append(rsp);
		});
	}
        //TODO modify code to populate draw canvas instead index canvas
        // Firebase credentials
	const firebaseConfig = {
		apiKey: "AIzaSyBJNeT_Z1GExU6LOMob2GfEKgQLeZIfZa4",
		authDomain: "bigcanvas-e50b1.firebaseapp.com",
 		projectId: "bigcanvas-e50b1",
 		storageBucket: "bigcanvas-e50b1.appspot.com",
 		messagingSenderId: "714000188961",
 		appId: "1:714000188961:web:79920d3d7c6483af644560"
 	};

 	// Initialize Firebase
 	const firebaseApp = firebase.initializeApp(firebaseConfig);
 	const db = firebaseApp.firestore();
 	let bigCoords = locationCoords();
 	db.collection('app').doc('grid').onSnapshot(function(doc) {
		// Read in the data
 		let data = doc.data();
			
		//Iterate over the big canvas coordinates
 		for (let key in data) {
 			let coords = key.split(",");
			if (bigCoords[0] != coords[0] || bigCoords[1] != coords[1]){
				continue; //next continue p
			}
			let json = data[key];
 			let pixelData = JSON.parse(json);

			//Iterate over each pixel color
 			for (let subkey in pixelData) {
 				let subcoord = subkey.split(",");
 				let color = pixelData[subkey];
 				fillPixel(subcoord, color);
 			}
 		}

 	});

});
