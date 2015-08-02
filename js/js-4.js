//JS4
function displayTable() {
	var div = document.getElementById('table-container');
	var loginput = document.getElementById('log-input');
	var logdata = parseLTSVLog(loginput.value);
	createLogTable(div, logdata);
}

