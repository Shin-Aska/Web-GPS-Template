## Web-GPS-Template

Planning to create a hybrid app? Plan to use a GPS in it? Then this template is for you!

![alt tag](http://i.imgur.com/rkboKa6.png)

#
# Pages to edit:
	
* marker.js -> holds the markers inside the map
* nav-dialogs.js -> holds the methods used by the drawer template (side bar)
* info.js -> holds the methods that the events used when user clicks or taps the marker inside the map
* navigation.js -> controls the dialog box that is used by the app
* main.css -> layout of this page
* templates.css -> some design choices (background color) that both index.html and this page shares

The webinterface folder is created automatically by qgis2web plug-in of qgis. If you create a new map and use the 
qgis2web plugin, this template is very compatible. Although I did some changes inside the qgis2web.js in order to cater
manual mode (setting the gps coordinate manually) so keep that in mind when changing webinterface content.

This template doesnt search or compare coordinate locations, but you can make your own one. Just use this Javascript 
methods to get your current location.

##

# Notable JavaScript methods and variables to use:

* geolocation.getPosition() -> This method gives the current GPS location of the user
* externalGeoLocate() -> Updates the current GPS location of the user
* manualcoords -> Your manually set GPS coordinates. Only call this variable if manualmode is set to true

I think OpenLayers (The one that made this template possible) has its own method of comparing coordinates, you can use
that too!

A preview of this template: [click here to redirect](https://htmlpreview.github.io/?https://github.com/Shin-Aska/Web-GPS-Template/blob/master/search.html#)

##
# Sample codes of comparing and searching geolocation

```javascript
  if (typeof(geolocation.getPosition()) === "undefined" && manualmode == false) {
    return false;
  }

  if (manualmode) {
    coords = manualcoords;
  }
  else {
    coords = geolocation.getPosition();
  }
  
  // Assume that we have a list of coordinates (objects that contain
  // x and y values). We compare each one of them using the classic
  // formula of [distance between two points]
  // (http://www.mathwarehouse.com/algebra/distance_formula/index.php) 
  // then push it to an array called selected
  for (var i = 0; i < list.length; i++) {
    var icon = list[i];
    var dist = Math.sqrt(Math.pow((coords[0] - icon.x), 2) + Math.pow((coords[1] - icon.y), 2));
    icon.dist = dist;
    icon.action;
    if (dist <= rLimit) {
      selected.push(icon);
    }
  }
```
