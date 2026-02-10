const state = {
	selected: null,
	startX: 0,
	startY: 0,
	startW: 0,
	startH: 0,
};
const ignoredElements = {
	//"page": "element",
	//"navigator": "closest",
};
const allOptions = {
	"order": "key",
	"id": "key",
	"text": "key",
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
	"border-width": "style",
	"border-style": "style",
	"border-color": "style",
	"border-radius": "style",
	"color": "style",
	"font-size": "style",
	"box-shadow": "style",
	"text-shadow": "style",
	"font-weight": "style",
	"font-style": "style",
	"display": "style",
	"src": "key",
	"flex-direction": "style",
	"flex-wrap": "style",
	"align-content": "style",
	"justify-content": "style",
	"align-items": "style",
	"clear": "style",
	"justify-self": "style",
	"align-self": "style",
	"row": "key",
	"colspan": "key",
	"rowspan": "key",
};


const groupDefinitions = [
	["width", "height", "min-width", "min-height", "max-width", "max-height", "aspect-ratio"],
	["margin", "padding"],
	["background"],
	["text", "color", "font-size", "font-weight", "font-style", "text-align", "text-shadow"],
	["src"],
	["display", "flex-direction", "flex-wrap", "align-content", "justify-content", "align-items", "justify-self", "align-self", "float", "clear",],
	["object-fit"],
	["border", "border-radius", "box-shadow"],
	["parent","id","order"],
];

const typeOptions = {
	"page": [
		"order",
		"id",
		"background",
		"color",
		"padding",
	],
	"navigator": [
		"order",
		"id",
	],
	"section": [
		"order",
		"id",
		"parent",
		"width",
		"max-width",
		"height",
		"max-height",
		"padding",
		"margin",
		"background",
		"border",
		"border-radius",
	],
	"panel": [
		"order",
		"id",
		"parent",
		"text-align",
		"display",
		"flex-direction",
		"flex-wrap",
		"align-content",
		"justify-content",
		"align-items",
		"justify-self",
		"align-self",
		"float",
		"clear",
		"padding",
		"margin",
		"background",
		"border",
		"border-radius",
		"box-shadow",
		"width",
		"max-width",
		"height",
		"max-height",
	],
	"tabs": [
		"order",
		"id",
		"parent",
		"width",
		"max-width",
		"height",
		"max-height",
	],
	"tab": [
		"order",
		"id",
		"width",
		"height",
	],
	"image": [
		"order",
		"id",
		"parent",
		"src",
		"width",
		"max-width",
		"height",
		"max-height",
		"display",
		"flex-direction",
		"flex-wrap",
		"align-content",
		"justify-content",
		"align-items",
		"justify-self",
		"align-self",
		"float",
		"clear",
		"object-fit",
		"border",
		"border-radius",
	],
	"table": [
		"order",
		"id",
		"parent",
		"width",
		"max-width",
		"height",
		"max-height",
		"border",
		"border-radius",
	],
	"table-cell": [
		"order",
		"id",
		"row",
		"text",
		"colspan",
		"rowspan",
	],
	"diagram": [
		"order",
		"id",
		"parent",
		"width",
		"max-width",
		"height",
		"max-height",
	],
	"sub-header": [
		"order",
		"id",
		"parent",
		"text",
		"color",
		"font-size",
		"font-weight",
		"font-style",
		"text-align",
		"text-shadow",
	],
	"header": [
		"order",
		"id",
		"parent",
		"text",
		"color",
		"font-size",
		"font-weight",
		"font-style",
		"text-align",
		"text-shadow",
	],
	"text": [
		"order",
		"id",
		"parent",
		"text",
		"color",
		"font-size",
		"font-weight",
		"font-style",
		"text-align",
		"text-shadow",
	],
	"footer": [
		"id",
		"width",
		"max-width",
		"height",
		"max-height",
		"padding",
		"margin",
		"background",
		"border",
		"border-radius",
	]
};

