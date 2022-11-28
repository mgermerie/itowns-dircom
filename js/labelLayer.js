function createFeature(coordinates, viewCRS) {
	// Create a new featureCollection
	const collection = new itowns.FeatureCollection({
		crs: viewCRS,
	});

	// Create new feature
	const feature = collection.requestFeatureByType(itowns.FEATURE_TYPES.POINT);

	// add geometry to feature
	const geometry = feature.bindNewGeometry();
	geometry.startSubGeometry(1, feature);
	geometry.pushCoordinates(coordinates, feature);
	geometry.properties.position = coordinates;

	geometry.updateExtent();
	feature.updateExtent(geometry);
	collection.updateExtent(feature.extent);

	return collection;
}


function createLabelLayer(coordinates, viewCRS, domElement) {
	return new itowns.LabelLayer('label-mayotte', {
		source: new itowns.FileSource({ features: createFeature(coordinates, viewCRS) }),
		domElement: domElement,
		style: new itowns.Style({ text: { anchor: [-0.35, -1] } }),
		zoom: { min: 4 },
	});
}

