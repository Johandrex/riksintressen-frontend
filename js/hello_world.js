main();

/**
 * Starta applikationen
 * Wibke commits
 * Test
 */
function main() {
   hello_world();
   setup_map();
};

function hello_world() {
  alert("Hello J+J+W!");
};

function setup_map() {
  var mymap = L.map('mapid').setView([51.505, -0.09], 13);
};
