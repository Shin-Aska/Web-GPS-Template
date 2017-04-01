var sampleMarkerEvent = function() {
	var cont= "<center>";
	cont += "<h2>Sample Marker</h2>";
	cont += "<img src='assets/roadwatch-img.png' />";
	cont += "<h3>This only appears if the user clicks on the Sample Marker</h3></center>";	
	$( "#closeArea" ).dialog( "open" );
 	$( '#closeArea' ).dialog( 'option', 'title', 'This is a sample event');
	$("#content").html(cont);
}

var anotherSampleMarkerEvent = function() {
	var cont= "<center>";
	cont += "<h2>Sample Marker 2</h2>";
	cont += "<img src='assets/speedstar-img.png' />";
	cont += "<h3>This only appears if the user clicks on the Sample Marker 2</h3></center>";	
	$( "#closeArea" ).dialog( "open" );
 	$( '#closeArea' ).dialog( 'option', 'title', 'This is another sample event');
	$("#content").html(cont);
}