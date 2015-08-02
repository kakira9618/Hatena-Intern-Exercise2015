//JS4
function displayTable() {
	var div = document.getElementById('table-container');
	var loginput = document.getElementById('log-input');
	var logdata = parseLTSVLog(loginput.value);
	for(var i = 0; i < logdata.length; i++) {
		alert(logdata[i]["referer"]);
	}
	createLogTable(div, parseLTSVLog(loginput.value));
}