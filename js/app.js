
let guideData = {};

function buildContent(content) {

	switch (content.type)
	{
		case "page":
			return `<div data-type='${content.type}' id='${content.id}' data-title='${content.title}' style='${addStyles(content.style)}'></div>`;
		case "navigator":
			var output = `<div data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;
			output += `<ul>`;
			const pages = guideData.content.filter(item => item.type === "page").sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
			let pageCount = 0;
			for (const page of pages) {
				pageCount++;
				output += `<li>`;
				output += `<a onClick='changePage("${page.id}");' data-page='${page.id}'>${page.title}</a>`;
				output += `<ul>`;
				const sections = guideData.content.filter(item => item.type === "section" && item.parent === page.id);
				let sectionCount = 0;
				for (const section of sections) {
					sectionCount++;
					let url = window.location.protocol === 'file:' ? `./index.html${window.location.search}#${section.id}` : `${window.location.search}#${section.id}`;
					output += `<li>`;
					output += `<a href='${url}' onClick='changePage("${page.id}")'>${pageCount}.${sectionCount} - ${section.title}</a>`;
					output += `</li>`;
				}
				output += `</ul>`;
				output += `</li>`;
			}
			output += `</ul>`;

			return output;
		case "section":
			return `<div data-type='${content.type}' id='${content.id}' data-title='${content.title}' style='${addStyles(content.style)}'></div>`;
		case "panel":
			return `<div data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'></div>`;
		case "tabs":
			var output = `<div data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;

			const tabs = guideData.content.filter(e => e.parent === content.id && e.type == "tab").sort((a, b) => a.order - b.order);

			tabs.length > 0 && (output += `<div class='labelWrap'>`);
			tabs.forEach((tab, i) => {
				output += `<label for="${tab.id}-input"><input type="radio" id="${tab.id}-input" name="${content.id}" onInput="tabInput(this)" ${i == 0 ? "checked" : ""} />${tab.title}</label>`
			});
			tabs.length > 0 && (output += `</div>`);
			tabs.forEach((tab, i) => {
				output += `<div id="${tab.id}" data-type='tab' data-tab="${tab.id}-input" ${i == 0 ? "data-tab-open" : ""} style='${addStyles(tab.style)}'></div>`
			});
			output += `</div>`;
			
			return output;
		case "table":
			var output = `<table data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;

			const tableData = Object.values(
			guideData.content.filter(e => e.type === "table-cell" && e.parent == content.id).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).sort((a, b) => (a.row ?? 0) - (b.row ?? 0)).reduce((acc, cell) => {
				if (!acc[cell.row]) {
				acc[cell.row] = [];
				}
				acc[cell.row].push(cell);
				return acc;
			}, {})
			);

			tableData.forEach((row, r) => {
				r == 0 && (output += "<thead><tr>");
				r == 1 && (output += "<tbody>");
				r != 0 && (output += "<tr>");
	
				row.forEach((cell, c) => {
					const tagName = r == 0 ? "th" : "td";
					const colspan = cell.colspan || 1;
					const rowspan = cell.rowspan || 1;
					output += `<${tagName} id='${cell.id}' data-type='${cell.type}' colspan='${colspan}' rowspan='${rowspan}' style='${addStyles(content.style)}'}>${processText(cell.text)}</${tagName}>`
					
				});

				r == 0 && (output += "</tr></thead>");
				r != 0 && (output += "</tr>");
				r == tableData.length-1 && (output += "</tbody></table>");
			})
			return output;
		case "diagram":
			return `<div data-type='${content.type}' class='mermaid' id='${content.id}' style='${addStyles(content.style)}'></div>`;
		case "image":
			const imageStyles = {
				"wrap": [],
				"image": ["border-radius"],
				"text": ["color","font-size","text-shadow","font-weight","font-style"],
			}
			imageStyles.wrap = Object.keys(allOptions).filter(s => allOptions[s] == "style" && !s.includes(imageStyles.image));

			var output = `<div data-type='${content.type}' id='${content.id}' style='${addStyles(content.style,imageStyles.wrap)}'>`
			output += `<div class='imageWrap' style=''>`;
			output += `<img src='${content.src}' alt='${content.id}' style='${addStyles(content.style,imageStyles.image)}' />`;
			output += `</div>`;
			content.caption && (output += `<strong class='caption' style='${addStyles(content.style,imageStyles.image,[])}'>${content.caption}</strong>`);
			return output;
		case "header":
			return `<h2 data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</h2>`;
		case "sub-header":
			return `<h4 data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</h4>`;
		case "text":
			return `<p data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</p>`;
		case "footer":
			const pagesArr = guideData.content.filter(item => item.type === "page").sort((a, b) => a.order - b.order);
			const pageId = content.parent;
			const previousPage = pagesArr[pagesArr.findIndex(p => p.id === pageId) - 1] || null;
			const nextPage = pagesArr[pagesArr.findIndex(p => p.id === pageId) + 1] || null;
			return `<div data-type='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${previousPage ? `<span class='previous'>← <a onClick='changePage("${previousPage.id}")'>${previousPage.title}</a></span>` : ""} ${nextPage ? `<span class='next'><a onClick='changePage("${nextPage.id}")'>${nextPage.title}</a> →</span>` : ""}</div>`;
		default:
			return "";
	}
}