const selectOptions = {
	"border-style": ["none", "solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "hidden"],
	"display": ["block", "inline", "inline-block", "inline-flex", "flex", "grid", "inline-grid", "none", "inherit", "initial", "unset"],
	"float": ["none", "left", "right", "inline-start", "inline-end"],
	"clear": ["none", "left", "right", "both", "inline-start", "inline-end"],
	"align-items": ["stretch", "flex-start", "flex-end", "center", "baseline"],
	"align-content": ["baseline", "center", "end", "flex-end", "flex-start","normal","space-around","space-between","space-evenly","start","stretch"],
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
	"tab",
	"table",
	"table-cell",
	"diagram",
	"image",
	"header",
	"sub-header",
	"text",
	"footer",
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
	"navigator": {
		"type": "navigator",
		"title": "Navigator",
		"order": -1,
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
		"text": "Example normal text.",
	},
	"header": {
		"type": "header",
		"text": "Example header text."
	},
	"sub-header": {
		"type": "sub-header",
		"text": "Example sub-header text."
	},
	"image": {
		"type": "image",
		"src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTA1IiBoZWlnaHQ9IjMzNSIgdmlld0JveD0iMCAwIDUwNSAzMzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwNSIgaGVpZ2h0PSIzMzUiIGZpbGw9IiNjZmQ2ZGEiPjwvcmVjdD48cGF0aCBkPSJNIDAgMjMwQyA2MCAxNzAsIDEyMCAxNzAsIDE4MCAyNDBDIDI1MCAzMzAsIDM2MCAxMjAsIDUwNSAyMzBMIDUwNSAzMzVMIDAgMzM1WiIgZmlsbD0iI2Y2ZjdmNyI+PC9wYXRoPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjE1MCIgcj0iMTgiIGZpbGw9IiNmNmY3ZjciPjwvY2lyY2xlPjwvc3ZnPg==",
		"caption": "Example Image Caption Text",
	},
	"tabs": {
		"type": "tabs",
	},
	"tab": {
		"type": "tab",
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

	const header = document.createElement("h4");
	header.textContent = "Add";
	section.appendChild(header)

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
		//if (item.label == "navigator" && (guideData.content.find(e => e.type === "navigator") || guideData.content.find(e => e.type === "footer"))) return;
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
			var pageCount = guideData.content.filter(e => e.type === "page").length;
			var totalCount = guideData.content.filter(e => (e.type === "page") || (e.type === "navigator"));
			var entry = {...entryTemplates[type]};
			entry.id = crypto.randomUUID();
			newId = entry.id;
			entry.order = totalCount+1;
			entry.title = `New ${capitalizeString(type)} ${pageCount+1}`;
			guideData.content.push(entry);
			break;
		case "navigator":
			if (guideData.content.find(e => e.type === "navigator")) { alert("Navigator already exists."); return; }
			
			guideData.content = guideData.content.filter(e => e.type !== "footer");

			var pages = guideData.content.filter(e => e.type === "page")
			var nav = {...entryTemplates["navigator"]};
			nav.id = crypto.randomUUID();
			newId = nav.id;
			guideData.content.push(nav);
			
			pages.forEach(page => {
				var footer = {...entryTemplates["footer"]};
				footer.id = crypto.randomUUID();
				footer.order = 9999;
				footer.parent = page.id;
				guideData.content.push(footer)
			});
			
			break;
		case "tabs":
			var siblingCount = guideData.content.filter(e => e.parent === getCurrentPage().id).length;
			var entry = {...entryTemplates[type]};
			entry.id = crypto.randomUUID();
			newId = entry.id;
			entry.parent = getCurrentPage().id;
			entry.order = siblingCount+1;
			guideData.content.push(entry);

			const tabs = ["Example Tab 1", "Example Tab 2", "Example Tab 3"]
			tabs.forEach((tab, i) => {
				var tabEntry = {...entryTemplates["tab"]};
				tabEntry.id = crypto.randomUUID();
				tabEntry.parent = entry.id;
				tabEntry.order = i+1;
				tabEntry.title = tab;
				guideData.content.push(tabEntry);

				var textEntry = {...entryTemplates["text"]};
				textEntry.id = crypto.randomUUID();
				textEntry.parent = tabEntry.id;
				textEntry.order = 1;
				textEntry.text = tab;
				guideData.content.push(textEntry);
			})
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
	saveGuide();
	
	if (newId !== null) {
		document.getElementById("sidebar-element-select").value = newId
		handleElementSelect(document.getElementById("sidebar-element-select"))
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
		option.textContent = page.title;
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
			fieldLabel.classList.add("sidebar-field");
			fieldLabel.classList.add(field);
			const name = document.createElement("span");
			name.textContent = field;
			fieldLabel.appendChild(name);
			groupEl.appendChild(fieldLabel);
		
			if (field == "border") {
				const borderRow = document.createElement("div");
				borderRow.className = "sidebar-inline";
				fieldLabel.appendChild(borderRow);

				const borderWidth = document.createElement("input");
				borderWidth.type = "text";
				borderWidth.id = crypto.randomUUID();
				borderWidth.placeholder = "Width";
				borderWidth.dataset.field = "border-width";
				borderWidth.value = state.selected?.entry?.style?.["border-width"] || "";
				borderRow.appendChild(borderWidth);
				
				const borderStyle = createSelect("border-style", selectOptions["border-style"], (state.selected?.entry?.style?.["border-style"] || ""));
				borderRow.appendChild(borderStyle);

				const borderColor = document.createElement("input");
				borderColor.type = "text";
				borderColor.id = crypto.randomUUID();
				borderColor.dataset.field = "border-color";
				borderColor.value = state.selected?.entry?.style?.["border-color"] || "";
				borderRow.appendChild(borderColor);

				const colorPicker = document.createElement("input");
				colorPicker.type = "color";
				colorPicker.id = crypto.randomUUID();
				colorPicker.value = borderColor.value;
				borderRow.appendChild(colorPicker);

				colorPicker.addEventListener("change", function() {
					borderColor.value = this.value;
					handleFieldChange(borderColor.value,borderColor.dataset.field);
				})
				borderColor.addEventListener("change", function() {
					this.value != "" && (this.value = normalizeColor(this.value));
					colorPicker.value = this.value;
				})
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
					{"label": "super", "html": "<span>A</span><sup>2</sup>"},
					//{"label": "quote", "html": '"'},
					//{"label": "code", "html": "<>"},
					{"label": "link", "html": ("<img src='data:image/svg+xml;base64,"+btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 836.7 836.7"><path d="M648.4 228.1h-66.6c-4.5 0-8.9 1.8-12.1 5-3.2 3.2-5 7.5-5 12.1v54.1c0 4.5 1.8 8.9 5 12.1 3.2 3.2 7.6 5 12.1 5l66.6-.2c55.4 0 100.2 44.9 100.2 100.2v2.9c0 55.4-44.9 100.2-100.2 100.2H397.1v-146c0-4.5-1.8-8.9-5-12.1-3.2-3.2-7.5-5-12.1-5h-54c-4.5 0-8.9 1.8-12.1 5-3.2 3.2-5 7.5-5 12.1v214.2c0 11 9 20 20 20h319.4c50.3 0 97.6-19.6 133.2-55.2s55.2-82.9 55.2-133.2v-2.9c0-50.3-19.6-97.6-55.2-133.2S698.7 228.1 648.4 228.1zM255 520.4l-66.6.2c-55.4 0-100.2-44.9-100.2-100.2v-2.9c0-55.4 44.9-100.2 100.2-100.2h251.2v146.1c0 4.5 1.8 8.9 5 12.1 3.2 3.2 7.5 5 12.1 5h54c4.5 0 8.9-1.8 12.1-5 3.2-3.2 5-7.5 5-12.1V249.1c0-11-9-20-20-20H188.4c-50.3 0-97.6 19.6-133.2 55.2C19.6 319.8 0 367 0 417.4v2.9c0 50.3 19.6 97.6 55.2 133.2s82.9 55.2 133.2 55.2H255c4.5 0 8.9-1.8 12.1-5 3.2-3.2 5-7.5 5-12.1v-54.1c0-4.5-1.8-8.9-5-12.1-3.2-3.2-7.6-5-12.1-5z"/></svg>')+"' />")},
					{"label": "size", "html": "<span class='small'>A</span><span class='large'>A</span>"},
					{"label": "color", "html": "<span class='color1'>A</span><span class='color2'>A</span>"},
				]

				const dropdownId = crypto.randomUUID();

				const dropdown = document.createElement("div");
				dropdown.classList.add("dropdown");
				dropdown.id = dropdownId;
				wrap.appendChild(dropdown);

				const dropHeader = document.createElement("strong");
				dropHeader.textContent = "";
				dropdown.appendChild(dropHeader);

				const dropWrap = document.createElement("span");
				dropdown.appendChild(dropWrap);

				const dropInputRadio = document.createElement("input");
				dropInputRadio.type = `radio`
				dropInputRadio.id = `dropdown-radio-input`
				dropInputRadio.name = `dropdown-radio-${dropdownId}`
				dropInputRadio.checked = true;
				dropWrap.appendChild(dropInputRadio);

				const dropInput = document.createElement("input");
				dropInput.type = "text";
				dropInput.id = `dropdown-input`
				dropWrap.appendChild(dropInput);

				const dropSelectRadio = document.createElement("input");
				dropSelectRadio.type = `radio`
				dropSelectRadio.id = `dropdown-radio-select`
				dropSelectRadio.name = `dropdown-radio-${dropdownId}`
				dropWrap.appendChild(dropSelectRadio);

				const dropSelect = document.createElement("select");
				dropSelect.id = `dropdown-select`
				dropWrap.appendChild(dropSelect);

				const emptyOption = document.createElement("option");
				emptyOption.value = "";
				emptyOption.textContent = "";
				dropSelect.appendChild(emptyOption);

				dropInputRadio.addEventListener("change", handleDropdownRadio)
				dropSelectRadio.addEventListener("change", handleDropdownRadio)

				function handleDropdownRadio() {
					dropInput.disabled = !dropInputRadio.checked;
					dropSelect.disabled = !dropSelectRadio.checked;
				}
				handleDropdownRadio();

				const entries = guideData.content.filter(e => e.type === "page").flatMap(page => {
					const pageContent = guideData.content.find(e => e.id === page.id);
					const pageChildren = getPageChildren(page.id);
					return [pageContent, ...pageChildren]
				});

				entries.forEach(entry => {
					const dropOption = document.createElement("option");
					dropOption.value = `#${entry.id}`;
					dropOption.textContent = `${(capitalizeString(entry.type))} (${entry.id})`;
					dropSelect.appendChild(dropOption);
				})

				const dropApply = document.createElement("button");
				dropApply.textContent = "Apply";
				dropApply.classList.add("btn");
				dropApply.classList.add("btn-primary");
				dropdown.appendChild(dropApply);

				dropApply.addEventListener("click", function() {
					const field = this.parentElement?.dataset?.field
					input.focus();
					addTextStyle(field);
					input.focus();
					dropdown.dataset.open = "false";
					dropdown.querySelectorAll("input[type='text'], select").forEach(el => el.value = "");
				});

				document.addEventListener('click', function(event) {
					// Check if click is outside the dropdown AND outside the buttons that open it
					const isClickInsideDropdown = dropdown.contains(event.target);
					const isClickOnDropdownButton = event.target.closest('#sidebar button.link') || event.target.closest('#sidebar button.size') || event.target.closest('#sidebar button.color') || event.target.closest('#sidebar .sidebar-field:has(.dropdown) > textarea');
					
					if (!isClickInsideDropdown && !isClickOnDropdownButton) {
						dropdown.dataset.open = "false";
						dropdown.querySelectorAll("input[type='text'], select").forEach(el => el.value = "");
					}
				});

				btns.forEach(btn => {
					const element = document.createElement("button");
					element.innerHTML = btn.html;
					element.classList.add(btn.label)
					wrap.appendChild(element);

					switch (btn.label) {
						case "link":
						case "size":
						case "color":
							element.addEventListener("click",function() {
								const dropdown = this.parentElement?.querySelector(".dropdown");
								dropdown.dataset.open = dropdown.dataset.open != "true" || (dropdown.dataset.field != btn.label);
								dropdown.dataset.field = btn.label;
								
								dropdown.querySelectorAll("input[type='text'], select").forEach(el => el.value = "");
								dropdown.querySelector(":scope > strong").textContent = `Set ${capitalizeString(btn.label)}`;
								
								if (btn.label == "link") {
									dropSelectRadio.checked = true;
								}
								else {
									dropInputRadio.checked = true;
								}
								
								handleDropdownRadio();
							});
							break;
						default:
							element.addEventListener("click",function() {
								input.focus();
								addTextStyle(btn.label)
								input.focus();
							})
							break;
					}
				});

				function addTextStyle(type) {
					const input = document.activeElement;
					const fullText = input?.value;
					const selectPos = {"start": input?.selectionStart, "end": input?.selectionEnd};
					const selectedText = fullText.substring(selectPos?.start, selectPos?.end);
					if (!input || !fullText || typeof selectPos.start !== 'number' || typeof selectPos.end !== 'number' || !selectedText) return;

					if (selectedText.includes("{") && !selectedText.includes("}")) return;
					if (selectedText.includes("}") && !selectedText.includes("{")) return;
					if (selectedText.includes("[") && !selectedText.includes("]")) return;
					if (selectedText.includes("]") && !selectedText.includes("[")) return;
					
					let attr = type;

					const requestData = dropdown.querySelector("input[type='radio']:checked ~ *")?.value;

					if (!requestData && ['link','size','color'].includes(type)) return;

					switch (type) {
						case "link":
						case "size":
						case "color":
							attr = `${type}:'${requestData}'`;
							break;
						default:
							break;
					}
				
					let attributes = attr;
					let text = selectedText;

					if (selectedText.startsWith("{") && selectedText.endsWith("}")) {
						let matched_attr = selectedText.match(/\|([^|}]*)}?$/)?.[1].split(/[,;]/);

						if (matched_attr) {
							const removeAttr = matched_attr.some(a => a == attr);
							const matched_text = selectedText.match(/^\{\[([\S\s]*)\]\|/)?.[1];
							let combined_attr = [
								...(!removeAttr ? [attr] : []),
								...(!removeAttr ? [matched_attr] : [matched_attr.filter(a => a !== attr)]),
							];
							combined_attr = [...new Set(combined_attr)]?.join(";");

							text = matched_text;
							attributes = combined_attr;
						}
					}

					input.value = 
					fullText.substring(0, selectPos.start) +
					(attributes ? (`{[${text}]|${attributes}}`) : text) +
					fullText.substring(selectPos.end);
			

					handleFieldChange(input.value,input.dataset.field);
				}
			}
			else if (field == "order") {
				const input = document.createElement("input");
				input.type = "number";
				input.id = crypto.randomUUID();
				input.dataset.field = field;
				input.min = 1;
				input.max = getEntryFamily(state.selected.entry).filter(e => e.order !== 9999 && e.order !== -1).length;

				input.value = state.selected.entry.order || "";
				input.disabled = (input.value == 9999 || input.value == -1)
				fieldLabel.appendChild(input);

				const wrap = document.createElement("div")
				wrap.className = "order-wrapper"
				fieldLabel.appendChild(wrap);

				const firstLabel = document.createElement("label");
				firstLabel.innerHTML = "<span>First</span>";
				firstLabel.for = "order-radio-first";
				wrap.appendChild(firstLabel)

				const firstCheck = document.createElement("input");
				firstCheck.type = "checkbox";
				firstCheck.name = "order-radio";
				firstCheck.id = "order-radio-first";
				firstCheck.checked = state.selected.entry.order == -1 ? true : false;
				firstLabel.appendChild(firstCheck);

				const lastLabel = document.createElement("label");
				lastLabel.innerHTML = "<span>Last</span>";
				lastLabel.for = "order-radio-last";
				wrap.appendChild(lastLabel)

				const lastCheck = document.createElement("input");
				lastCheck.type = "checkbox";
				lastCheck.name = "order-radio";
				lastCheck.id = "order-radio-last";
				lastCheck.checked = state.selected.entry.order == 9999 ? true : false;
				lastLabel.appendChild(lastCheck);

				firstCheck.addEventListener("change", function() {
					handleFirstLastOrderInput(this, lastCheck, input);
				});
				lastCheck.addEventListener("change", function() {
					handleFirstLastOrderInput(this, firstCheck, input);
				});
				input.addEventListener("change",() => {
					updateOrder(input,state.selected.entry);
				})
				
				function handleFirstLastOrderInput(currentCheck, siblingCheck, orderInput) {
					currentCheck.checked && (siblingCheck.checked = false);
					state.selected.entry.order = currentCheck.checked ? (currentCheck.id === "order-radio-first" ? -1 : 9999) : getEntryFamily(state.selected.entry).filter(e => e.order !== 9999 && e.order !== -1).length+1;
					orderInput.disabled = currentCheck.checked;
	
					updateOrder(orderInput, state.selected.entry);
					
		

					
					if (!currentCheck.checked) {
						handleFieldChange(orderInput.value,orderInput.dataset.field);
						return;
					};

					if (currentCheck.id == "order-radio-first") {
						handleFieldChange(-1,orderInput.dataset.field);
					}
					else if (currentCheck.id == "order-radio-last") {
						handleFieldChange(9999,orderInput.dataset.field);
					}

					
				}
				
			}
			else if (field == "parent") {
				const currentPage = getCurrentPage();
				const selectContent = [guideData.content.find(e => e.id === currentPage?.id), ...getPageChildren(currentPage?.id,state.selected?.entry.id)].filter(e => ["page","panel","section","tab"].includes(e.type)).map(entry => `${(capitalizeString(entry.type))} (${entry.id})` );
		
				const select = document.createElement("select");
				select.dataset.field = field;

				selectContent.forEach(sel => {
					const option = document.createElement("option");
					option.value = sel?.match(/(?<=\()[^)]+(?=\))/) || sel;
					option.textContent = sel;
					select.appendChild(option);
				});
				select.value = (state.selected?.entry?.[field] || "");
				fieldLabel.appendChild(select);
			}
			else if (field == "background") {

				const wrap = document.createElement("div");
				wrap.classList.add("sidebar-inline")
				fieldLabel.appendChild(wrap)

				const input = document.createElement("input");
				input.type = "text";
				input.id = crypto.randomUUID();
				input.dataset.field = field;
				input.value = allOptions[field] == "style" ? (state.selected?.entry?.style?.[field] || "") : allOptions[field] == "key" ? (state.selected?.entry?.[field] || "") : ""
				input.dataset.oldValue = input.value;
				wrap.appendChild(input);

				const colorPicker = document.createElement("input");
				colorPicker.type = "color";
				colorPicker.id = crypto.randomUUID();
				colorPicker.value = input.value;
				wrap.appendChild(colorPicker);

				colorPicker.addEventListener("change", function() {
					input.value = this.value;
					handleFieldChange(input.value,input.dataset.field);
				})
				input.addEventListener("change", function() {
					this.value != "" && (this.value = normalizeColor(this.value));
					colorPicker.value = this.value;
				})
			}
			else if (selectOptions[field]) {
				const select = createSelect(field, selectOptions[field], (allOptions[field] == "style" ? (state.selected?.entry?.style?.[field] || "") : allOptions[field] == "key" ? (state.selected?.entry?.[field] || "") : ""));
				fieldLabel.appendChild(select);
			}
			else {
				const input = document.createElement("input");
				input.type = "text";
				input.id = crypto.randomUUID();
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

	updateSidebarSide();
}

function addFieldEventListeners() {
	const fields = document.querySelector("#sidebar").querySelectorAll(".sidebar-field *[data-field]");

	fields.forEach(element => {
		if (element?.type == "text" && element.tagName == "INPUT") {
			element.addEventListener("keydown", handleFieldInput);
		}
		if (["display","align-items","align-content","justify-content","flex-direction","flex-wrap"].includes(element?.dataset?.field)) {
			element.addEventListener("change",function() { handleDisplaySelects(element); });
		}

		switch (element?.dataset?.field) {
			case "id":
				element.addEventListener("change", function() { handleIdChange(element.value,element.dataset.oldValue) });
				break;
			default:
				element.addEventListener("change", function() { handleFieldChange(element.value,element.dataset.field) });
				break;
		}

		
		if (["parent"].includes(element?.dataset?.field)) {
			element.addEventListener("change", refreshSidebar);
		}
	});
}

function handleFieldInput(e) {
	const direction = e.key == "ArrowUp" ? 1 : e.key == "ArrowDown" ? -1 : null
	if (direction === null) return;

	const _this = e.target;
    const suffixes = ["px", "rem", "em", "%", "vh", "vw", "vmin", "vmax","%"];

	let currentVal = _this.value.trim();
	const suffix = suffixes.find(s => currentVal.endsWith(s)) || "";
    if (!currentVal) return;

	const incrementStep = currentVal.includes(".") ? 0.1 : 1;
	let numericVal =  parseFloat(currentVal.replaceAll(suffix,"")?.trim());
	
	if (isNaN(numericVal)) return;

	let newVal = +parseFloat(numericVal+(incrementStep*direction)).toFixed(1)
	_this.value = `${newVal}${suffix}`;

	handleFieldChange(_this.value,_this.dataset.field);
}


function handleDisplaySelects(_this) {
	const displaySelect = _this.parentElement.parentElement.querySelector(".display select");
	const elements = _this.parentElement.parentElement.querySelectorAll(".align-items select, .align-content select, .justify-content select, .flex-direction select, .flex-wrap select");

	elements.forEach(element => {
		element.disabled = !["flex","inline-flex"].includes(displaySelect.value);
	});
}

function handleFieldChange(val,field) {
    const now = Date.now();
    const last = self.lastCall || 0;
    const delay = 150;


    if (now - last < delay) {
        if (!self.pending) {
            self.pending = setTimeout(() => {
                inputChange(val,field);
                self.lastCall = Date.now();
                delete self.pending;
            }, delay - (now - last));
        }
        return;
    }

    inputChange(val,field);
    self.lastCall = now;

	function inputChange(val,field) {
		if (!state.selected) return;
		if (!field) return;
		
		switch (allOptions[field]) {
			case "style":
				state.selected.entry.style = state.selected.entry.style || {};
				state.selected.entry.style[field] = val;
				val === "" && (delete state.selected?.entry?.style?.[field]);
				break;
			case "key":
				state.selected.entry[field] = !isNaN(Number(val)) ? Number(val) : val;
				val === "" && (delete state.selected?.entry?.[field]);
				break;
			default:
				break;
		}
		
		refreshBuild();
		saveGuide();
	}
}



function handleIdChange(val,oldVal) {
    const now = Date.now();
    const last = self.lastCall || 0;
    const delay = 150;
    
    if (now - last < delay) {
        if (!self.pending) {
            self.pending = setTimeout(() => {
                inputChange(val,oldVal);
                self.lastCall = Date.now();
                delete self.pending;
            }, delay - (now - last));
        }
        return;
    }

    inputChange(val,oldVal);
    self.lastCall = now;

	function inputChange(val,oldVal) {
		guideData.content.filter(e => e.parent === oldVal).forEach(e => { e.parent = val; });

		refreshBuild();
		saveGuide();
	}
}

function addMiscEventListeners() {
	document.getElementById("sidebar-page-select").addEventListener("change", function() {handlePageSelect(this); document.getElementById("sidebar-page-select")?.focus();});
	document.getElementById("sidebar-element-select").addEventListener("change", function() {handleElementSelect(this);document.getElementById("sidebar-element-select")?.focus(); });
}

function handlePageSelect(_this) {
	if (_this.value) {
		clearSelection();
		changePage(_this.value);
		refreshSidebar();
	}
}
function handleElementSelect(_this) {
	const val = _this.value;
	const element = val ? document.getElementById(val) : null;

	if (element) {
		selectTarget(element, { allowIgnored: true });
		refreshSidebar();
	} else {
		clearSelection();
	}
}

function refreshBuild() {
	buildData(guideData);
	updateSidebarSide();
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
}

function computeSidebarSide() {
	if (!state.selected) return "right";
	
	const rect = document.getElementById(state.selected?.entry.id)?.getBoundingClientRect();
	const midpoint = rect.left + rect.width / 2;
	return midpoint > window.innerWidth / 2 ? "left" : "right";
}

function updateSidebarSide() {

	const newSide = computeSidebarSide();

	if (document.body.dataset.sidebarSide && newSide != document.body.dataset.sidebarSide) {
		document.getElementById("sidebar").classList.add('disable-anim');
		setTimeout(() => {
			document.getElementById("sidebar").classList.remove('disable-anim');
		}, 100);
	}

	document.body.dataset.sidebarSide = newSide;

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
		saveGuide();

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
			//clearSelection();
			closeMenu();
		}
		return;
	}

	if (state.selected?.element && !state.selected?.element.contains(e.target)) {
		//clearSelection();
	}

	const el = getSelectableTarget(e.target.closest("#content *"));
	if (!el || !el.id) return;
	selectTarget(el);
	refreshSidebar();
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






document.addEventListener("keydown", (e) => {
	const target = e.target;
	if (!target.closest("#sidebar")) return;
	
	if ((target.tagName === "INPUT" || target.tagName === "SELECT") && e.key === "Enter") {
		e.preventDefault();
		target.blur();
	}
});


function updateOrder(input, entry) {
	if (entry.order === -1 || entry.order === 9999) return;
	
    const family = getEntryFamily(entry).filter(e => e.order !== 9999 && e.order !== -1);
    const newOrder = entry.order;
    input.max = family.length;

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

async function readDataFile(_this) {
	const file = _this.files[0];
	if (!file) return;
	
	try {
		const text = await file.text();
		let requestedData = JSON.parse(text);
		
		if (!requestedData || typeof requestedData !== 'object') {
			throw new Error('Invalid JSON file');
		}

		["id","title","version","author","created","modified","content"].forEach(k => {
			if (requestedData[k] == undefined) throw new Error('Invalid JSON file');
		})

		const localData = localStorage.getItem(`GameGuideData_${requestedData.id}`);
		
		if (localData) {
			const jsonData = JSON.parse(localData);

			if (jsonData?.modified > requestedData?.modified) {
				let newerDataConfirm = confirm("Found unsaved data, load that instead?");

				if (newerDataConfirm) {
					requestedData = jsonData;
				}
			};
		}

		guideData = new ManualSaveWrapper(requestedData);

		initLoad();
		buildData();
		refreshSidebar();

		saveGuide();
		
	} catch (error) {
		console.error('Error loading file:', error);
		alert(`Error loading file: ${error.message}`);
	}
}


function downloadGuide(data) {
	if (data?.title == undefined || data?.author == undefined) return;
	const jsonString = JSON.stringify(data, null, 2);	
	const blob = new Blob([jsonString], { type: "application/json" });

	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `GameGuideData_${data.id}.json`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function createLocalPanels() {

	const panels = document.querySelector("#browse .panels")
	panels.innerHTML = "";

	const foundLocalData = [...Array(localStorage.length).keys()]
        .map(i => localStorage.key(i))
        .filter(key => key.startsWith("GameGuideData_"))
        .map(key => ({
            key: key,
            data: JSON.parse(localStorage.getItem(key))
        }));

	foundLocalData.forEach(item => {
		const settings = {
			data: item.data,
			parent: panels,
			key: item.key,
		};

		createBrowsePanel(settings);
	})
}

function createBrowsePanel(settings) {

	const formatDate = (date) => `${new Date(date).toISOString().split('T')[0]} ${new Date(date).toLocaleTimeString()}`;

	const panel = document.createElement("div");
	panel.id = settings.data.id;
	panel.classList.add("panel");

	const metadata = document.createElement("div");
	metadata.classList.add("metadata")
	panel.appendChild(metadata);

	const title = document.createElement("h3");
	title.textContent = settings.data.title;
	metadata.appendChild(title)

	const version = document.createElement("span");
	version.innerHTML = `<strong>Version: </strong><span>${settings.data.version}</span>`;
	metadata.appendChild(version)

	const author = document.createElement("span");
	author.innerHTML = `<strong>Author: </strong><span>${settings.data.author}</span>`;
	metadata.appendChild(author)

	const created = document.createElement("span");
	created.innerHTML = `<strong>Created: </strong><span>${formatDate(settings.data.created)}</span>`;
	metadata.appendChild(created)

	const modified = document.createElement("span");
	modified.innerHTML = `<strong>Modified: </strong><span>${formatDate(settings.data.modified)}</span>`;
	metadata.appendChild(modified);

	const buttons = document.createElement("div");
	buttons.classList.add("buttons")
	panel.appendChild(buttons);

	const deleteBtn = document.createElement("button");
	deleteBtn.className = "btn btn-cancel delete";
	deleteBtn.textContent = "x";
	buttons.appendChild(deleteBtn);

	const loadBtn = document.createElement("button");
	loadBtn.className = "btn btn-confirm load";
	loadBtn.textContent = "⇒";
	buttons.appendChild(loadBtn);

	const downloadBtn = document.createElement("button");
	downloadBtn.className = "btn btn-primary download";
	downloadBtn.textContent = "⤓";
	downloadBtn.title = "Download as JSON";
	
	buttons.appendChild(downloadBtn);

	loadBtn.addEventListener("click", function() {
		const data = settings.data;
		loadGuide(data)
	});

	deleteBtn.addEventListener("click", function() {
		const deletionConfirm = confirm(`You are deleting: ${settings.data.title}\nProceed?`);

		if (deletionConfirm) {
			
			localStorage.removeItem(settings.key);
			createLocalPanels();
		}
	});
	
	downloadBtn.addEventListener("click",function() { downloadGuide(settings.data); })


	settings.parent.appendChild(panel)
}
function loadGuide(data) {
	if (!data)
	["title","version","author","created","modified","content"].forEach(k => { if (data[k] == undefined) return; });

	guideData = new ManualSaveWrapper(data);
	initLoad();
	buildData();
	refreshSidebar();
}


function unloadGuide() {
	document.querySelector("header .guide-info").innerHTML = "";
	document.querySelector("#content").innerHTML = "";
	document.body.dataset.editor = false;
	document.body.dataset.sidebar = false;
	document.body.dataset.loaded = false;

	guideData = {};
	updateUrl();

	createLocalPanels();
}


function newGuide() {

	const guideName = prompt("Select guide title:","");

	if (guideName != undefined) {
		guideData = new ManualSaveWrapper(example_data);
		guideData.id = crypto.randomUUID();
		guideData.created = Date.now();
		guideData.modified = guideData.created;
		guideName && (guideData.title = guideName);

		initLoad();
		buildData();
		refreshSidebar();
	}
}

function initLoad() {
	document.body.dataset.loaded = true;
	const gameInfo = document.querySelector("header .guide-info");
	gameInfo.innerHTML = ``;
	guideData.title != undefined && (gameInfo.innerHTML += `<div class="title"><input type='text' id='guide-title-input' data-field='title' value='${guideData.title}' onChange='handleGuideBaseChange(this)'><span class='val'>${guideData.title}</span></div>`);
	guideData.version != undefined && (gameInfo.innerHTML += `<div class="version"><span>Version: </span><input type='number' id='guide-version-input' data-field='version' min='0.1' max='10.0' step='0.1' value='${guideData.version}' onChange='handleGuideBaseChange(this)'><span class='val'>${guideData.version}</span></div>`);
	guideData.author != undefined && (gameInfo.innerHTML += `<div class="author"><span>Author: </span><input type='text' id='guide-author-input' data-field='author' value='${guideData.author}' onChange='handleGuideBaseChange(this)'><span class='val'>${guideData.author}</span></div>`);
	//guideData.created != undefined && (gameInfo.innerHTML += `<div class="created"><span>Created: </span><input type='text' id='guide-created-input' data-field='created' value='${guideData.created}' onChange='handleGuideBaseChange(this)'><span class='val'>${guideData.created}</span></div>`);
	//guideData.modified != undefined && (gameInfo.innerHTML += `<div class="modified"><span>Modified: </span><input type='text' id='guide-modified-input' data-field='modified' value='${guideData.modified}' onChange='handleGuideBaseChange(this)'><span class='val'>${guideData.modified}</span></div>`);

	updateUrl();
}

function updateUrl() {
 	const url = new URL(window.location.href);
	if (guideData?.id != undefined) {
		url.searchParams.set("id", guideData.id);
	}
	else {
		url.searchParams.delete("id");
	}
    window.history.pushState({}, '', url);
}


function handleGuideBaseChange(_this) {
	_this.nextElementSibling.textContent = _this.value;
	const field = _this.dataset.field;
	guideData[field] && (guideData[field] = _this.value);
	saveGuide();
}

function buildData() {
	document.getElementById("content").innerHTML = "";

	const data = guideData.content.filter(e => e.type === "page" || e.type === "navigator").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).flatMap(page => [page, ...getPageChildren(page.id)]);
	data.forEach(content => {
		const base = content.parent && (document.getElementById(`${content.parent}`)) || document.getElementById("content")
		base.innerHTML += buildContent(content)
	});

	changePage(document.querySelector("#content > .page")?.id)
	selectTarget(document.getElementById(document.getElementById("sidebar-element-select")?.value), { allowIgnored: true });
	renderDiagrams();
}


