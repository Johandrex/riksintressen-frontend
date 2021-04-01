main();

/**
 * Starta applikationen
 */
function main() {
  alert("Hello");
   setup_map();
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
      center: ol.proj.fromLonLat([18.2735696, 57.6271917]),
      zoom: 12
    })
  });
};
