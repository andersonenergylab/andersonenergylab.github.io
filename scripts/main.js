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

function setup(page="") {
	if (page == "main"){
		
		document.querySelectorAll("section").forEach(e=>e.style.height = `${Math.max(600, window.innerHeight)}px`)
		// document.querySelector("section#news").style.height = `${window.innerHeight}px`

		document.querySelector("section#about").style.height = `${window.innerHeight - 100}px`
	}
	else{
		document.body.style.background = "white"
	}

	fetch("header.html")
	.then((response) => response.text())
	.then((html) => {
			document.querySelector("header").innerHTML = html;
			document.querySelector("#search_box").onkeypress = function (e) {
			console.log(e);
			console.log(e.keyCode);
			if (e.keyCode == '13') search();
	};
	})

	
}

function sort_people(p1, p2) {
		function rank(p){
			if (p.name == "Lindsay Anderson") return 0;
			switch(p.position){
				case "Postdoctoral Student":
					return 1
				case "PhD Student":
					return 2
				case "MEng Student":
					return 3
				case "Undergraduate Research Assistant":
					return 4
				default:
					return 5
			}
		}
		return rank(p1) - rank(p2);
}

function toggle_ham() {
	let nav = document.querySelector("nav.mobile")

	console.log(nav.style.height)

	if (nav.style.height == "0px") nav.style.height = "unset";
	else nav.style.height = "0px"

}	

function show_search_input(){
	let input = document.querySelector("#search_box")

	if (input.offSetParent == null){
		input.style.display = "initial"
		document.querySelector("#logo").style.display = "none"
	}
}