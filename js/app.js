
function loadTest() {
	
	if (test_data) {
		const gameInfo = document.querySelector("header .guide-info");
		gameInfo.innerHTML = ``;
		test_data.title && (gameInfo.innerHTML += `<div class="title"><span>${test_data.title}</span></div>`);
		//test_data.description && (gameInfo.innerHTML += `<div class="description"><span>${test_data.description}</span></div>`);
		test_data.version && (gameInfo.innerHTML += `<div class="version"><span>Version: </span><span>${test_data.version}</span></div>`);
		test_data.author && (gameInfo.innerHTML += `<div class="author"><span>Author: </span><span>${test_data.author}</span></div>`);
		//test_data.created && (gameInfo.innerHTML += `<div class="created"><span>Created: </span><span>${test_data.created}</span></div>`);
		//test_data.modified && (gameInfo.innerHTML += `<div class="modified"><span>Modified: </span><span>${test_data.modified}</span></div>`);

		document.getElementById("content").innerHTML = "";
		test_data.content.forEach(content => {
			const base = content.parent && (document.getElementById(`${content.parent}`)) || document.getElementById("content")
			base.innerHTML += buildData(content,test_data)
		});
	}
}

function buildData(content,data) {

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
	];

	const addStyles = (styleObj, exclude = []) => {
		if (!styleObj) return '';
		return styles
			.filter(prop => !exclude.includes(prop))
			.map(prop => {
				const key = prop;
				return styleObj[key] ? `${prop}:${styleObj[key]};` : '';
			})
			.join('');
	};
	const addStyle = (prop, styleObj) => {
		if (!styleObj || !styleObj[prop]) return '';
		return `${prop}:${styleObj[prop]};`;
	};
	

	switch (content.type)
	{
		case "page":
			return `<div class='${content.type}' id='${content.id}' data-title='${content.title}' style='${addStyles(content.style)}' ${content.order == 0 ? "data-page-open" : ""}></div>`;
		case "navigator":
			var output = `<div class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;
			output += `<ul>`;
			const pages = data.content.filter(item => item.type === "page");
			let pageCount = 0;
			for (const page of pages) {
				pageCount++;
				output += `<li>`;
				output += `<a onClick='changePage("${page.id}");' data-page='${page.id}' ${pageCount == 1 ? "data-page-open" : ""}>${page.title}</a>`;
				output += `<ul>`;
				const sections = data.content.filter(item => item.type === "section" && item.parent === page.id);
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
			const tabs = Object.entries(content.tabs).sort((a, b) => a[1].order - b[1].order)
			tabs.length > 0 && (output += `<div class='labelWrap'>`);
			tabs.forEach(([id, tab], i) => {
				output += `<label for="${id}-input"><input type="radio" id="${id}-input" name="${content.id}" onInput="tabInput(this)" ${i == 0 ? "checked" : ""} />${tab.title}</label>`
			});
			tabs.length > 0 && (output += `</div>`);
			tabs.forEach(([id, tab], i) => {
				output += `<div id="${id}" data-tab="${id}-input" ${i == 0 ? "data-tab-open" : ""} style='${addStyles(tab.style)}'></div>`
			});
			output += `</div>`;
			
			return output;
		case "table":
			var output = `<table class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>`;

			output += "<thead><tr>";
			content.table.headers.forEach(header => {
				let attrs = "";
				if (header.colspan && header.colspan > 1) attrs += ` colspan='${header.colspan}'`;
				if (header.rowspan && header.rowspan > 1) attrs += ` rowspan='${header.rowspan}'`;
				output += `<th${attrs}>${header.text}</th>`;
			});
			output += "</tr></thead>";

			output += "<tbody>";
			content.table.rows.forEach(row => {
				output += "<tr>";
				row.forEach(cell => {
					let attrs = "";
					if (cell.colspan && cell.colspan > 1) attrs += ` colspan='${cell.colspan}'`;
					if (cell.rowspan && cell.rowspan > 1) attrs += ` rowspan='${cell.rowspan}'`;
					output += `<td${attrs}>${cell.text}</td>`;
				});
				output += "</tr>";
			});
			output += "</tbody></table>";

			return output;
		case "image":
			var output = `<div class='${content.type}' id='${content.id}' style='${addStyle('float',content.style)}'>`
			output += `<div class='imageWrap' style='${addStyles(content.style,["object-fit","float"])}'>`;
			output += `<img src='${content.src}' alt='${content.id}' style='${addStyle('object-fit',content.style)}' />`;
			output += `</div>`;
			content.caption && (output += `<p class='caption'>${content.caption}</p>`);
			return output;
		case "header":
			return `<h2 class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</h2>`;
		case "sub-header":
			return `<h4 class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</h4>`;
		case "text":
			return `<p class='${content.type}' id='${content.id}' style='${addStyles(content.style)}'>${processText(content.text)}</p>`;
		default:
			return "";
	}
}


function processText(text) {
	// Match custom markup: {[Text]|modifiers}
	return text.replace(/\{\[(.*?)\]\|(.*?)\}/g, function(match, innerText, modifiers) {
		let style = "";
		let url = "";
		let tags = [];
		modifiers.split(';').forEach(mod => {
			mod = mod.trim();
			if (mod === "bold") tags.push("b");
			else if (mod === "italic") tags.push("i");
			else if (mod === "strike") tags.push("s");
			else if (mod === "underline") tags.push("u");
			else if (mod.startsWith("size:")) style += `font-size:${mod.slice(5)};`;
			else if (mod.startsWith("color:")) style += `color:${mod.slice(6).trim()};`;
			else if (mod.startsWith("url:")) url = mod.slice(4).replace(/^'|'$/g, "");
		});
		let result = innerText;
		tags.forEach(tag => { result = `<${tag}>${result}</${tag}>`; });
		if (url) {
			url = window.location.protocol === 'file:' && url.startsWith("#") ? `./index.html${url}` : url;
			result = `<a href='${url}'>${result}</a>`
		};
		if (style) result = `<span style='${style}'>${result}</span>`;
		return result;
	});
}

function tabInput(target) {
	const tabs = document.querySelectorAll(`div#${target.name} > div[data-tab]`);
	const tab = document.querySelector(`div[data-tab='${target.id}']`)

	tabs.forEach(tab => {
		tab.removeAttribute('data-tab-open');
	});
	tab && (tab.setAttribute("data-tab-open",""));
}