function generateDiagram(entry) {
	const diagramNodes = guideData.content.filter(item => item.type === "diagram-node" && item.parent === entry.id).sort((a, b) => a.order - b.order);
	const nodes = diagramNodes.map(node => ({ id: node.id, text: node.text || "" }));

	const links = [];
	diagramNodes.forEach(node => {
		if (node.target && Array.isArray(node.target)) {
			node.target.forEach(targetId => {
				links.push({ source: node.id, target: targetId });
			});
		}
	});
	const lines = [`graph ${entry.direction || "LR"}`].concat(nodes.map(n => `${n.id}[${processText(n.text)}]`)).concat(links.map(l => `${l.source} --- ${l.target}`));
	return lines.join("\n");
}

function processText(text) {
	const pattern = /\{\[([^\{\}]*?)\]\|([^\{\}]*?)\}/g;

	if (!text) return "";

	text = text.toString();
	
	let prev;
	do {
		prev = text;
		text = text.replace(pattern, function(match, innerText, modifiers) {

			// 🔁 Process inner styles first
			innerText = processText(innerText);

			let style = "";
			let url = "";
			let tags = [];

			modifiers.split(';').forEach(mod => {
				mod = mod.trim();
				if (mod === "bold") tags.push("b");
				else if (mod === "italic") tags.push("i");
				else if (mod === "strike") tags.push("s");
				else if (mod === "underline") tags.push("u");
				else if (mod === "super") tags.push("sup");
				else if (mod === "quote") tags.push("blockquote");
				else if (mod === "code") tags.push("code");
				else if (mod === "spoiler") tags.push("spoiler");
				else if (mod.startsWith("size:")) style += `font-size:${mod.slice(5).replace(/^'|'$/g, "")};`;
				else if (mod.startsWith("color:")) style += `color:${mod.slice(6).replace(/^'|'$/g, "")};`;
				else if (mod.startsWith("link:")) url = mod.slice(5).replace(/^'|'$/g, "");
			});

			let result = innerText;
			tags.forEach(tag => {
				if (tag == "spoiler") {
					result = `<span class='spoiler' data-spoiler='true' data-text='${result.replace(/<[^>]*>/g, '')}'><span class='spoiler-content'>${result}</span></span>`
				}
				else {
					result = `<${tag}>${result}</${tag}>`;
				}
			});

			if (url) {
				let onClick = "";
				if (url.startsWith("#")) {
					url = window.location.protocol === 'file:' ? `./index.html${window.location.search}${url}` : `${window.location.search}${url}`;
				}
				result = `<a class='link' href='${url}' ${onClick}>${result}</a>`;
			}

			if (style) result = `<span style='${style}'>${result}</span>`;
			return result;
		});
	} while (text !== prev); // keep going until no more replacements

	text = text.replaceAll("\n","<br>")

	return text;
}


