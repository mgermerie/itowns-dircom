
// ---------- CREATE A GlobeView : ----------

// Define camera initial position
const placement = {
	coord: new itowns.Coordinates('EPSG:4326', 2.351323, 48.856712),
	range: 25000000,
}

// `viewerDiv` will contain iTowns' rendering area (`<canvas>`)
const viewerDiv = document.getElementById('viewerDiv');

// Create a GlobeView
const view = new itowns.GlobeView(viewerDiv, placement);

// Display contextual data
displayContextLayers(view);



// ---------- DISPLAY LABEL ON MAYOTE : ----------

const bubble = document.createElement('div');
bubble.classList.add('bubble');
bubble.textContent = 'Mayotte';

const pointer = document.createElement('div');
pointer.classList.add('pointer');

const labelContainer = document.createElement('div');
labelContainer.appendChild(bubble);
labelContainer.appendChild(pointer);

view.addLayer(
	createLabelLayer(
		new itowns.Coordinates('EPSG:4326', 45.1345, -12.8367),
		view.tileLayer.extent.crs,
		labelContainer,
	),
);




// ---------- ANIMATE CAMERA WHEN PRESSING p KEY : ----------

const travel = getPathTravel(placement);

window.addEventListener('keydown', (event) => {
	if (event.key === 't') {
		itowns.CameraUtils
			.stop(view, view.camera.camera3D);
		itowns.CameraUtils
			.transformCameraToLookAtTarget(view, view.camera.camera3D, placement)
	}
	else if (event.key === 'p') {
		itowns.CameraUtils
			.sequenceAnimationsToLookAtTarget(view, view.camera.camera3D, travel)
			.catch(console.error);
	}
});



// ---------- ANIMATE CAMERA AFTER PAGE LOADING : ----------

view.addEventListener(itowns.GLOBE_VIEW_EVENTS.GLOBE_INITIALIZED, function init() {
	itowns.CameraUtils
		.sequenceAnimationsToLookAtTarget(view, view.camera.camera3D, getPathTravel(placement))
		.catch(console.error);
});
