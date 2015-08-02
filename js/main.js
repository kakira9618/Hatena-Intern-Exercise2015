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
