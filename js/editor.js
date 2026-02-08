const state = {
	selected: null,
	startX: 0,
	startY: 0,
	startW: 0,
	startH: 0,
};
const ignoredElements = {
	"page": "element",
	"footer": "closest",
};
const allOptions = {
	"order": "key",
	"id": "key",
	"parent": "key",
	"width": "style",
	"height": "style",
	"min-width": "style",
	"min-height": "style",
	"max-width": "style",
	"max-height": "style",
	"background": "style",
	"aspect-ratio": "style",
	"text-align": "style",
	"float": "style",
	"object-fit": "style",
	"margin": "style",
	"padding": "style",
	"border": "style",
	"border-radius": "style",
	"color": "style",
	"font-size": "style",
	"box-shadow": "style",
	"text-shadow": "style",
	"font-weight": "style",
	"font-style": "style",
	"display": "style",
	"align-items": "style",
	"justify-content": "style",
	"flex-direction": "style",
	"flex-wrap": "style",
	"clear": "style",
	"justify-self": "style",
	"align-self": "style",
};


const groupDefinitions = [
	["id","parent","order"],
	["width", "height", "min-width", "min-height", "max-width", "max-height", "aspect-ratio"],
	["margin", "padding"],
	["background"],
	["text", "color", "font-size", "font-weight", "font-style", "text-align", "text-shadow"],
	["display", "align-items", "justify-content", "flex-direction", "flex-wrap", "justify-self", "align-self", "float", "clear",],
	["object-fit"],
	["border", "border-radius", "box-shadow"],
];

const typeOptions = {
	"page": ["order","id","background", "padding"],
	"navigator": ["order","id"],
	"panel": ["order","id","parent","text-align", "display", "flex-direction", "flex-wrap", "align-items", "justify-content", "padding", "margin", "background", "border", "border-radius", "box-shadow"],
	"section": ["order","id","parent","width", "height", "padding", "margin", "background", "border", "border-radius"],
	"image": ["order","id","parent","width", "height", "object-fit", "border", "border-radius"],
	"table": ["order","id","parent","width", "border", "border-radius"],
	"sub-header": ["order","id","parent","text", "color", "font-size", "font-weight", "font-style", "text-align", "text-shadow"],
	"header": ["order","id","parent","text", "color", "font-size", "font-weight", "font-style", "text-align", "text-shadow"],
	"text": ["order","id","parent","text", "color", "font-size", "font-weight", "font-style", "text-align", "text-shadow"],
};