function findById(id, obj = guideData, visited = new Set()) {
    if (visited.has(obj)) return null;
    visited.add(obj);
    if (obj.id === id) return obj;
    const items = obj.content || (Array.isArray(obj) ? obj : Object.values(obj).filter(v => typeof v === 'object'));
    return items.flatMap(v => findById(id, v, visited)).find(x => x) || null;
}

function tabInput(target) {
	const tabs = document.querySelectorAll(`div#${target.name} > div[data-tab]`);
	const tab = document.querySelector(`div[data-tab='${target.id}']`)

	tabs.forEach(tab => {
		tab.removeAttribute('data-tab-open');
	});
	tab && (tab.setAttribute("data-tab-open",""));
}



function redirectHighlight() {
	setTimeout(() => {
		const id = decodeURIComponent(location.hash || "").replace(/^#/, "");
		if (!id) return;
		const el = document.getElementById(id);
		if (!el || el.classList.contains("hash-highlight")) return;
		el.classList.add("hash-highlight");
		setTimeout(() => el.classList.remove("hash-highlight"), 2000);
	}, 100);
}


function changePage(id) {

	if (document.querySelector(`#content > *[data-type='page'][id='${id}'][data-page-open]`)) return;

	document.querySelectorAll('#content *[data-type="navigator"] a[data-page-open]').forEach(el => el.removeAttribute('data-page-open'));
    const link = document.querySelector(`#content *[data-type="navigator"] a[data-page='${id}']`)
	link && (link.setAttribute("data-page-open",""));

	const pages = document.querySelectorAll("#content > *[data-type='page']");
	pages.forEach(page => {
		page.removeAttribute('data-page-open');
	});
	
	const page = document.querySelector(`#content > *[data-type='page'][id='${id}']`)
	page && (page.setAttribute("data-page-open",""));

	renderDiagrams();
	history.replaceState(null, "", location.pathname + location.search);
}

let diagramRenderCounter = 0;
async function renderDiagrams() {
	const isVisible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);

	if (!mermaid) {
		mermaid.initialize({
			startOnLoad:false,
		});
	}

	const diagrams = document.querySelectorAll("#content *[data-type='diagram']");
	for (const diagram of diagrams) {
		if (isVisible(diagram)) {
			diagram.dataset.processed = false;

			const mermaidString = generateDiagram(guideData.content.find(e => e.id == diagram.id))
			const renderId = `mermaid-${diagramRenderCounter++}`;

			try {
				const { svg } = await mermaid.render(renderId, mermaidString);
				diagram.innerHTML = svg;
				
			} catch (error) {
				console.error("Mermaid rendering failed:", error);
				diagram.innerHTML = `${mermaidString}`;
			}

			const nodes = diagram.querySelectorAll(":scope *[data-id][data-node='true']");
			nodes.forEach(n => { 
				n.dataset.type = "diagram-node";
			});
		}
	}
}

function saveGuide() {
	guideData.modified = Date.now();
	guideData.save();
}
function enterEditor() {
	let editorMode = document.body.dataset.editor == "false" || !document.body.dataset.editor;
	document.body.dataset.editor = editorMode;

	const editBtn = document.querySelector("header .editWrapper button.editor")
	editBtn.className = editorMode ? "btn btn-secondary editor" : "btn btn-primary editor";
}



(function() {
	
	if (location.protocol === 'file:') {
		document.querySelectorAll('a[href$="/"]').forEach(a => {
			const href = a.getAttribute('href');
			if (!href.endsWith('index.html')) a.setAttribute('href', href + 'index.html');
		});
	}
})();


function loadDataFromUrl() {
	const params_id = new URL(window.location.href).searchParams.get("id");

	if (params_id) {
		const loadPreviousData = localStorage.getItem(`GameGuideData_${params_id}`)
		if (loadPreviousData) {
			loadGuide(JSON.parse(loadPreviousData));
			return true;
		}
	}
	return false;
}