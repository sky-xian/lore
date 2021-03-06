(function() {
    let lore = Lore.init('lore', {
        clearColor: '#222222'
    });
    
    let fileReader = new Lore.CsvFileReader('input-upload', {
        cols: [0, 1, 2, 3],
        types: ['Uint16Array', 'Uint16Array', 'Uint16Array', 'Float32Array']
    });
    
    let pointHelper = null;
    let octreeHelper = null;
    let original_data = null;

    fileReader.addEventListener('loaded', function(data) {
        original_data = data;
        pointHelper = new Lore.PointHelper(lore, 'Seppli', 'simpleSphere');
        pointHelper.setPositionsXYZHSS(data['x'], data['y'], data['z'], data['c'], 1.0, 1.0)
        pointHelper.setPointScale(1.0);
        pointHelper.setFogDistance(600, 900);
        pointHelper.addFilter('hueRange', new Lore.InRangeFilter('color', 0, 0.22, 0.25));
        
        lore.controls.setLookAt(pointHelper.getCenter());
        lore.controls.setRadius(pointHelper.getMaxRadius());

        octreeHelper = new Lore.OctreeHelper(lore, 'OctreeGeometry', 'tree', pointHelper, {
            visualize: false
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 48) {
            let filter = pointHelper.getFilter('hueRange');
            filter.reset();
        } else if (e.keyCode === 49) {
            let filter = pointHelper.getFilter('hueRange');
            filter.setMin(0.0);
            filter.setMax(0.05);
            filter.filter();
        } else if (e.keyCode == 50) {
            let filter = pointHelper.getFilter('hueRange');
            filter.setMin(0.1);
            filter.setMax(0.15);
            filter.filter();
        } else if (e.keyCode == 51) {
            let filter = pointHelper.getFilter('hueRange');
            filter.setMin(0.2);
            filter.setMax(0.25);
            filter.filter();
        } else if (e.keyCode == 52) {
            let filter = pointHelper.getFilter('hueRange');
            filter.setMin(0.4);
            filter.setMax(0.45);
            filter.filter();
        } else if (e.keyCode == 53) {
            let filter = pointHelper.getFilter('hueRange');
            filter.setMin(0.6);
            filter.setMax(0.65);
            filter.filter();
        } else if (e.keyCode == 54) {
            let filter = pointHelper.getFilter('hueRange');
            filter.setMin(0.8);
            filter.setMax(0.85);
            filter.filter();
        } else if (e.keyCode == 55) {
            
        } else if (e.keyCode == 56) {
            
        } else if (e.keyCode == 57) {
            
        } else if (e.keyCode == 58) {
            
        } else if (e.keyCode == 59) {
            
        }
    });
})();