async function getDirectoryHandle() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('handles', 'readonly');
        const request = tx.objectStore('handles').get('lastDirectory');
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveDirectoryHandle(handle) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('handles', 'readwrite');
        const request = tx.objectStore('handles').put(handle, 'lastDirectory');
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FileHandles', 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('handles')) {
                db.createObjectStore('handles');
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function loadGuide() {
    try {
        const lastHandle = await getDirectoryHandle();
        const options = lastHandle ? { startIn: lastHandle } : {};
        const directoryHandle = await window.showDirectoryPicker(options);
        
        // Store for next time
        await saveDirectoryHandle(directoryHandle);
        
        let dataFile = false;
        
        for await (const entry of directoryHandle.values()) {
            if (entry.kind === 'file' && entry.name.endsWith('.json')) {
                const file = await entry.getFile();
                const content = await file.text();
                const data = JSON.parse(content);
                console.log('Loaded:', entry.name, data);
                dataFile = true;
            }
        }

        if (!dataFile) {
            console.warn('No data.json found.')
        }
    } catch (err) {
        console.error('Error:', err);
    }
}


function changePage(id) {

	if (document.querySelector(`#content > .page#${id}[data-page-open]`)) return;

	document.querySelectorAll('#content .navigator a[data-page-open]').forEach(el => el.removeAttribute('data-page-open'));
    const link = document.querySelector(`#content .navigator a[data-page='${id}']`)
	link && (link.setAttribute("data-page-open",""));


	const pages = document.querySelectorAll("#content > .page");
	pages.forEach(page => {
		page.removeAttribute('data-page-open');
	});
	
	const page = document.querySelector(`#content > .page#${id}`)
	page && (page.setAttribute("data-page-open",""));
}

function saveGuide() {
	document.body.dataset.edited = false;
}
function editGuide() {
	document.body.dataset.editor = document.body.dataset.editor == false;
}


(function() {
	loadTest();
	
	if (location.protocol === 'file:') {
		document.querySelectorAll('a[href$="/"]').forEach(a => {
			const href = a.getAttribute('href');
			if (!href.endsWith('index.html')) a.setAttribute('href', href + 'index.html');
		});
	}

})();


