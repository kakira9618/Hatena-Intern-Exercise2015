// 課題 JS-3 の実装をここに記述してください。

function displayTable() {
	var div = document.getElementById('table-container');
	var loginput = document.getElementById('log-input');
	createLogTable(div, parseLTSVLog(loginput.value));
}