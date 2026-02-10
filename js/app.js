
let guideData = {};

function buildContent(content) {

	const styles = [
		"width",
		"height",
		"min-width",
		"min-height",
		"max-width",
		"max-height",
		"background",
		"aspect-ratio",
		"text-align",
		"float",
		"object-fit",
		"margin",
		"padding",
		"border-width",
		"border-style",
		"border-color",
		"border-radius",
		"color",
		"font-size",
		"box-shadow",
		"text-shadow",
		"font-weight",
		"font-style",
		"display",
		"align-items",
		"justify-content",
		"flex-direction",
		"flex-wrap",
		"clear",
		"justify-self",
		"align-self"
	];

	const addStyles = (styleObj, include = [], exclude = []) => {
		if (!styleObj) return '';
		const list = include.length ? include : styles;
		return list
			.filter(prop => !exclude.includes(prop))
			.map(prop => (styleObj[prop] ? `${prop}:${styleObj[prop]};` : ''))
			.join('');
	};

	

	switch (content.type)
	{
		case "page":
			return `<div class='${content.type}' id='${content.id}' data-title='${content.title}' style='${addStyles(content.style)}'></div>`;
		case "navigator":
			var output = `<div class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;
			output += `<ul>`;
			const pages = guideData.content.filter(item => item.type === "page");
			let pageCount = 0;
			for (const page of pages) {
				pageCount++;
				output += `<li>`;
				output += `<a onClick='changePage("${page.id}");' data-page='${page.id}' ${pageCount == 1 ? "data-page-open" : ""}>${page.title}</a>`;
				output += `<ul>`;
				const sections = guideData.content.filter(item => item.type === "section" && item.parent === page.id);
				let sectionCount = 0;
				for (const section of sections) {
					sectionCount++;
					let url = window.location.protocol === 'file:' ? `./index.html#${section.id}` : `#${section.id}`;
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
			return `<div class='${content.type}' id='${content.id}' data-title='${content.title}' style='${addStyles(content.style)}'></div>`;
		case "panel":
			return `<div class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'></div>`;
		case "tabs":
			var output = `<div class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;

			const tabs = guideData.content.filter(e => e.parent === content.id && e.type == "tab").sort((a, b) => a.order - b.order);

			tabs.length > 0 && (output += `<div class='labelWrap'>`);
			tabs.forEach((tab, i) => {
				output += `<label for="${tab.id}-input"><input type="radio" id="${tab.id}-input" name="${content.id}" onInput="tabInput(this)" ${i == 0 ? "checked" : ""} />${tab.title}</label>`
			});
			tabs.length > 0 && (output += `</div>`);
			tabs.forEach((tab, i) => {
				output += `<div id="${tab.id}" class='tab' data-tab="${tab.id}-input" ${i == 0 ? "data-tab-open" : ""} style='${addStyles(tab.style)}'></div>`
			});
			output += `</div>`;
			
			return output;
		case "table":
			var output = `<table class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;

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
					output += `<${tagName} id='${cell.id}' class='${cell.type}' colspan='${colspan}' rowspan='${rowspan}' style='${addStyles(content.style)}'}>${processText(cell.text)}</${tagName}>`
					
				});

				r == 0 && (output += "</tr></thead>");
				r != 0 && (output += "</tr>");
				r == tableData.length-1 && (output += "</tbody></table>");
			})
			return output;
		case "diagram":
			const lines = [`graph ${content.direction || "LR"}`]
				.concat(content.nodes.map(n => `${n.id}[${processText(n.text)}]`))
				.concat(content.links.map(l => `${l.source} --- ${l.target}`));

			output = `<div class='${content.type} mermaid' id='${content.id}' style='${addStyles(content.style)}'>`
			output += lines.join("\n");
			output += `</div>`

			return output;
		case "image":
			const imageStyles = {
				"wrap": [],
				"image": ["border-radius"],
				"text": ["color","font-size","text-shadow","font-weight","font-style"],
			}
			imageStyles.wrap = Object.keys(allOptions).filter(s => allOptions[s] == "style" && !s.includes(imageStyles.image));

			var output = `<div class='${content.type}' id='${content.id}' style='${addStyles(content.style,imageStyles.wrap)}'>`
			output += `<div class='imageWrap' style=''>`;
			output += `<img src='${content.src}' alt='${content.id}' style='${addStyles(content.style,imageStyles.image)}' />`;
			output += `</div>`;
			content.caption && (output += `<strong class='caption' style='${addStyles(content.style,imageStyles.image,[])}'>${content.caption}</strong>`);
			return output;
		case "header":
			return `<h2 class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</h2>`;
		case "sub-header":
			return `<h4 class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</h4>`;
		case "text":
			return `<p class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</p>`;
		case "footer":
			const pagesArr = guideData.content.filter(item => item.type === "page").sort((a, b) => a.order - b.order);
			const pageId = content.parent;
			const previousPage = pagesArr[pagesArr.findIndex(p => p.id === pageId) - 1] || null;
			const nextPage = pagesArr[pagesArr.findIndex(p => p.id === pageId) + 1] || null;
			return `<div class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${previousPage ? `<span class='previous'>← <a onClick='changePage("${previousPage.id}")'>${previousPage.title}</a></span>` : ""} ${nextPage ? `<span class='next'><a onClick='changePage("${nextPage.id}")'>${nextPage.title}</a> →</span>` : ""}</div>`;
		default:
			return "";
	}
}


function processText(text) {
	const pattern = /\{\[([^\{\}]*?)\]\|([^\{\}]*?)\}/g;

	if (!text) return "";
	
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
				else if (mod.startsWith("size:")) style += `font-size:${mod.slice(5).replace(/^'|'$/g, "")};`;
				else if (mod.startsWith("color:")) style += `color:${mod.slice(6).replace(/^'|'$/g, "")};`;
				else if (mod.startsWith("link:")) url = mod.slice(5).replace(/^'|'$/g, "");
			});

			let result = innerText;
			tags.forEach(tag => {
				result = `<${tag}>${result}</${tag}>`;
			});

			if (url) {
				let onClick = "";
				if (url.startsWith("#")) {
					let target = findById(url.slice(1));
					let i = 0;
					while (target && target.type !== "page" && i < 10) {
						target = guideData.content.find(item => item.id === target.parent);
						i++;
					}
					if (target) onClick = `onClick='changePage("${target.id}")'`;
					url = window.location.protocol === 'file:' ? `./index.html${url}` : url;
				}
				result = `<a href='${url}' ${onClick}>${result}</a>`;
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

	if (document.querySelector(`#content > .page[id='${id}'][data-page-open]`)) return;

	document.querySelectorAll('#content .navigator a[data-page-open]').forEach(el => el.removeAttribute('data-page-open'));
    const link = document.querySelector(`#content .navigator a[data-page='${id}']`)
	link && (link.setAttribute("data-page-open",""));

	const pages = document.querySelectorAll("#content > .page");
	pages.forEach(page => {
		page.removeAttribute('data-page-open');
	});
	
	const page = document.querySelector(`#content > .page[id='${id}']`)
	page && (page.setAttribute("data-page-open",""));

	renderDiagrams();
	history.replaceState(null, "", location.pathname + location.search);
}

function renderDiagrams() {
	const isVisible = el => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	document.querySelectorAll("#content .mermaid").forEach(m => {
		if (isVisible(m)) mermaid.init(undefined, m)
	});
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
	document.querySelectorAll("#content a").forEach(a => {
		a.addEventListener("click", redirectHighlight);
	})
	
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