const selectOptions = {
	"border-style": ["none", "solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "hidden"],
	"display": ["block", "inline", "inline-block", "inline-flex", "flex", "grid", "inline-grid", "none", "inherit", "initial", "unset"],
	"float": ["none", "left", "right", "inline-start", "inline-end"],
	"clear": ["none", "left", "right", "both", "inline-start", "inline-end"],
	"align-items": ["stretch", "flex-start", "flex-end", "center", "baseline"],
	"justify-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
	"flex-direction": ["row", "row-reverse", "column", "column-reverse"],
	"flex-wrap": ["nowrap", "wrap", "wrap-reverse"],
	"justify-self": ["auto", "normal", "stretch", "center", "start", "end", "self-start", "self-end", "left", "right"],
	"align-self": ["auto", "stretch", "flex-start", "flex-end", "center", "baseline"],
	"text-align": ["left", "right", "center", "justify", "start", "end"],
	"font-style": ["normal", "italic", "oblique"],
	"object-fit": ["cover", "contain", "fill", "none", "scale-down"],
};

const isEditor = () => document.body.dataset.editor === "true";

function openSidebar() {
	const isOpen = document.body.dataset.sidebar === "true";
	if (!isOpen) {
		const desiredSide = computeSidebarSide();
		const currentSide = document.body.dataset.sidebarSide || "right";
		if (desiredSide !== currentSide) {
			document.body.dataset.sidebarNoAnim = "true";
			document.body.dataset.sidebarSide = desiredSide;
		}
	}
	document.body.dataset.sidebar = isOpen ? "false" : "true";
	updateSidebarSide();
	if (document.body.dataset.sidebarNoAnim === "true") {
		requestAnimationFrame(() => {
			delete document.body.dataset.sidebarNoAnim;
		});
	}
};

function ensureSidebarOpen() {
	document.body.dataset.sidebar = "true";
	updateSidebarSide();
}

const sidebar = document.getElementById("sidebar");
const sidebarState = {
	currentPageId: "",
	currentElementId: "",
};

const menu = document.createElement("div");
menu.id = "editor-context-menu";
menu.className = "editor-context-menu";
menu.innerHTML = `
	<button type="button" data-action="edit">Edit</button>
	<button type="button" data-action="remove">Remove</button>
	<button type="button" data-action="close">Close</button>
`;
document.body.appendChild(menu);


function closeMenu() {
	menu.style.display = "none";
}

function closeSidebar() {
	document.body.dataset.sidebar = false;
	
}

const selectableTypes = [
	"page",
	"navigator",
	"section",
	"panel",
	"tabs",
	"table",
	"diagram",
	"image",
	"header",
	"sub-header",
	"text",
];



function createSelect(field, options, currentValue) {
	const select = document.createElement("select");
	select.dataset.field = field;
	const emptyOption = document.createElement("option");
	emptyOption.value = "";
	emptyOption.textContent = "";
	select.appendChild(emptyOption);
	options.forEach(optionValue => {
		const option = document.createElement("option");
		option.value = optionValue;
		option.textContent = optionValue;
		select.appendChild(option);
	});
	select.value = currentValue || "";
	return select;
}



function clearSidebar() {
	if (!sidebar) return;
	sidebar.innerHTML = "";
}


const entryTemplates = {
	"page": {
		"type": "page",
	},
	"footer": {
		"type": "footer",
	},
	"section": {
		"type": "section",
	},
	"panel": {
		"type": "panel",
	},
	"text": {
		"type": "text",
		"text": "Sample normal text.",
	},
	"header": {
		"type": "header",
		"text": "Sample header text."
	},
	"sub-header": {
		"type": "sub-header",
		"text": "Sample sub-header text."
	},
	"image": {
		"type": "image",
		"src": "./media/placeholder.png",
		"caption": "Sample Image Caption Text",
	},
	"tabs": {
		"type": "tabs",
		"tabs": {
			"example-tab1": {"title": "Example Tab 1", "order": 1,},
			"example-tab2": {"title": "Example Tab 2", "order": 2,},
			"example-tab3": {"title": "Example Tab 3", "order": 3,}
		},
	},
	"table": {
		"type": "table",
		
		"table": {
			"headers": [
				{ "text": "Fruit" },
				{ "text": "Taste" },
				{ "text": "Color" },
				{ "text": "Size" },
				{ "text": "Seeds" }
			],
			"rows": [
				[
					{ "text": "Apple", "id": "apple" },
					{ "text": "Sweet/Tart" },
					{ "text": "Red/Green" },
					{ "text": "Medium" },
					{ "text": "Yes" }
				],
				[
					{ "text": "Banana" },
					{ "text": "Sweet" },
					{ "text": "Yellow" },
					{ "text": "Medium" },
					{ "text": "No" }
				],
				[
					{ "text": "Orange" },
					{ "text": "Citrusy" },
					{ "text": "Orange" },
					{ "text": "Medium" },
					{ "text": "Sometimes" }
				],
				[
					{ "text": "Grape" },
					{ "text": "Sweet" },
					{ "text": "Purple/Green" },
					{ "text": "Small" },
					{ "text": "Yes" }
				]
			]
		}
	},
	"diagram": {
		"type": "diagram",
		"direction": "LR",
		"nodes": [
			{ "id": "apple", "text": "Apple" },
			{ "id": "banana", "text": "Banana" },
			{ "id": "orange", "text": "Orange" },
			{ "id": "fruit_basket", "text": "Fruit Basket" },
			{ "id": "fruit_salad", "text": "Fruit Salad" },
			{ "id": "apple_pie", "text": "Apple Pie" },
			{ "id": "smoothie", "text": "Smoothie" }
		],
		"links": [
			{ "source": "apple", "target": "fruit_basket" },
			{ "source": "banana", "target": "fruit_basket" },
			{ "source": "orange", "target": "fruit_basket" },
			{ "source": "fruit_basket", "target": "fruit_salad" },
			{ "source": "apple", "target": "apple_pie" },
			{ "source": "banana", "target": "smoothie" },
			{ "source": "orange", "target": "smoothie" },
			{ "source": "fruit_salad", "target": "smoothie" }
		]
	}
}

function renderAddTools(section) {
	if (getCurrentPage()?.type == "navigator") return;

	const addWrap = document.createElement("div");
	addWrap.className = "sidebar-grid";
	const addItems = [
		{"label": "page", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 406 406" fill="#000"><rect x="172" y="86" width="128" height="12"/><rect x="172" y="164" width="128" height="12"/><rect x="172" y="243" width="128" height="12"/><path d="M380 406H26V0h354v406zM38 394h330V12H38v382z"/><path d="M152 129H77v-75h75v75zm-63-12h51V66H89v51z"/><path d="M152 208H77v-75h75v75zm-63-12h51v-51H89v51z"/><path d="M152 286H77v-75h75v75zm-63-12h51v-51H89v51z"/></svg>`, },
		{"label": "navigator", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000"><path d="M0 1h14v1H0zM0 5h9v1H0zM0 9h18v1H0z"/><path d="M2.5 14L0 16.5 2.5 19 4 19 2 17h6v-1H2l2-2H2.5z"/><path d="M15.5 14L18 16.5 15.5 19 14 19l2-2h-6v-1h6l-2-2h1.5z"/></svg>`, },
		{"label": "section", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#000"><rect x="3" y="3" width="2" height="2"/><rect x="7" y="3" width="2" height="2"/><rect x="11" y="3" width="2" height="2"/><rect x="15" y="3" width="2" height="2"/><rect x="3" y="7" width="2" height="2"/><rect x="3" y="11" width="2" height="2"/><rect x="3" y="15" width="2" height="2"/><rect x="3" y="19" width="2" height="2"/><rect x="3" y="23" width="2" height="2"/><rect x="3" y="27" width="2" height="2"/><rect x="27" y="3" width="2" height="2"/><rect x="23" y="3" width="2" height="2"/><rect x="19" y="3" width="2" height="2"/><rect x="7" y="27" width="2" height="2"/><rect x="11" y="27" width="2" height="2"/><rect x="15" y="27" width="2" height="2"/><rect x="23" y="27" width="2" height="2"/><rect x="19" y="27" width="2" height="2"/><rect x="27" y="7" width="2" height="2"/><rect x="27" y="11" width="2" height="2"/><rect x="27" y="15" width="2" height="2"/><rect x="27" y="19" width="2" height="2"/><rect x="27" y="23" width="2" height="2"/><rect x="27" y="27" width="2" height="2"/><rect x="8" y="10" width="10" height="2"/><rect x="8" y="15" width="6" height="2"/></svg>`, },
		{"label": "panel", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="#000"><path d="M216 212H40a12 12 0 0 1-12-12V56a12 12 0 0 1 12-12h176a12 12 0 0 1 12 12v144a12 12 0 0 1-12 12Zm-176-160a4 4 0 0 0-4 4v144a4 4 0 0 0 4 4h176a4 4 0 0 0 4-4V56a4 4 0 0 0-4-4H40Z"/></svg>`, },
		{"label": "tabs", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489 489" fill="#000"><path d="M464 488H24c-14 0-24-9-24-22V26C0 14 10 0 24 0h440c14 0 24 14 24 26v440c0 13-10 22-24 22zM24 16c-4 0-8 5-8 10v440c0 5 6 6 8 6h440c2 0 8-1 8-6V26c0-5-4-10-8-10H24z"/><path d="M464 489H24c-15 0-24-7-24-18V36h16v434c0 1 4 2 8 2h440c4 0 8-1 8-2V122c0 0 0 0 0 0-1-1-3-1-8-1H207L154 7l15-7 48 103h247c22 0 24 13 24 18v349c0 7-10 14-24 14z"/><rect x="328" y="3" width="16" height="114"/></svg>`, },
		{"label": "image", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800" fill="#000"><path d="M1716 5H84C40 5 5 41 5 85v1632c0 44 35 79 79 79h1632c44 0 79-35 79-79V85c0-44-35-79-79-79zm0 1728H84c-9 0-17-7-17-16v-197l588-588 571 571c6 6 14 9 22 9s16-3 22-9c12-12 12-32 0-44L678 864c-6-6-14-9-22-9s-16 3-22 9L68 1430V85c0-9 7-16 16-16h1632c9 0 16 7 16 16v1333l-553-553c-2-2-5-4-8-5-12-6-27-4-37 6l-124 124c-12 12-12 32 0 44 6 6 14 9 22 9s16-3 22-9l101-101 571 571c1 1 3 2 4 3v211c0 9-7 16-16 16z"/><path d="M1089 560c0-98-79-177-177-177s-177 79-177 177 79 177 177 177 177-79 177-177zm-177 114c-63 0-114-51-114-114s51-114 114-114 114 51 114 114-51 114-114 114z"/></svg>`, },
		{"label": "table", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000"><path d="M1 21h22V3H1v18zm5-1v-3h8v3H6zm8-8H6V9h8v3zm0 1v3H6v-3h8zm8 7h-7v-3h7v3zm0-4h-7v-3h7v3zm0-4h-7V9h7v3zM2 4h20v4H2V4zm0 5h3v3H2V9zm0 4h3v3H2v-3zm0 4h3v3H2v-3z"/></svg>`, },
		{"label": "diagram", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800" fill="#000"><path d="M1765 0H35C18 0 3 14 3 31v477c0 17 15 31 32 31h1730c17 0 31-14 31-31V31c0-17-14-31-31-31zm-32 477H66V63h1667v414z"/><path d="M512 1260H35c-17 0-32 14-32 31v477c0 17 15 31 32 31h477c17 0 31-14 31-31v-477c0-17-14-31-31-31zm-32 477H66v-414h414v414z"/><path d="M1138 1260H662c-17 0-31 14-31 31v477c0 17 14 31 31 31h477c17 0 31-14 31-31v-477c0-17-14-31-31-31zm-31 477H693v-414h414v414z"/><path d="M1765 1260h-477c-17 0-31 14-31 31v477c0 17 14 31 31 31h477c17 0 31-14 31-31v-477c0-17-14-31-31-31zm-32 477h-414v-414h414v414z"/><path d="M900 594c-17 0-31 14-31 31v325H273c-17 0-32 14-32 31v193c0 17 15 32 32 32 17 0 31-15 31-32v-162h564v162c0 17 14 32 31 32s32-15 32-32v-162h564v162c0 17 15 32 32 32s31-15 31-32v-193c0-17-14-31-31-31H931V625c0-17-14-31-31-31z"/></svg>`, },
		{"label": "header", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000"><path d="M16.5 4c.06.01.12.03.17.06.07.03.12.08.17.13.07.1.11.23.11.36v11c0 .28-.22.5-.5.5s-.5-.22-.5-.5V6.7c-.58.83-1.36 1.6-2.22 2.18-.23.15-.54.09-.69-.14-.15-.23-.09-.54.14-.69C14.56 7.19 15.62 5.78 15.96 4.6l.05-.21c.01-.04.02-.08.04-.12.03-.07.08-.13.14-.18.06-.04.12-.07.19-.09.06-.01.12-.01.18 0zM9.5 4c.28 0 .5.22.5.5v11c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-5.5H3v5.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.5c0-.28.22-.5.5-.5s.5.22.5.5v4.5h6V4.5c0-.28.22-.5.5-.5z"/></svg>`, },
		{"label": "sub-header", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000"><path d="M9.5 4c.28 0 .5.22.5.5v11c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-5.5H3v5.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.5c0-.28.22-.5.5-.5s.5.22.5.5v4.5h6V4.5c0-.28.22-.5.5-.5zm5 0c1.24 0 2.4.57 3.05 1.54.66 1 .71 2.33-.13 3.72-.42.7-1.01 1.25-1.62 1.72-.2.16-.41.31-.62.45l-.44.31c-.27.18-.52.36-.78.54-1.02.75-1.79 1.52-1.96 2.72H17.5c.28 0 .5.22.5.5s-.22.5-.5.5h-6c-.28 0-.5-.22-.5-.5 0-2 1.17-3.13 2.39-4.03l.4-.28.53-.36c.31-.21.61-.41.9-.62.56-.44 1.04-.9 1.37-1.45.67-1.11.56-2.03.14-2.66C16.28 5.43 15.45 5 14.5 5c-1.44 0-2.5 1.25-2.5 2.5 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-1.75 1.45-3.5 3.5-3.5z"/></svg>`, },
		{"label": "text", "svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#000"><path d="M0 7h64v2H0zM0 17h64v2H0zM0 27h64v2H0zM0 37h64v2H0zM0 47h64v2H0zM0 57h44v2H0z"/></svg>`, },
	];
	addItems.forEach(item => {
		if (item.label == "navigator" && (guideData.content.find(e => e.type === "navigator") || guideData.content.find(e => e.type === "footer"))) return;
		const button = document.createElement("button");
		button.classList.add(item.label);
		const txt = document.createElement("span");
		txt.innerText = capitalizeString(item.label);
		const img = document.createElement('img');
		img.src = `data:image/svg+xml;base64,${btoa(item.svg)}`;
		img.alt = capitalizeString(item.label);
		addWrap.appendChild(button);
		button.appendChild(txt);
		button.appendChild(img);
		
		button.addEventListener("click", function() {addEntry(item.label)})
	});
	section.appendChild(addWrap);
}

function addEntry(type) {
	let newId = null
	switch(type) {
		case "page":
			const pageCount = guideData.content.filter(e => e.type === "page").length;
			const totalCount = guideData.content.filter(e => (e.type === "page") || (e.type === "navigator"));
			var entry = {...entryTemplates[type]};
			entry.id = crypto.randomUUID();
			newId = entry.id;
			entry.order = totalCount+1;
			entry.title = `New ${capitalizeString(type)} ${pageCount+1}`;
			guideData.content.push(entry);
			break;
		case "navigator":
			const find = guideData.content.find(e => e.type === "navigator") || guideData.content.find(e => e.type === "footer")
			if (!find) {
				const pages = guideData.content.filter(e => e.type === "page")
				const totalCount = guideData.content.filter(e => (e.type === "page") || (e.type === "navigator"))+1;
				var nav = {...entryTemplates["navigator"]};
				nav.id = crypto.randomUUID();
				newId = nav.id;
				nav.order = totalCount;
				guideData.content.push(nav);
				
				pages.forEach(page => {
					var footer = {...entryTemplates["footer"]};
					footer.id = crypto.randomUUID();
					footer.order = 9999;
					footer.parent = page.id;
					guideData.content.push(footer)
				});
			}
			break;
		case "tabs":
			var siblingCount = guideData.content.filter(e => e.parent === getCurrentPage().id).length;
			var entry = {...entryTemplates[type]};
			entry.id = crypto.randomUUID();
			newId = entry.id;
			entry.parent = getCurrentPage().id;
			entry.order = siblingCount+1;
			entry.title = `New ${capitalizeString(type)} ${siblingCount}`;
			
			Object.keys(entry.tabs).forEach(t => {
				entry.tabs[crypto.randomUUID()] = {...entry.tabs[t]};
				delete entry.tabs[t]
			});
			guideData.content.push(entry);
			break;
		default:
			var siblingCount = guideData.content.filter(e => e.parent === getCurrentPage().id).length;
			var entry = {...entryTemplates[type]};
			entry.id = crypto.randomUUID();
			newId = entry.id;
			entry.parent = getCurrentPage().id;
			entry.order = siblingCount+1;
			if (type == "section") entry.title = `New ${capitalizeString(type)} ${siblingCount}`;
			guideData.content.push(entry);
			break;
	}
	refreshSidebar();
	refreshBuild();
	if (newId !== null) {
		console.log("hi")
		document.getElementById("sidebar-element-select").value = newId
	}
	

}

function renderSelectors(section, selected) {
	const pageLabel = document.createElement("label");
	pageLabel.className = "sidebar-field";
	const pageSpan = document.createElement("span");
	pageSpan.textContent = "Page";
	const pageSelect = document.createElement("select");
	pageSelect.id = "sidebar-page-select";
	pageLabel.appendChild(pageSpan);
	pageLabel.appendChild(pageSelect);

	const elementLabel = document.createElement("label");
	elementLabel.className = "sidebar-field";
	const elementSpan = document.createElement("span");
	elementSpan.textContent = "Element";
	const elementSelect = document.createElement("select");
	elementSelect.id = "sidebar-element-select";
	elementLabel.appendChild(elementSpan);
	elementLabel.appendChild(elementSelect);

	section.appendChild(pageLabel);
	section.appendChild(elementLabel);

	const pages = getPages().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	pages.forEach(page => {
		const option = document.createElement("option");
		option.value = page.id;
		option.textContent = page.title || (`${capitalizeString(page.type)} (${page.id})`);
		pageSelect.appendChild(option);
	});

	const currentPage = getCurrentPage();
	if (currentPage) {
		pageSelect.value = currentPage.id;
		sidebarState.currentPageId = currentPage.id;
	}

	elementSelect.innerHTML = "";
	const placeholder = document.createElement("option");
	placeholder.value = "";
	placeholder.textContent = "";
	elementSelect.appendChild(placeholder);

	const selectContent = [guideData.content.find(e => e.id === currentPage?.id), ...getPageChildren(currentPage?.id)].map(entry => `${(capitalizeString(entry.type))} (${entry.id})` );
	selectContent.forEach(sel => {
		const option = document.createElement("option");
		option.value = sel?.match(/(?<=\()[^)]+(?=\))/) || sel;
		option.textContent = sel;
		elementSelect.appendChild(option);
	});

	if (selected) {
		elementSelect.value = selected.id;
		sidebarState.currentElementId = selected.id;
	}
}

function renderEditControls(section) {
	const stylesWrap = document.createElement("div");
	stylesWrap.className = "sidebar-style-groups";
	section.appendChild(stylesWrap);

	const selectedType = state.selected?.entry?.type;

	groupDefinitions.forEach(group => {
		const groupEl = document.createElement("div");
		groupEl.className = "sidebar-style-group";

		group.forEach(field => {
			if (!field || !typeOptions[selectedType]?.includes(field)) return;
			const fieldLabel = document.createElement("label");
			fieldLabel.className = "sidebar-field";
			const name = document.createElement("span");
			name.textContent = field;
			fieldLabel.appendChild(name);
			groupEl.appendChild(fieldLabel);
		
			if (field == "border") {
				const borderRow = document.createElement("div");
				borderRow.className = "sidebar-inline";
				const borderWidth = document.createElement("input");
				borderWidth.type = "text";
				borderWidth.placeholder = "Width";
				borderWidth.dataset.field = "border-width";
				borderWidth.value = state.selected?.entry?.style?.["border-width"] || "";
				
				const borderStyle = createSelect("border-style", selectOptions["border-style"], (state.selected?.entry?.style?.["border-style"] || ""));
				const borderColor = document.createElement("input");
				borderColor.type = "text";
				borderColor.placeholder = "Color";
				borderColor.dataset.field = "border-color";
				borderColor.value = state.selected?.entry?.style?.["border-color"] || "";
				borderRow.appendChild(borderWidth);
				borderRow.appendChild(borderStyle);
				borderRow.appendChild(borderColor);
				fieldLabel.appendChild(borderRow);
			}
			else if (field == "text") {
				const input = document.createElement("textarea");
				input.dataset.field = "text";
				input.value = state.selected?.entry?.text || "";
				fieldLabel.appendChild(input);

				const wrap = document.createElement("div");
				fieldLabel.appendChild(wrap);

				const btns = [
					{"label": "bold", "html": "<b>B</b>"},
					{"label": "italic", "html": "<i>I</i>"},
					{"label": "underline", "html": "<u>U</u>"},
					{"label": "strike", "html": "<s>S</s>"},
					{"label": "super", "html": "A<sup>2</sup>"},
					{"label": "quote", "html": '"'},
					{"label": "code", "html": "<>"},
					{"label": "link", "html": "🔗"},
				]

				btns.forEach(btn => {
					const boldBtn = document.createElement("button");
					boldBtn.innerHTML = btn.html;
					boldBtn.classList.add(btn.label)
					wrap.appendChild(boldBtn);
					boldBtn.addEventListener("click",function() {addTextStyle(btn.label)})
				});

				function addTextStyle(type) {
					const input = 0;
					const fullText = 0;
					const selectPos = {"start": 0, "end": 0};
					const selectedText = 0;

					const invalidText = ["{","}","|"]
					if (invalidText.some(c => selectedText.includes(c))) return;

					switch(type) {
						case "bold":
						case "italic":
						case "underline":
						case "strike":
						case "super":
						case "quote":
						case "code":
							underline
							input.value = fullText.replace(selectedText,`{[${selectedText}]|${type}:true}`);
							break;
						case "link":
							let requestUrl = handleLinkRequest();
							input.value = fullText.replace(selectedText,`{[${selectedText}]|url:${requestUrl}`);
						default:
							break;
					}

					function handleLinkRequest() {
						return "#test"
					}
				}
			}
			else if (field == "order") {
				const input = document.createElement("input");
				input.type = "number";
				input.dataset.field = field;
				input.min = 1;
				input.max = getEntryFamily(state.selected.entry).filter(e => e.order !== 9999 && e.order !== -1).length - 1;
				input.value = state.selected.entry.order || "";
				input.disabled = (input.value == 9999 || input.value == -1)
				fieldLabel.appendChild(input);

				const wrap = document.createElement("div")
				wrap.className = "order-wrapper"
				fieldLabel.appendChild(wrap);

				const firstText = document.createElement("span");
				firstText.textContent = "First: ";
				wrap.appendChild(firstText)
				const firstCheck = document.createElement("input");
				firstCheck.type = "checkbox";
				firstCheck.name = "order-radio";
				firstCheck.id = "order-radio-first";
				firstCheck.checked = state.selected.entry.order == -1 ? true : false;
				wrap.appendChild(firstCheck);


				const lastText = document.createElement("span");
				lastText.textContent = "Last: ";
				wrap.appendChild(lastText)
				const lastCheck = document.createElement("input");
				lastCheck.type = "checkbox";
				lastCheck.name = "order-radio";
				lastCheck.id = "order-radio-last";
				lastCheck.checked = state.selected.entry.order == 9999 ? true : false;
				wrap.appendChild(lastCheck);

				firstCheck.addEventListener("change", function() {
					handleFirstLastOrderInput(this, lastCheck, input);
				});
				lastCheck.addEventListener("change", function() {
					handleFirstLastOrderInput(this, firstCheck, input);
				});
				input.addEventListener("change",() => {updateOrder(input,state.selected.entry)})
				
				function handleFirstLastOrderInput(currentCheck, siblingCheck, orderInput) {
					siblingCheck.checked = !currentCheck.checked;
					state.selected.entry.order = currentCheck.checked ? (currentCheck.id === "order-radio-first" ? -1 : 9999) : getEntryFamily(state.selected.entry).filter(e => e.order !== 9999 && e.order !== -1).length+1;
					orderInput.disabled = currentCheck.checked;
	
					updateOrder(orderInput, state.selected.entry);
				}
				
			}
			else if (field == "parent") {
				const currentPage = getCurrentPage();
				const selectContent = [guideData.content.find(e => e.id === currentPage?.id), ...getPageChildren(currentPage?.id)].map(entry => `${(capitalizeString(entry.type))} (${entry.id})` );
		
				const select = document.createElement("select");
				select.dataset.field = field;
				const emptyOption = document.createElement("option");
				emptyOption.value = "";
				emptyOption.textContent = "";
				select.appendChild(emptyOption);
				selectContent.forEach(sel => {
					const option = document.createElement("option");
					option.value = sel?.match(/(?<=\()[^)]+(?=\))/) || sel;
					option.textContent = sel;
					select.appendChild(option);
				});
				select.value = (state.selected?.entry?.[field] || "");
				fieldLabel.appendChild(select);
			}
			else if (selectOptions[field]) {
				const select = createSelect(field, selectOptions[field], (allOptions[field] == "style" ? (state.selected?.entry?.style?.[field] || "") : allOptions[field] == "key" ? (state.selected?.entry?.[field] || "") : ""));
				fieldLabel.appendChild(select);
			}
			else {
				const input = document.createElement("input");
				input.type = "text";
				input.dataset.field = field;
				input.value = allOptions[field] == "style" ? (state.selected?.entry?.style?.[field] || "") : allOptions[field] == "key" ? (state.selected?.entry?.[field] || "") : ""
				input.dataset.oldValue = input.value;
				fieldLabel.appendChild(input);
			}
			
		});

		stylesWrap.appendChild(groupEl);
	});

	const actionRow = document.createElement("div");
	actionRow.className = "sidebar-actions";
	const removeButton = document.createElement("button");
	removeButton.type = "button";
	removeButton.dataset.action = "remove";
	removeButton.textContent = "Remove";
	const cloneButton = document.createElement("button");
	cloneButton.type = "button";
	cloneButton.dataset.action = "clone";
	cloneButton.textContent = "Clone";
	actionRow.appendChild(removeButton);
	actionRow.appendChild(cloneButton);
	section.appendChild(actionRow);

	removeButton.addEventListener("click", removeEntry)
	cloneButton.addEventListener("click", cloneEntry)

}

function refreshSidebar() {
	if (!sidebar) return;
	clearSidebar();

	const selectorSection = document.createElement("section");
	selectorSection.className = "sidebar-section";
	selectorSection.dataset.section = "selectors";
	renderSelectors(selectorSection, state.selected?.element);

	const addSection = document.createElement("section");
	addSection.className = "sidebar-section";
	addSection.dataset.section = "add-tools";
	renderAddTools(addSection);

	const editSection = document.createElement("section");
	editSection.className = "sidebar-section";
	editSection.dataset.section = "edit-tools";
	renderEditControls(editSection);

	if (state.selected?.element) {
		addSection.hidden = true;
	} else {
		editSection.hidden = true;
	}

	sidebar.appendChild(selectorSection);
	sidebar.appendChild(addSection);
	sidebar.appendChild(editSection);

	addFieldEventListeners();
	addMiscEventListeners();
}

function addFieldEventListeners() {
	const fields = document.querySelector("#sidebar").querySelectorAll(".sidebar-field > input[type=number][data-field], .sidebar-field > input[type=text][data-field], .sidebar-field > select[data-field], .sidebar-field > textarea[data-field]");

	fields.forEach(element => {
		switch (element?.dataset?.field || element.id) {
			case "id":
				element.addEventListener("change", function() { handleIdChange(this) });
			case undefined:
				break;
			default:
				element.addEventListener("change", refreshBuild);
				element.addEventListener("change", function() { handleFieldChange(element) });
				break;
		}
	});

	function handleFieldChange(element) {
		if (!state.selected) return;
		if (!element?.dataset?.field) return;

		switch (allOptions[element.dataset.field]) {
			case "style":
				state.selected.entry.style = state.selected.entry.style || {}
				state.selected.entry.style[element.dataset.field] = element.value;
				element.value === "" && (delete state.selected?.entry?.style?.[element.dataset.field]);
			case "key":
				state.selected.entry[element.dataset.field] = !isNaN(Number(element.value)) ? Number(element.value) : element.value;
				element.value === "" && (delete state.selected?.entry?.[element.dataset.field]);
			default:
				break;
		}
		
	}

	function handleIdChange(element) {
		const oldValue = element.dataset.oldValue;
		const newValue = element.value;

		guideData.content.filter(e => e.parent === oldValue).forEach(e => { e.parent = newValue; });
	}
			

}

function addMiscEventListeners() {
	
	document.getElementById("sidebar-page-select").addEventListener("change", function() {handlePageSelect(this)});
	document.getElementById("sidebar-element-select").addEventListener("change", function() {handleElementSelect(this)});

	function handlePageSelect(_this) {
		if (_this.value) {
			changePage(_this.value);
			refreshSidebar();
		}
	}
	function handleElementSelect(_this) {
		const val = _this.value;
		const element = val ? document.getElementById(val) : null;
		if (element) {
			selectTarget(element, { allowIgnored: true });
		} else {
			clearSelection();
		}
	}
}

function refreshBuild() {
	buildData(guideData);

	const newSelected = state.selected?.element.id ? document.getElementById(state.selected?.element.id) : null;
	if (newSelected) {
		selectTarget(newSelected);
	} else {
		clearSelection();
	}
}

function openMenu(x, y) {
	const hasSelection = !!state.selected?.element;
	const removeButton = menu.querySelector("button[data-action='remove']");
	if (removeButton) removeButton.hidden = !hasSelection;
	menu.style.display = "flex";
	menu.style.left = `${x}px`;
	menu.style.top = `${y}px`;

	const padding = 8;
	const rect = menu.getBoundingClientRect();
	const maxLeft = window.innerWidth - rect.width - padding;
	const maxTop = window.innerHeight - rect.height - padding;
	const nextLeft = Math.max(padding, Math.min(x, maxLeft));
	const nextTop = Math.max(padding, Math.min(y, maxTop));

	menu.style.left = `${nextLeft}px`;
	menu.style.top = `${nextTop}px`;
}



function clearSelection() {
	if (state.selected?.element) {
		state.selected?.element.classList.remove("editor-selected");
	}
	state.selected = null;
	updateSidebarSide();
	refreshSidebar();
}



function selectTarget(el, options = {}) {
	if (!el || !el.id) return;
	if (!getElementType(el)) return;
	if (!options.allowIgnored && isIgnoredElement(el)) return;
	if (state.selected?.element && state.selected?.element !== el) {
		state.selected?.element.classList.remove("editor-selected");
	}
	const entry = guideData.content.find(item => item.id === el.id);
	if (!entry) return;

	const page = el.closest('#content > *');
	if (page && !page.hasAttribute('data-page-open')) {
		changePage(page.id);
	}

	state.selected = {};
	state.selected.element = el;
	state.selected.entry = entry;
	
	el.classList.add("editor-selected");
	updateSidebarSide();
	refreshSidebar();
}

function computeSidebarSide() {
	if (!state.selected) return "right";
	const rect = state.selected?.element.getBoundingClientRect();
	const midpoint = rect.left + rect.width / 2;
	return midpoint > window.innerWidth / 2 ? "left" : "right";
}

function updateSidebarSide() {

	const newSide = computeSidebarSide();

	if (newSide != document.body.dataset.sidebarSide) {
		document.getElementById("sidebar").classList.add('disable-anim');
		setTimeout(() => {
			document.getElementById("sidebar").classList.remove('disable-anim');
		}, 100);
	}

	document.body.dataset.sidebarSide = computeSidebarSide();

}

menu.addEventListener("click", (e) => {
	e.stopPropagation();
	const action = e.target.closest("button")?.dataset.action;
	if (!action) return;

	if (action === "edit") {
		ensureSidebarOpen();
	}

	if (action === "remove") {
		removeEntry(state.selected?.element);
	}

	if (action === "close") {
		closeMenu();
		closeSidebar();
		return;
	}

	closeMenu();
});

function removeEntry() {
	if (state.selected && confirm("Remove this element?")) {
		guideData.content = guideData.content.filter(e => e.id != state.selected.entry.id);
		buildData(guideData);

		clearSelection();
	}
}
function cloneEntry() {
	if (state.selected && confirm("Duplicate this element?")) {
		
	}
}

document.addEventListener("mousedown", (e) => {
	if (!isEditor()) return;
	if (e.button === 2) return;
	if (menu.style.display === "flex" && !e.target.closest("#editor-context-menu")) {
		closeMenu();
	}
}, true);

document.addEventListener("contextmenu", (e) => {
	if (!isEditor()) return;
	if (e.altKey) return;
	const el = getSelectableTarget(e.target.closest("#content *"));
	if (!el || !el.id) return;
	e.preventDefault();
	selectTarget(el);
	openMenu(e.clientX, e.clientY);
});

document.addEventListener("click", (e) => {
	if (!isEditor()) return;
	if (e.target.closest("#editor-context-menu")) return;
	const inSidebar = e.target.closest("#sidebar");
	const inHeader = e.target.closest("header");
	const inContent = e.target.closest("#content");
	if (!inContent) {
		if (!inSidebar && !inHeader) {
			clearSelection();
			closeMenu();
		}
		return;
	}

	if (state.selected?.element && !state.selected?.element.contains(e.target)) {
		clearSelection();
	}

	const el = getSelectableTarget(e.target.closest("#content *"));
	if (!el || !el.id) return;
	selectTarget(el);
	closeMenu();
});


document.addEventListener("keydown", (e) => {
	if (e.key !== "Escape") return;
	clearSelection();
	closeMenu();
});



function isIgnoredElement(el) {
	if (!el) return false;
	return Object.entries(ignoredElements).some(([className, mode]) => {
		if (mode === "element") {
			return el.classList.contains(className);
		}
		return !!el.closest(`.${className}`);
	});
}




if (sidebar) {

	// Make Enter key trigger blur (update) for sidebar fields
	sidebar.addEventListener("keydown", (e) => {
		const target = e.target;
		if (!target.closest("#sidebar")) return;
		// For textarea, only blur on Enter if not Shift+Enter
		if (target.tagName === "TEXTAREA") {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				target.blur();
			}
		} else if ((target.tagName === "INPUT" || target.tagName === "SELECT") && e.key === "Enter") {
			e.preventDefault();
			target.blur();
		}
	});
}


function updateOrder(input, entry) {
	if (entry.order === -1 || entry.order === 9999) return;
	
    const family = getEntryFamily(entry).filter(e => e.order !== 9999 && e.order !== -1);
    const newOrder = entry.order;
    input.max = family.length - 1;

    // Get all entries except the one we're moving
    const otherEntries = family.filter(e => e.id !== entry.id);
    
    // Sort them by current order
    otherEntries.sort((a, b) => a.order - b.order);
    
    // Build the new order array
    const result = [];
    let otherIndex = 0;
    
    for (let position = 1; position <= family.length; position++) {
        if (position === newOrder) {
            // Place our entry here
            result.push(entry);
        } else if (otherIndex < otherEntries.length) {
            // Place the next other entry
            const otherEntry = otherEntries[otherIndex];
            result.push(otherEntry);
            otherIndex++;
        }
    }
    
    // If we haven't placed our entry yet (newOrder was out of bounds),
    // add it at the end
    if (!result.includes(entry)) {
        result.push(entry);
    }
    
    // Now update all orders based on their position in the result array
    result.forEach((item, index) => {
        guideData.content.find(i => i.id === item.id).order = index + 1; // 1-based
    });
    
}

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

		guideData = test_data;
		buildData();
		
		refreshSidebar();
		selectTarget(document.getElementById(document.getElementById("sidebar-element-select")?.value), { allowIgnored: true });
	}
}

function buildData() {
	document.body.dataset.edited = true;
	document.getElementById("content").innerHTML = "";

	const data = guideData.content.filter(e => e.type === "page" || e.type === "navigator").flatMap(page => [page, ...getPageChildren(page.id)]);
	data.forEach(content => {
		const base = content.parent && (document.getElementById(`${content.parent}`)) || document.getElementById("content")
		base.innerHTML += buildContent(content)
	});

	changePage(document.querySelector("#content > .page")?.id)
	renderDiagrams();
}

