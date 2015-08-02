// 課題 JS-1: 関数 `parseLTSVLog` を記述してください

function parseLTSVLog(logStr) {
	var logs = logStr.split(/\r\n|\r|\n/);
	var ret = new Array();
	for(var i = 0; i < logs.length; i++) {
		if (logs[i] == "") continue;
		var columns = logs[i].split(/\t/);
		var object = { };
		for(var j = 0; j < columns.length; j++) {
			var data = columns[j].match(/(.*):(.*)$/);
			var key = data[1];
			var value = data[2];
			if (!isNaN(parseInt(value))) {
				value = parseInt(value);
			}
			object[key] = value;
		}
		ret.push(object);
	}
	return ret;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください
function createLogTable(obj, logdata) {
	var table = document.createElement("table");
	var thead = document.createElement("thead");
	var tr_thead = document.createElement("tr");
	var th_path = document.createElement("th");
	var th_epoch = document.createElement("th");
	var tbody = document.createElement("tbody");
	th_path.textContent = "path";
	th_epoch.textContent = "epoch";

	for(var i = 0; i < logdata.length; i++) {
		var tr = document.createElement("tr");
		var td_path = document.createElement("td");
		var td_epoch = document.createElement("td");
		td_path.textContent = logdata[i]['path'];
		td_epoch.textContent = logdata[i]['epoch'];

		tbody.appendChild(tr);
		tr.appendChild(td_path);
		tr.appendChild(td_epoch);
	}

	obj.appendChild(table);
	table.appendChild(thead);
	thead.appendChild(tr_thead);
	tr_thead.appendChild(th_path);
	tr_thead.appendChild(th_epoch);
	table.appendChild(tbody);
	
}