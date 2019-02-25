function search() {
	let query = document.querySelector("#search_box").value;
	if (query.length == 0) return;
	
	start_loading_animation();

	let people_container = document.createElement("div"),
		papers_container = document.createElement("div"),
		news_container = document.createElement("div");



		// people_container.id = "people-container";
		// papers_container.id = "papers-container";
		// news_container.id = "news_container";

		document.querySelector("main").appendChild(people_container);
		document.querySelector("main").appendChild(papers_container);
		document.querySelector("main").appendChild(news_container);

	

	load_json("people.json", function (list) {
		window.people_results = fuse(["name", "bio"], query, list);
		console.log(people_results)
		display_people_results(people_results, people_container)

	});

	load_json("papers.json", function (list) {
		window.papers_results = fuse(["authors", "title", "publisher", "keywords"], query, list);
		console.log(papers_results)
		display_papers(papers_results, papers_container)

	});

	load_json("news.json", function (list) {
		window.news_results = fuse(["event"], query, list);
		console.log(news_results)
		display_news_results(news_results, news_container)
	});

	stop_loading_animation();

	return false;
}


//display list of papers in element container
function display_papers(list, container) {
	list.forEach(function (p) {

		let section = document.createElement("section");
			section.setAttribute("class", "paper");
		let title = document.createElement("h4");
			title.innerText = p.title;
		let authors = document.createElement("h5");
			authors.innerText = p.authors.join(", ");
		let publisher = document.createElement("h5");
			publisher.innerText = p.publisher + " ("+p.date+")";
		let link = document.createElement("a");
			link.href = p.link;
			link.target = "_blank";
			link.innerText = "Link";

		section.appendChild(title);
		section.appendChild(authors);
		section.appendChild(publisher);
		section.appendChild(link);

		container.appendChild(section);

	});
}

//display news in page
function display_news_results(list, container) {

		if (list.length > 0) {
			let h3 = document.createElement("h2")
				h3.innerText = "News"
				h3.style.margin = "1em 4em"
				h3.style.color = "#0c525f"
			container.appendChild(h3)
		}

		list.sort(function (a,b) {
			return (new Date(b.date)) - (new Date(a.date));
		});

		let current = null,
			current_container = null;

		list.forEach(function (d) {

			if (d.date != current) {
				//add a new date
				current = d.date;
				let div = current_container = document.createElement("div");
				div.setAttribute("class", "news-event result");
				let date = document.createElement("h4");
				date.innerText = d.date;
				div.appendChild(date);
				container.appendChild(current_container);
			}

			let p = document.createElement("p");
				p.innerHTML += d.event + "<br>"
			current_container.appendChild(p);

			
		});
	}

//display people from search in list inside container
function display_people_results(list, container) {

	list.sort(p => (p.current) ? -1 : 1);

	list.forEach(function (p) {

		let section = document.createElement("section");
		section.setAttribute("class", "bio result");
		let img = document.createElement("div");
			img.setAttribute("class", "headshot result");
			img.style.backgroundImage = "url(images/people/"+p.name.replace(/ /g, "")+".jpg)"
		let name = document.createElement("h3");
			name.innerText = p.name + ", " + p.title;
		let position = document.createElement("h4");
			position.innerText = p.position;

		section.appendChild(img);
		section.appendChild(name);
		section.appendChild(position);
		container.appendChild(section);
		
	});
}


function load_json(file_name, callback) {
	let request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			let result = JSON.parse(request.responseText);
			callback(result);
		}
	}
	request.open("GET", file_name);
	request.send();
}

function fuse(k, q, l) {
	let options = {
		shouldSort: true,
		threshold: 0.3,
		location: 0,
		distance: 100,
		maxPatternLength: 32,
		minMatchCharLength: 1,
		keys: k
	};

	return (new Fuse(l, options)).search(q);
}

function start_loading_animation() {
	let main = document.querySelector("main");
	main.innerHTML = "<div id='loading-animation'>Loading...</div>";
}

function stop_loading_animation() {
	document.querySelector("#loading-animation").remove();
}