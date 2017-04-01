// This .js file is meant for adding markers to
// OpenLayers. I kept it seperated  because whenever
// we change engines, we don't need to re-add each
// markers. Awesome right?


var iconEventsList   = [];
var wgs84Sphere= new ol.Sphere(6378137);

var roadIconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'assets/roadwatch-marker.png'
    }),
    text: new ol.style.Text({
        font: '15px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#fff' }),
        stroke: new ol.style.Stroke({
            color: '#044c27', width: 5
        }),
        text: 'Sample Marker'
    })
});

var speedStarStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'assets/speedstar-marker.png'
    }),
    text: new ol.style.Text({
        font: '15px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#fff' }),
        stroke: new ol.style.Stroke({
            color: '#044c27', width: 5
        }),
        text: 'Sample Marker 2'
    })
});

/*
 * This method initMaps() will be called to initialize the markers
 * The geom.Point coordinates are determined from the map.onclick event
 * just below this method. We cannot rely the coordinates from GPS since
 * we are using global gps coordinates that QGIS created for us. Although
 * IDK if there is a way to rechange that to rely on local coordinates
 *
 
  === [ How to add a new marker ] ==
 
  1. Create a new icon style, you can copy paste the roadIconStyle variable above and change the values of
     src (which is the location image of the marker) and text (which is the text of the marker) to their appropriate values
  2. Then add another feature inside the initMaps() method which you can also copypaste the feature variable inside of this method
     As long as that newly created variable is inserted in the vectorSource using the vectorSource.addFeature method!
  3. Then create another event inside the iconEventsList which has the name and function properties 
     (make sure that the name matches the name of the feature text, capitalization matters here!)
  4. Inside the function property, add the appropriate event. In my case, the sampleMarkerEvent() is located in the js/info.js
     script. I provided it for template purposes
*/

initMaps = function() {
	
	// First marker
	
	var feature = new ol.Feature(
        new ol.geom.Point([13983527.690297138, 792050.3018172664])
    );
	feature.setStyle(roadIconStyle);
    vectorSource.addFeature(feature);
    
    // Second marker
    
    var feature2 = new ol.Feature(
        new ol.geom.Point([13983527.690297138, 792550.3018172664])
    );
	feature2.setStyle(speedStarStyle);
    vectorSource.addFeature(feature2);
    
    // You can follow the pattern if u want


    iconEventsList = [
        {
            name: "Sample Marker",
            function: function() {
                sampleMarkerEvent();
            }
        },
        
        {
            name: "Sample Marker 2",
            function: function() {
                anotherSampleMarkerEvent();
            }
        }
        
        // Follow the pattern if u want
    ];
};

initMaps();

/*
 * This is a modification of the default QGIS module. The codes below is meant for adding support for manual locations.
 * I'm not going to explain anything here since there is no need for modification for this one.
 */

var manualselect = false;
var manualcoords = false;
var manualmode   = false;

var manual = function() {
    $( "#closeArea" ).dialog( "close" );
    alert("Please click on the map for a new location. You will be informed if you set it up properly, If ever you made an incorrect highlight. Please go to the settings menu located on the top left corner of the screen");
    manualselect = true;
}

var lastcoords = [0, 0];
var locationFeature = null;

var compareCoords = function(c1, c2) {

    if (c1[0] == c2[0] && c1[1] == c2[1]) {
        return true;
    }

    return false;
}

setInterval(function(){
    
    var currentcoords;
    if (manualmode) {
        currentcoords = manualcoords;
    }
    else {
        currentcoords = geolocation.getPosition();
    }

    if (!compareCoords(currentcoords, lastcoords)) {

        if (locationFeature != null) {
            vectorSource.removeFeature(locationFeature);
        }

        locationFeature = new ol.Feature(
            new ol.geom.Point(currentcoords)
        );
        locationFeature.setStyle(yourLocation);
        vectorSource.addFeature(locationFeature);

        lastcoords = currentcoords;
    }

}, 2000);

map.on('click', function(evt){
    console.log(evt.coordinate);
    if (manualselect) {
        manualselect = false;
        manualcoords = evt.coordinate;
        manualmode   = true;
        alert("I have now set that location as the base location for my search");
    }

    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        for (var i = 0; i < iconEventsList.length; i++) {
            if (feature.getStyle().getText().H == iconEventsList[i].name) {
                iconEventsList[i].function();
                break;
            }
        }
    })
})

