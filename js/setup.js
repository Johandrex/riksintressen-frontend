main();

/**
 * Starta applikationen
 */
function main() {
   var map = setup_map();
};

function setup_map() {
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([15.04047, 56.21664]),
      zoom: 10
    })
  });

  const layer = new ol.layer.VectorImage ({
    title: 'Layer',
    visible: true,
    source: new ol.source.Vector({
       url: '/data/test.geojson',
       format: new ol.format.GeoJSON()
    })
  });
  map.addLayer(layer);

  map.on('click', function(e){
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
      console.log(feature);
    })
  })
};