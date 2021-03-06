//JS4

// マウスオーバーされたマスをハイライト
function hilight(ev) {
	ev.currentTarget.style.backgroundColor="yellow";
}

// ハイライトされたマスを元に戻す
function disable_hilight(ev) {
	ev.currentTarget.style.backgroundColor="";
}

// マウスクリックしたマスから検索条件をコピー
function setCond(ev) {
	var key = ev.currentTarget.className;
	var value = ev.currentTarget.innerHTML;

	document.getElementById('key-name1').value = key;
	document.getElementById('value-name1').value = value;
	document.getElementById('mode1').value = "0";
	document.getElementById('exsearch-valid').checked = false;
	change_exsearch_form_state(document.getElementById('exsearch-valid'));
}

// 検索条件を初期状態に戻す。
function clearCond() {
	document.getElementById('key-name1').value = "";
	document.getElementById('value-name1').value = "";
	document.getElementById('mode1').value = "0";
	document.getElementById('exsearch-valid').checked = false;
	change_exsearch_form_state(document.getElementById('exsearch-valid'));
	document.getElementById('key-name2').value = "";
	document.getElementById('value-name2').value = "";
	document.getElementById('mode2').value = "0";
}


//検索結果を表示
function displayTable() {
	var div = document.getElementById('table-container');
	var loginput = document.getElementById('log-input');
	var logdata = parseLTSVLog(loginput.value);

	var key1 = document.getElementById('key-name1');
	var value1 = document.getElementById('value-name1');
	var mode1 = document.getElementById('mode1');
	var key2 = document.getElementById('key-name2');
	var value2 = document.getElementById('value-name2');
	var mode2 = document.getElementById('mode2');
	
	var exsearch = document.getElementById('exsearch-valid');

	if (exsearch.checked) {
		var way = document.getElementById('way');
		if (way.value == "and") {
			logdata = jQuery.grep(logdata, function(v, i){
				return predicator(value1.value, v[key1.value], mode1.value) && predicator(value2.value, v[key2.value], mode2.value);
			});
		} else {
			logdata = jQuery.grep(logdata, function(v, i){
				return predicator(value1.value, v[key1.value], mode1.value) || predicator(value2.value, v[key2.value], mode2.value);
			});
		}
	} else {
		if (value1.value != "") {
			logdata = jQuery.grep(logdata, function(v, i){
				return predicator(value1.value, v[key1.value], mode1.value);
			});
		}
	}
	
	createLogTable(div, logdata, true);
}

//検索条件
function predicator(v1, v2, mode) {
	if (mode == "0") { //完全一致
		return v1 == v2;
	} else if (mode == "1") { //不一致
		return v1 != v2;
	} else if (mode == "2") { //含まれている
		return v2.indexOf(v1) != -1;
	} else if (mode == "3") { //含まれていない
		return v2.indexOf(v1) == -1;
	}
}

//追加検索のチェックに応じてフォーム状態を有効/無効に
function change_exsearch_form_state(chkbox) {
	var key2 = document.getElementById('key-name2');
	var value2 = document.getElementById('value-name2');
	var way = document.getElementById('way');
	var mode2 = document.getElementById('mode2');

	key2.disabled = !chkbox.checked;
	value2.disabled = !chkbox.checked;
	way.disabled = !chkbox.checked;
	mode2.disabled = !chkbox.checked;
}