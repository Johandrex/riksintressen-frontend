main();

/**
 * Starta applikationen
 */
function main() {
   var map = setup_map();
};

/**
 * Initiera kartan med openlayers biblioteket
 */
function setup_map() {

  // Skapa kartan med position över visby
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([18.3278145, 57.6271917]),
      zoom: 12
    })
  });

  // Hämta json data över geometrier
  const layer = new ol.layer.VectorImage ({
    title: 'Layer',
    visible: true,
    source: new ol.source.Vector({
       url: '/data/test.geojson',
       format: new ol.format.GeoJSON()
    })
  });
  map.addLayer(layer);

  // När användaren trycker på en geometri skrivs det ut i konsolen.
  map.on('click', function(e){
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
      console.log(feature);
    })
  })
};