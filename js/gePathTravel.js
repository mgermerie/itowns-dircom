function getPathTravel(initialPlacement) {
	const pathTravel = [initialPlacement];

	const params = new URLSearchParams(window.location.search);
	const path = params.get('path') || '2';
	const quadraticMode = params.get('quadratic') !== null;
	const time = params.get('time') || 10000;

	switch (path) {
		case '1':
			pathTravel.push({
				coord: new itowns.Coordinates('EPSG:4326', 45.1345, -12.8367),
				range: 10000000,
				time: time,
				easing: !quadraticMode && itowns.CameraUtils.Easing.Quadratic.In,
			});
			pathTravel.push({
				range: 220000,
				heading: -170,
				tilt: 20,
				time: time,
				easing: !quadraticMode && itowns.CameraUtils.Easing.Linear.None,
			});
			pathTravel.push({
				range: 110000,
				heading: -340,
				time: time,
				easing: !quadraticMode && itowns.CameraUtils.Easing.Linear.None,
			});
			break;
		case '2':
			pathTravel.push({
				coord: new itowns.Coordinates('EPSG:4326', 45.1345, -12.8367),
				range: 10000000,
				time: time,
				easing: !quadraticMode && itowns.CameraUtils.Easing.Quadratic.In,
			});
			pathTravel.push({
				range: 110000,
				tilt: 20,
				time: time,
				easing: !quadraticMode && itowns.CameraUtils.Easing.Linear.None,
			});
			pathTravel.push({
				heading: 170,
				time: time,
				easing: quadraticMode ? 
					itowns.CameraUtils.Easing.Quadratic.In : itowns.CameraUtils.Easing.Linear.None,
			});
			pathTravel.push({
				heading: 340,
				time: time,
				easing: quadraticMode ? 
					itowns.CameraUtils.Easing.Quadratic.Out : itowns.CameraUtils.Easing.Linear.None,
			});
			break;
		case '3':
			pathTravel.push({
				coord: new itowns.Coordinates('EPSG:4326', 45.1345, -12.8367),
				range: 110000,
				tilt: 70,
				time: time,
			});
			break;
		default:
			break;
	};

	return pathTravel;
}

