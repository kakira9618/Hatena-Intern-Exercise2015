// 課題 JS-1: 関数 `parseLTSVLog` を記述してください

function parseLTSVLog(logStr) {
	var logs = logStr.split(/\r\n|\r|\n/);
	var ret = new Array();
	for(var i = 0; i < logs.length; i++) {
		if (logs[i] == "") continue;
		var columns = logs[i].split(/\t/);
		var object = { };
		for(var j = 0; j < columns.length; j++) {
			var data = columns[j].match(/(.*?):(.*)$/); //1つめの:の前後で分ける。
			var key = data[1];
			var value = data[2];
			if (key == 'epoch') {
				value = parseInt(value);
			}
			if (key == 'req') {
				var req = value.split(/ /);
				object["method"] = req[0];
				object["path"] = req[1];
				object["protocol"] = req[2];
			}
			object[key] = value;
		}
		ret.push(object);
	}
	return ret;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください
// evflag : 作る表にマウスイベント系の機能を入れるか
function createLogTable(obj, logdata, evflag) {
	if(typeof evflag === 'undefined') evflag = false;
	for(var i = 0; i < obj.childNodes.length; i++) {
		obj.removeChild(obj.childNodes[i]);
	}
	if (logdata.length == 0) return;

	var keys = Object.keys(logdata[0]);

	var table = document.createElement("table");
	var thead = document.createElement("thead");
	var tr_thead = document.createElement("tr");
	
	for(var i = 0; i < keys.length; i++) {
		var th = document.createElement("th");
		th.textContent = keys[i];
		tr_thead.appendChild(th);
	}
	var tbody = document.createElement("tbody");
	
	for(var i = 0; i < logdata.length; i++) {
		var tr = document.createElement("tr");
		for(var j = 0; j < keys.length; j++) {
			var td = document.createElement("td");
			if (evflag) {
				td.addEventListener("mouseenter", hilight, false);
				td.addEventListener("mouseleave", disable_hilight, false);
				td.addEventListener("click", setCond, false);
				td.setAttribute('class', keys[j]);
			}
			td.textContent = logdata[i][keys[j]];
			tr.appendChild(td);
		}
		var td_path = document.createElement("td");
		var td_epoch = document.createElement("td");
		
		tbody.appendChild(tr);
	}

	obj.appendChild(table);
	table.appendChild(thead);
	thead.appendChild(tr_thead);
	table.appendChild(tbody);
	
}