function displayContextLayers(view) {
	// ---------- DISPLAY ORTHO-IMAGES : ----------

	// Add one imagery layer to the scene. This layer's properties are defined in a json file, but it could be
	// defined as a plain js object. See `Layer` documentation for more info.
	itowns.Fetcher.json('./layers/Ortho.json').then(function _(config) {
		config.source = new itowns.WMTSSource(config.source);
		view.addLayer(
			new itowns.ColorLayer('Ortho', config),
		);
	});



	// ---------- DISPLAY A DIGITAL ELEVATION MODEL : ----------

	// Add two elevation layers, each with a different level of detail. Here again, each layer's properties are
	// defined in a json file.
	function addElevationLayerFromConfig(config) {
		config.source = new itowns.WMTSSource(config.source);
		view.addLayer(
			new itowns.ElevationLayer(config.id, config),
		);
	}
	itowns.Fetcher.json('./layers/WORLD_DTM.json').then(addElevationLayerFromConfig);
	itowns.Fetcher.json('./layers/IGN_MNT_HIGHRES.json').then(addElevationLayerFromConfig);
}

