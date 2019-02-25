function json_to_tsv(json, fields){
	tsv = "";
	JSON.parse(json).forEach(function (e){
		fields.forEach(function (f){
			tsv += e[f] += "	";
			
		});
		tsv += "\n";
	});
	return tsv;
}

function parse_tsv(tsv, fields){
	list = [];

	tsv.split("\n").forEach(function (e) {
		let obj = {};
		e.split("	").forEach(function (v, i) {
			obj[fields[i]] = v;
		});
		list.push(obj);
	})
	
	return list;
}

function setup() {
	document.querySelector("#search_box").onkeypress = function (e) {
			console.log(e);
			console.log(e.keyCode);
			if (e.keyCode == '13') search();
	};
}