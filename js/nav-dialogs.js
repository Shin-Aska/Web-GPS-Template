var about = function() {
	var cont = "<center><h2>Web GPS Template</h2></center>";
	cont += "<p>A software project aimed in helping people in need of technical assistance in creating their own hybrid gps map (This project only uses standard JavaScript libraries and functions)</p>";
	cont += "<h5>This project made use of the following components:</h5>";
	cont += "<ul> <li>qgis2web</li> <li>Open Layers</li> <li>Jquery with Jquery UI</li> <li>OpenStreet Maps</li> </ul> <br>";
	cont += "<p> Thank you for using this template and this would not be possible if it were not for the never-ending support of my friends, classmates and family. </p>";
	cont += "<p> (This project is under the terms of MPL (Mozilla public license) and as the license dictates it can be used by other commercial products if wished without any cost or agreement. Although a public recognition is always nice :) </p>";
	cont += "<h5>Made by: Richard Louie Orilla (<a href='mailto:Orillarichard@gmail.com'>Orillarichard@gmail.com</a>) </h5>";

	$( "#closeArea" ).dialog( "open" );
 	$( '#closeArea' ).dialog( 'option', 'title', 'Web GPS Template About');
	$("#content").html(cont);
}

var settings_manualchange = function() {

	manualmode = !$('#manualModeSelector').prop("checked");
	if (manualmode) {
		manual();
	}
}

var settings = function() {
	var cont = "";
	cont += "<h3>Application Settings</h3>";
	cont += "<p><p style='float: left; margin-right: 25px;' id='tooltips' title='Determines how Car Repair Buddy will locate your location. Turning this off will turn on Manual Mode.'>GPS Mode:<i id='tooltipr' class=\"fa fa-info-circle\" aria-hidden=\"true\"></i></p><input id='manualModeSelector' type=\"checkbox\"></p>";
	cont += "<p title='Radius Search Extension determines if a shop or autoparts store is near to you.'>Radius Search Extension Limit: <i id='tooltipr' class=\"fa fa-info-circle\" aria-hidden=\"true\"></i><input type='number' min=0 max=9000 id='rlimit' /></p>";

	$( "#closeArea" ).dialog( "open" );
 	$( '#closeArea' ).dialog( 'option', 'title', 'App Settings');
	$("#content").html(cont);

	$('#manualModeSelector').prop("checked", !manualmode);
	$('#manualModeSelector').switchButton();
	$('#manualModeSelector').change(function(){
		settings_manualchange();
	});

	$("#rlimit").val(rLimit);
	$("#rlimit").change(function(){
		rLimit = $("#rlimit").val();
	});

	$("#rlimit").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $( "#content" ).tooltip();
}