$(document).ready(function () {
	let CANVAS = $("#mycanvas");
	let CTX = CANVAS.get(0).getContext("2d");
	let PIXELSIZE = 2;

	let REPEATSX = 20;
	let REPEATSY = 15;
	let DIMENSION = 25;

	let WIDTH = DIMENSION * REPEATSX * PIXELSIZE;
	let HEIGHT = DIMENSION * REPEATSY * PIXELSIZE;
	let SELECTEDBOX = null;

	CANVAS.attr('width', WIDTH);
	CANVAS.attr('height', HEIGHT);
        
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
 
 	db.collection('app').doc('grid').onSnapshot(function(doc) {
		// Read in the data
 		let data = doc.data();
 		for (let key in data) {
 			let coords = key.split(",");
 			let json = data[key];
 			let pixelData = JSON.parse(json);
 			for (let subkey in pixelData) {
 				let subcoord = subkey.split(",");
 				let color = pixelData[subkey];
 				fillPixel(coords, subcoord, color);
 			}
 		}
 	});

        function fillPixel(coords, subcoord, color) {
                let coordX = parseInt(coords[0]);
                let coordY = parseInt(coords[1]);
                let subcoordX = parseInt(subcoord[0]);
                let subcoordY = parseInt(subcoord[1]);

                CTX.fillStyle = color;
                let x = (coordX * DIMENSION + subcoordX) * PIXELSIZE;
                let y = (coordY * DIMENSION + subcoordY) * PIXELSIZE;
                CTX.fillRect(x, y, PIXELSIZE, PIXELSIZE);
        }
	
	CTX.strokeStyle = 'rgba(0,0,0,0.25';
	for (let i =0 ;i < DIMENSION * REPEATSX; ++i) {
		if (i % DIMENSION != 0) { continue; }
		x = i * PIXELSIZE;
		CTX.beginPath();
		CTX.moveTo(x, 0);
		CTX.lineTo(x, HEIGHT);
		CTX.stroke();

		y = i *PIXELSIZE;
		CTX.beginPath();
		CTX.moveTo(0, y);
		CTX.lineTo(WIDTH, y);
		CTX.stroke();
	}
	CANVAS.click(function(e) {
		selectBox(e);
	});

	// Track mousemove for selecting pixel
	CANVAS.mousemove(function(e){
		let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
		console.log(pixel);
		if(!SELECTEDBOX) {
			SELECTEDBOX = $("<div id=selectedBox></div");
			SELECTEDBOX.css({width: DIMENSION * PIXELSIZE -2, height: DIMENSION * PIXELSIZE -2})
			$("#mycanvasWrapper").prepend(SELECTEDBOX);
		}
		SELECTEDBOX.css({
			left: pixel[0] * PIXELSIZE * DIMENSION + 1,
			top: pixel[1] * PIXELSIZE * DIMENSION
		});
	});
        
	// Open drawing page of selected pixel
	let SELECTED = 0;
	function selectBox(e) {
		if (SELECTED) return;
		SELECTED = 1;

		let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
		window.location = "draw.php?x="+pixel[0]+"&y="+pixel[1];
	}

});
