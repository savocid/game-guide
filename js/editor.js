const state = {
	selected: null,
	currentEntry: null,
	currentPage: null,
	autoBuild: false,
	edited: false,
};

const entryOptions = {
	"order": {
		label: "order",
		type: "key",
	},
	"id": {
		label: "id",
		type: "key",
	},
	"text": {
		label: "text",
		type: "key",
	},
	"parent": {
		label: "parent",
		type: "key",
	},
	"width": {
		label: "width",
		type: "style",
	},
	"height": {
		label: "height",
		type: "style",
	},
	"min-width": {
		label: "min-width",
		type: "style",
	},
	"min-height": {
		label: "min-height",
		type: "style",
	},
	"max-width": {
		label: "max-width",
		type: "style",
	},
	"max-height": {
		label: "max-height",
		type: "style",
	},
	"background": {
		label: "background",
		type: "style",
	},
	"aspect-ratio": {
		label: "aspect-ratio",
		type: "style",
	},
	"text-align": {
		label: "text-align",
		type: "style",
		options: ["left", "right", "center", "justify", "start", "end"],
	},
	"float": {
		label: "float",
		type: "style",
		options: ["none", "left", "right", "inline-start", "inline-end"],
	},
	"object-fit": {
		label: "object-fit",
		type: "style",
		options: ["cover", "contain", "fill", "none", "scale-down"],
	},
	"margin": {
		label: "margin",
		type: "style",
	},
	"padding": {
		label: "padding",
		type: "style",
	},
	"border-width": {
		label: "border-width",
		type: "style",
	},
	"border-style": {
		label: "border-style",
		type: "style",
		options: ["none", "solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "hidden"],
	},
	"border-color": {
		label: "border-color",
		type: "style",
	},
	"border-radius": {
		label: "border-radius",
		type: "style",
	},
	"color": {
		label: "color",
		type: "style",
	},
	"font-size": {
		label: "font-size",
		type: "style",
	},
	"box-shadow": {
		label: "box-shadow",
		type: "style",
	},
	"text-shadow": {
		label: "text-shadow",
		type: "style",
	},
	"font-weight": {
		label: "font-weight",
		type: "style",
	},
	"font-style": {
		label: "font-style",
		type: "style",
		options: ["normal", "italic", "oblique"],
	},
	"display": {
		label: "display",
		type: "style",
		options: ["block", "inline", "inline-block", "inline-flex", "flex", "grid", "inline-grid", "none", "inherit", "initial", "unset"],
	},
	"image": {
		label: "image",
		type: "key",
	},
	"image-position": {
		label: "position",
		type: "key",
		options: ["top","bottom"]
	},
	"flex-direction": {
		label: "flex-direction",
		type: "style",
		options: ["row", "row-reverse", "column", "column-reverse"],
	},
	"flex-wrap": {
		label: "flex-wrap",
		type: "style",
		options: ["nowrap", "wrap", "wrap-reverse"],
	},
	"align-content": {
		label: "align-content",
		type: "style",
		options: ["baseline", "center", "end", "flex-end", "flex-start","normal","space-around","space-between","space-evenly","start","stretch"],
	},
	"justify-content": {
		label: "justify-content",
		type: "style",
		options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
	},
	"align-items": {
		label: "align-items",
		type: "style",
		options: ["stretch", "flex-start", "flex-end", "center", "baseline"],
	},
	"clear": {
		label: "clear",
		type: "style",
		options: ["none", "left", "right", "both", "inline-start", "inline-end"],
	},
	"justify-self": {
		label: "justify-self",
		type: "style",
		options: ["auto", "normal", "stretch", "center", "start", "end", "self-start", "self-end", "left", "right"],
	},
	"align-self": {
		label: "align-self",
		type: "style",
		options: ["auto", "stretch", "flex-start", "flex-end", "center", "baseline"],
	},
	"row": {
		label: "row",
		type: "key",
	},
	"colspan": {
		label: "colspan",
		type: "key",
	},
	"rowspan": {
		label: "rowspan",
		type: "key",
	},
	"target": {
		label: "target",
		type: "key",
	},
	"title": {
		label: "title",
		type: "key",
	},
	"direction": {
		label: "direction",
		type: "key",
		options: ["TB", "BT", "RL", "LR"],
	},
	"caption": {
		label: "caption",
		type: "key",
	}
}

const optionsGrouped = {
	"basic": [
		"order",
		"id",
		"parent",
	],
	"alignment": [
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
	],
	"background": [
		"background",
		"border-width",
		"border-style",
		"border-color",
		"border-radius",
		"box-shadow",
	],
	"size": [
		"width",
		"height",
		"min-width",
		"min-height",
		"max-width",
		"max-height",
		"aspect-ratio"
	],
	"displacement": [
		"margin",
		"padding",
	],
	"text": [
		"color",
		"font-size",
		"font-weight",
		"font-style",
		"text-align",
		"text-shadow",
	]
}

const entryTypes = {
	"page": {
		add:  true,
		parentTypes: ["base"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 406 406" fill="#000"><rect x="172" y="86" width="128" height="12"/><rect x="172" y="164" width="128" height="12"/><rect x="172" y="243" width="128" height="12"/><path d="M380 406H26V0h354v406zM38 394h330V12H38v382z"/><path d="M152 129H77v-75h75v75zm-63-12h51V66H89v51z"/><path d="M152 208H77v-75h75v75zm-63-12h51v-51H89v51z"/><path d="M152 286H77v-75h75v75zm-63-12h51v-51H89v51z"/></svg>`,
		template: {
			"type": "page",
		},
		options: [
			...optionsGrouped["basic"].filter(i => i !== "parent"),
			...optionsGrouped["background"],
			...optionsGrouped["text"],
			"padding",
			"title",
		]
	},
	"navigator": {
		add:  true,
		parentTypes: ["base"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000"><path d="M0 1h14v1H0zM0 5h9v1H0zM0 9h18v1H0z"/><path d="M2.5 14L0 16.5 2.5 19 4 19 2 17h6v-1H2l2-2H2.5z"/><path d="M15.5 14L18 16.5 15.5 19 14 19l2-2h-6v-1h6l-2-2h1.5z"/></svg>`,
		template: {
			"type": "navigator",
			"title": "Navigator",
			"order": -1,
		},
		options: [
			...optionsGrouped["basic"].filter(i => i !== "parent"),
		],
	},
	"section": {
		add:  true,
		parentTypes: ["page"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#000"><rect x="3" y="3" width="2" height="2"/><rect x="7" y="3" width="2" height="2"/><rect x="11" y="3" width="2" height="2"/><rect x="15" y="3" width="2" height="2"/><rect x="3" y="7" width="2" height="2"/><rect x="3" y="11" width="2" height="2"/><rect x="3" y="15" width="2" height="2"/><rect x="3" y="19" width="2" height="2"/><rect x="3" y="23" width="2" height="2"/><rect x="3" y="27" width="2" height="2"/><rect x="27" y="3" width="2" height="2"/><rect x="23" y="3" width="2" height="2"/><rect x="19" y="3" width="2" height="2"/><rect x="7" y="27" width="2" height="2"/><rect x="11" y="27" width="2" height="2"/><rect x="15" y="27" width="2" height="2"/><rect x="23" y="27" width="2" height="2"/><rect x="19" y="27" width="2" height="2"/><rect x="27" y="7" width="2" height="2"/><rect x="27" y="11" width="2" height="2"/><rect x="27" y="15" width="2" height="2"/><rect x="27" y="19" width="2" height="2"/><rect x="27" y="23" width="2" height="2"/><rect x="27" y="27" width="2" height="2"/><rect x="8" y="10" width="10" height="2"/><rect x="8" y="15" width="6" height="2"/></svg>`,
		template: {
			"type": "section",
			"style": {
				"min-width": "100px",
				"min-height": "100px",
			}
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["size"],
			...optionsGrouped["displacement"],
			...optionsGrouped["background"],
			"title"
		],
	},
	"panel": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="#000"><path d="M216 212H40a12 12 0 0 1-12-12V56a12 12 0 0 1 12-12h176a12 12 0 0 1 12 12v144a12 12 0 0 1-12 12Zm-176-160a4 4 0 0 0-4 4v144a4 4 0 0 0 4 4h176a4 4 0 0 0 4-4V56a4 4 0 0 0-4-4H40Z"/></svg>`,
		template: {
			"type": "panel",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["size"],
			...optionsGrouped["displacement"],
			...optionsGrouped["background"],
			...optionsGrouped["text"],
			...optionsGrouped["alignment"],
		],
	},
	"tabs": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489 489" fill="#000"><path d="M464 488H24c-14 0-24-9-24-22V26C0 14 10 0 24 0h440c14 0 24 14 24 26v440c0 13-10 22-24 22zM24 16c-4 0-8 5-8 10v440c0 5 6 6 8 6h440c2 0 8-1 8-6V26c0-5-4-10-8-10H24z"/><path d="M464 489H24c-15 0-24-7-24-18V36h16v434c0 1 4 2 8 2h440c4 0 8-1 8-2V122c0 0 0 0 0 0-1-1-3-1-8-1H207L154 7l15-7 48 103h247c22 0 24 13 24 18v349c0 7-10 14-24 14z"/><rect x="328" y="3" width="16" height="114"/></svg>`,
		template: {
			"type": "tabs",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["size"],
		],
	},
	"tab": {
		add:  true,
		parentTypes: ["tabs"],
		template: {
			"type": "tab",
		},
		options: [
			...optionsGrouped["basic"].filter(i => i !== "parent"),
			...optionsGrouped["size"],
		],
	},
	"image": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800" fill="#000"><path d="M1716 5H84C40 5 5 41 5 85v1632c0 44 35 79 79 79h1632c44 0 79-35 79-79V85c0-44-35-79-79-79zm0 1728H84c-9 0-17-7-17-16v-197l588-588 571 571c6 6 14 9 22 9s16-3 22-9c12-12 12-32 0-44L678 864c-6-6-14-9-22-9s-16 3-22 9L68 1430V85c0-9 7-16 16-16h1632c9 0 16 7 16 16v1333l-553-553c-2-2-5-4-8-5-12-6-27-4-37 6l-124 124c-12 12-12 32 0 44 6 6 14 9 22 9s16-3 22-9l101-101 571 571c1 1 3 2 4 3v211c0 9-7 16-16 16z"/><path d="M1089 560c0-98-79-177-177-177s-177 79-177 177 79 177 177 177 177-79 177-177zm-177 114c-63 0-114-51-114-114s51-114 114-114 114 51 114 114-51 114-114 114z"/></svg>`,
		template: {
			"type": "image",
			"image": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTA1IiBoZWlnaHQ9IjMzNSIgdmlld0JveD0iMCAwIDUwNSAzMzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwNSIgaGVpZ2h0PSIzMzUiIGZpbGw9IiNjZmQ2ZGEiPjwvcmVjdD48cGF0aCBkPSJNIDAgMjMwQyA2MCAxNzAsIDEyMCAxNzAsIDE4MCAyNDBDIDI1MCAzMzAsIDM2MCAxMjAsIDUwNSAyMzBMIDUwNSAzMzVMIDAgMzM1WiIgZmlsbD0iI2Y2ZjdmNyI+PC9wYXRoPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjE1MCIgcj0iMTgiIGZpbGw9IiNmNmY3ZjciPjwvY2lyY2xlPjwvc3ZnPg==",
			"caption": "Example Image Caption Text",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["size"],
			...optionsGrouped["alignment"],
			...optionsGrouped["background"],
			...optionsGrouped["displacement"],
			...optionsGrouped["text"],
			"object-fit",
			"image",
			"caption",
		],
	},
	"table": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000"><path d="M1 21h22V3H1v18zm5-1v-3h8v3H6zm8-8H6V9h8v3zm0 1v3H6v-3h8zm8 7h-7v-3h7v3zm0-4h-7v-3h7v3zm0-4h-7V9h7v3zM2 4h20v4H2V4zm0 5h3v3H2V9zm0 4h3v3H2v-3zm0 4h3v3H2v-3z"/></svg>`,
		template: {
			"type": "table",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["size"],
			...optionsGrouped["background"],
		],
	},
	"table-cell": {
		add: true,
		parentTypes: ["table"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 20 260 174" fill="#000"><g><rect x="20" y="20" width="20" height="8"/><rect x="50" y="20" width="20" height="8"/><rect x="80" y="20" width="20" height="8"/><rect x="110" y="20" width="20" height="8"/><rect x="140" y="20" width="20" height="8"/><rect x="170" y="20" width="20" height="8"/><rect x="200" y="20" width="20" height="8"/><rect x="230" y="20" width="20" height="8"/><rect x="260" y="20" width="20" height="8"/><rect x="20" y="182" width="20" height="8"/><rect x="50" y="182" width="20" height="8"/><rect x="80" y="182" width="20" height="8"/><rect x="110" y="182" width="20" height="8"/><rect x="140" y="182" width="20" height="8"/><rect x="170" y="182" width="20" height="8"/><rect x="200" y="182" width="20" height="8"/><rect x="230" y="182" width="20" height="8"/><rect x="260" y="182" width="20" height="8"/><rect x="20" y="20" width="8" height="20"/><rect x="20" y="50" width="8" height="20"/><rect x="20" y="80" width="8" height="20"/><rect x="20" y="110" width="8" height="20"/><rect x="20" y="140" width="8" height="20"/><rect x="20" y="170" width="8" height="20"/><rect x="272" y="20" width="8" height="20"/><rect x="272" y="50" width="8" height="20"/><rect x="272" y="80" width="8" height="20"/><rect x="272" y="110" width="8" height="20"/><rect x="272" y="140" width="8" height="20"/><rect x="272" y="170" width="8" height="20"/></g></svg>`,
		template: {
			"type": "table-cell",
			"text": "Example Cell",
			"row": 1,
			"colspan": 1,
			"rowspan": 1,
		},
		options: [
			...optionsGrouped["basic"].filter(i => i !== "parent"),
			"text",
			"colspan",
			"rowspan",
			"row",
		],
	},
	"diagram": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800" fill="#000"><path d="M1765 0H35C18 0 3 14 3 31v477c0 17 15 31 32 31h1730c17 0 31-14 31-31V31c0-17-14-31-31-31zm-32 477H66V63h1667v414z"/><path d="M512 1260H35c-17 0-32 14-32 31v477c0 17 15 31 32 31h477c17 0 31-14 31-31v-477c0-17-14-31-31-31zm-32 477H66v-414h414v414z"/><path d="M1138 1260H662c-17 0-31 14-31 31v477c0 17 14 31 31 31h477c17 0 31-14 31-31v-477c0-17-14-31-31-31zm-31 477H693v-414h414v414z"/><path d="M1765 1260h-477c-17 0-31 14-31 31v477c0 17 14 31 31 31h477c17 0 31-14 31-31v-477c0-17-14-31-31-31zm-32 477h-414v-414h414v414z"/><path d="M900 594c-17 0-31 14-31 31v325H273c-17 0-32 14-32 31v193c0 17 15 32 32 32 17 0 31-15 31-32v-162h564v162c0 17 14 32 31 32s32-15 32-32v-162h564v162c0 17 15 32 32 32s31-15 31-32v-193c0-17-14-31-31-31H931V625c0-17-14-31-31-31z"/></svg>`,
		template: {
			"type": "diagram",
			"direction": "LR",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["size"],
			...optionsGrouped["background"],
			...optionsGrouped["displacement"],
			"direction",
		],
	},
	"diagram-node": {
		add:  true,
		parentTypes: ["diagram"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="#000"><defs><style type="text/css"></style></defs><path d="M843.5 737.4c-12.4-75.2-79.2-129.1-155.3-125.4S550.9 676 546 752c-153.5-4.8-208-40.7-199.1-113.7 3.3-27.3 19.8-41.9 50.1-49 18.4-4.3 38.8-4.9 57.3-3.2 1.7 0.2 3.5 0.3 5.2 0.5 11.3 2.7 22.8 5 34.3 6.8 34.1 5.6 68.8 8.4 101.8 6.6 92.8-5 156-45.9 159.2-132.7 3.1-84.1-54.7-143.7-147.9-183.6-29.9-12.8-61.6-22.7-93.3-30.2-14.3-3.4-26.3-5.7-35.2-7.2-7.9-75.9-71.5-133.8-147.8-134.4-76.3-0.6-140.9 56.1-150.1 131.9s40 146.3 114.2 163.9c74.2 17.6 149.9-23.3 175.7-95.1 9.4 1.7 18.7 3.6 28 5.8 28.2 6.6 56.4 15.4 82.4 26.6 70.7 30.2 109.3 70.1 107.5 119.9-1.6 44.6-33.6 65.2-96.2 68.6-27.5 1.5-57.6-0.9-87.3-5.8-8.3-1.4-15.9-2.8-22.6-4.3-3.9-0.8-6.6-1.5-7.8-1.8l-3.1-0.6c-2.2-0.3-5.9-0.8-10.7-1.3-25-2.3-52.1-1.5-78.5 4.6-55.2 12.9-93.9 47.2-101.1 105.8-15.7 126.2 78.6 184.7 276 188.9 29.1 70.4 106.4 107.9 179.6 87 73.3-20.9 119.3-93.4 106.9-168.6zM329.1 345.2c-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3 83.3 37.3 83.3 83.3-37.3 83.3-83.3 83.3zM695.6 845c-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3 83.3 37.3 83.3 83.3-37.3 83.3-83.3 83.3z" p-id="12712"></path></svg>`,
		template: {
			"type": "diagram-node",
			"text": "Example Node",
		},
		options: [
			...optionsGrouped["basic"].filter(i => i !== "parent" && i !== "order"),
			"text",
			"target",
			"image",
			"image-position",
		],
	},
	"header": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000"><path d="M16.5 4c.06.01.12.03.17.06.07.03.12.08.17.13.07.1.11.23.11.36v11c0 .28-.22.5-.5.5s-.5-.22-.5-.5V6.7c-.58.83-1.36 1.6-2.22 2.18-.23.15-.54.09-.69-.14-.15-.23-.09-.54.14-.69C14.56 7.19 15.62 5.78 15.96 4.6l.05-.21c.01-.04.02-.08.04-.12.03-.07.08-.13.14-.18.06-.04.12-.07.19-.09.06-.01.12-.01.18 0zM9.5 4c.28 0 .5.22.5.5v11c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-5.5H3v5.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.5c0-.28.22-.5.5-.5s.5.22.5.5v4.5h6V4.5c0-.28.22-.5.5-.5z"/></svg>`,
		template: {
			"type": "header",
			"text": "Example Header",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["text"],
			"text",
		],
	},
	"sub-header": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000"><path d="M9.5 4c.28 0 .5.22.5.5v11c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-5.5H3v5.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.5c0-.28.22-.5.5-.5s.5.22.5.5v4.5h6V4.5c0-.28.22-.5.5-.5zm5 0c1.24 0 2.4.57 3.05 1.54.66 1 .71 2.33-.13 3.72-.42.7-1.01 1.25-1.62 1.72-.2.16-.41.31-.62.45l-.44.31c-.27.18-.52.36-.78.54-1.02.75-1.79 1.52-1.96 2.72H17.5c.28 0 .5.22.5.5s-.22.5-.5.5h-6c-.28 0-.5-.22-.5-.5 0-2 1.17-3.13 2.39-4.03l.4-.28.53-.36c.31-.21.61-.41.9-.62.56-.44 1.04-.9 1.37-1.45.67-1.11.56-2.03.14-2.66C16.28 5.43 15.45 5 14.5 5c-1.44 0-2.5 1.25-2.5 2.5 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-1.75 1.45-3.5 3.5-3.5z"/></svg>`,
		template: {
			"type": "sub-header",
			"text": "Example Sub-header",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["text"],
			"text",
		],
	},
	"text": {
		add:  true,
		parentTypes: ["page","panel","section","tab"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#000"><path d="M0 7h64v2H0zM0 17h64v2H0zM0 27h64v2H0zM0 37h64v2H0zM0 47h64v2H0zM0 57h44v2H0z"/></svg>`,
		template: {
			"type": "text",
			"text": "Example Text",
		},
		options: [
			...optionsGrouped["basic"],
			...optionsGrouped["text"],
			"text",
		],
	},
	"page-nav": {
		add: true,
		parentTypes: ["page"],
		svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="#000"><path d="M3.5 10h23c.674 0 .658-1 0-1h-23c-.673 0-.654 1 0 1zm1.344-4.126l-3.64 3.644 3.64 3.612c.463.45-.235 1.2-.71.71L.14 9.873c-.186-.186-.186-.525 0-.71l3.994-4c.487-.49 1.18.238.71.71zM26.5 20h-23c-.673 0-.657 1 0 1h23c.674 0 .655-1 0-1zm-1.344 4.126l3.64-3.644-3.64-3.612c-.463-.45.235-1.2.71-.71l3.994 3.967c.186.186.186.525 0 .71l-3.994 4c-.487.49-1.18-.238-.71-.71z"/></svg>`,
		template: {
			"type": "page-nav",
			"order": 9999,
		},
		options: [
			...optionsGrouped["basic"].filter(i => i !== "parent"),
			...optionsGrouped["size"],
			...optionsGrouped["displacement"],
			...optionsGrouped["background"],
		],
	},
}

const entryTypeGrouping = [
	["text", "image", "image-position", "caption", "title", "direction", "row", "colspan", "rowspan"],
	["color", "font-size", "font-weight", "font-style", "text-align", "text-shadow"],
	["background", "border-width", "border-style", "border-color", "border-radius", "box-shadow"],
	["width", "height"],
	["min-width", "min-height"],
	["max-width", "max-height"],
	["margin", "padding", "aspect-ratio"],
	["display", "flex-direction", "flex-wrap", "align-content", "justify-content", "align-items", "justify-self", "align-self", "float", "clear", "object-fit"],
	["id", "parent", "order", "target"],
];

function openSidebar(open = document.body.dataset.sidebar != "true") {
	document.body.dataset.sidebar = open ? "true" : "false";
};

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
	document.getElementById("sidebar").innerHTML = "";
}



function renderAddTools(section) {

	const header = document.createElement("h4");
	header.textContent = "Add";
	section.appendChild(header)

	const addWrap = document.createElement("div");
	addWrap.className = "sidebar-grid";

	Object.keys(entryTypes).filter(key => entryTypes[key].add === true && (entryTypes[key].parentTypes.includes(state.currentEntry?.type) || !state.currentEntry && entryTypes[key].parentTypes.includes("base"))).forEach(i => {
		if (state.currentPage?.type == "navigator" && i != "page") return;
		if (!state.currentPage && (i != "page" && i != "navigator")) return;
		if (i == "page-nav" && guideData.content.find(e => e.type == "page-nav" && e.parent == state.currentPage?.id)) return;

		const button = document.createElement("button");
		button.classList.add(i);
		addWrap.appendChild(button);

		if (i == "page" || i == "navigator") {
			button.addEventListener("click", function() { addEntry(i, "base") })
		}
		else {
			button.addEventListener("click", function() { addEntry(i, state.currentEntry?.id) })
		}

		const txt = document.createElement("span");
		txt.innerText = capitalizeString(i);
		button.appendChild(txt);

		if (entryTypes[i]?.svg) {
			const img = document.createElement('img');
			img.src = `data:image/svg+xml;base64,${btoa(entryTypes[i]?.svg)}`;
			img.alt = capitalizeString(i);
			button.appendChild(img);
		}
	});
	section.appendChild(addWrap);
}

function renderMiscTools(section) {

	const actionRow = document.createElement("div");
	actionRow.className = "sidebar-actions";
	section.appendChild(actionRow);

	const removeButton = document.createElement("button");
	removeButton.type = "button";
	removeButton.dataset.action = "remove";
	removeButton.textContent = "Remove";
	actionRow.appendChild(removeButton);

	const cloneButton = document.createElement("button");
	cloneButton.type = "button";
	cloneButton.dataset.action = "clone";
	cloneButton.textContent = "Clone";
	actionRow.appendChild(cloneButton);

	removeButton.addEventListener("click", function() {removeEntry(state.currentEntry?.id)})
	cloneButton.addEventListener("click", function() {cloneEntry(state.currentEntry?.id)})
}

async function addEntry(entryType,entryParent) {

	if (!entryType || !entryParent) return null;
	
	let newId = null
	
	switch(entryType) {
		case "page":
			var pageCount = guideData.content.filter(e => e.type === "page").length;
			var totalCount = guideData.content.filter(e => (e.type === "page") || (e.type === "navigator"))?.length;
			var entry = {...entryTypes?.[entryType]?.template};
			entry.id = generateID();
			newId = entry.id;
			entry.order = totalCount+1;
			entry.title = `New ${capitalizeString(entryType)} ${pageCount+1}`;
			guideData.content.push(entry);


			if (guideData.content.find(e => e.type === "navigator")) {
				var pageNav = {...entryTypes?.["page-nav"]?.template};
				pageNav.id = generateID();
				pageNav.parent = entry.id;
				guideData.content.push(pageNav)
			}

			break;
		case "navigator":
			if (guideData.content.find(e => e.type == "navigator")) { alert("Navigator already exists."); return; }
			
			guideData.content = guideData.content.filter(e => e.type !== "page-nav");

			var pages = guideData.content.filter(e => e.type === "page")
			var nav = {...entryTypes?.[entryType]?.template};
			nav.id = generateID();
			newId = nav.id;
			guideData.content.push(nav);
			
			pages.forEach(page => {
				var pageNav = {...entryTypes?.["page-nav"]?.template};
				pageNav.id = generateID();
				pageNav.parent = page.id;
				guideData.content.push(pageNav)
			});
			
			break;
		case "tabs":
			var siblingCount = guideData.content.filter(e => e.parent === entryParent).length;
			var entry = {...entryTypes?.[entryType]?.template};
			entry.id = generateID();
			newId = entry.id;
			entry.parent = entryParent;
			entry.order = siblingCount+1;
			guideData.content.push(entry);

			const tabs = ["Example Tab 1", "Example Tab 2", "Example Tab 3"]
			tabs.forEach((tab, i) => {
				var tabEntry = {...entryTypes?.["tab"]?.template};
				tabEntry.id = generateID();
				tabEntry.parent = entry.id;
				tabEntry.order = i+1;
				tabEntry.title = tab;
				guideData.content.push(tabEntry);

				var textEntry = {...entryTypes?.["text"]?.template};
				textEntry.id = generateID();
				textEntry.parent = tabEntry.id;
				textEntry.order = 1;
				textEntry.text = tab;
				guideData.content.push(textEntry);
			})
			break;
		case "table":
			var siblingCount = guideData.content.filter(e => e.parent === entryParent).length;
			var tableEntry = {...entryTypes?.[entryType]?.template};
			tableEntry.id = generateID();
			newId = tableEntry.id;
			tableEntry.parent = entryParent;
			tableEntry.order = siblingCount+1;
			guideData.content.push(tableEntry);

			const newTableData = [
				[{"text": "Cell 1",}, {"text": "Cell 2",}, {"text": "Cell 3",}],
				[{"text": "Cell 4",}, {"text": "Cell 5",}, {"text": "Cell 6",}],
				[{"text": "Cell 7",}, {"text": "Cell 8",}, {"text": "Cell 9",}],
			]

			newTableData.forEach((row, r) => {
				row.forEach((cell, c) => {
					var cellEntry = {}
					cellEntry.type = "table-cell";
					cellEntry.id = generateID();
					cellEntry.order = c+1;
					cellEntry.row = r+1;
					cellEntry.parent = tableEntry.id;
					cellEntry.colspan = cell.colspan || 1;
					cellEntry.rowspan = cell.rowspan || 1;
					cellEntry.text = cell.text;
					guideData.content.push(cellEntry);
				})
			})

			break;
		case "diagram":
			var siblingCount = guideData.content.filter(e => e.parent === entryParent).length;
			var entry = {...entryTypes?.[entryType]?.template};
			entry.id = generateID();
			newId = entry.id;
			entry.parent = entryParent;
			entry.order = siblingCount+1;
			guideData.content.push(entry);

			const example_nodes = [
				{"text": "Example Node 1", "id": generateID(),},
				{"text": "Example Node 2", "id": generateID(),},
				{"text": "Example Node 3", "id": generateID(),},
				{"text": "Example Node 4", "id": generateID(),},
				{"text": "Example Node 5", "id": generateID(),},
				{"text": "Example Node 6", "id": generateID(),},
			];

			example_nodes.forEach((n,i) => {
				const object = {};
				object.type = "diagram-node"
				object.id = n.id;
				object.parent = entry.id;
				object.order = i+1;
				object.text = n.text;

				if (i <= 3) {
					object.target = example_nodes.filter((e,i) => i >= 4 && (Math.random() * 1 > 0.5)).map(e => e.id);
				}
				guideData.content.push(object);
			});
			break;
		default:
			var siblingCount = guideData.content.filter(e => e.parent === entryParent).length;
			var entry = {...entryTypes?.[entryType]?.template};
			entry.id = generateID();
			newId = entry.id;
			entry.parent = entryParent;
			!entry.order && (entry.order = siblingCount+1);
			if (entryType == "section") entry.title = `New ${capitalizeString(entryType)} ${siblingCount}`;
			guideData.content.push(entry);
			break;
	}
	

	await handleBuild();
	saveGuide();

	if (newId !== null) {
		const newPage = getEntryPage(newId);
		if (newPage) {
			changePage(newPage?.id);
		}

		const entry = guideData.content.find(e => e.id == newId)
		if (entry) {
			selectTarget(newId);
		} else {
			clearSelection();
		}

		buildSidebar();
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

	
	
	const pageToShow = state.currentPage || getEntryPage(state.currentEntry?.id);

	if (pageToShow) {
		pageSelect.value = pageToShow?.id;

		elementSelect.innerHTML = "";
		const placeholder = document.createElement("option");
		placeholder.value = "";
		placeholder.textContent = "";
		elementSelect.appendChild(placeholder);

		const pageChildren = getPageChildren(pageToShow?.id);
		if (pageChildren) {

			const selectContent = [pageToShow, ...pageChildren].map(entry => entry && `${(capitalizeString(entry.type))} (${entry.id})`);
			selectContent.forEach(sel => {
				const option = document.createElement("option");
				option.value = sel?.match(/(?<=\()[^)]+(?=\))/) || sel;
				option.textContent = sel;
				elementSelect.appendChild(option);
			});

			if (state.currentEntry?.id) {
				elementSelect.value = state.currentEntry?.id;
			}
		}
	}

	
	
}

function renderEditControls(section) {
	const stylesWrap = document.createElement("div");
	stylesWrap.className = "sidebar-style-groups";
	section.appendChild(stylesWrap);

	const selectedType = state.currentEntry?.type;

	entryTypeGrouping.forEach(group => {
		const groupEl = document.createElement("div");
		groupEl.className = "sidebar-style-group";

		group.forEach(field => {
			if (!field || !entryOptions[field] || !entryTypes[selectedType] || !entryTypes[selectedType]?.options.includes(field)) return;

			const fieldDiv = document.createElement("div");
			fieldDiv.classList.add("sidebar-field");
			fieldDiv.classList.add(field);
			groupEl.appendChild(fieldDiv);

			const name = document.createElement("span");
			name.textContent = entryOptions[field]?.label || field;
			fieldDiv.appendChild(name);

		

			if (field == "text" || field == "caption") {

				const textileHead = document.createElement("span");
				textileHead.classList.add("textile");
				fieldDiv.appendChild(textileHead);

				const textilehref = document.createElement("a");
				textilehref.href = "https://textile-lang.com/";
				textilehref.target = "_blank"
				textilehref.textContent = "textile";
				textileHead.appendChild(textilehref);

				const input = document.createElement("textarea");
				input.dataset.field = field;
				input.value = state.currentEntry?.[field] || "";
				fieldDiv.appendChild(input);

				const wrap = document.createElement("div");
				fieldDiv.appendChild(wrap);

				const dropdownId = generateID();

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

				const btns = [
					{"label": "bold", "html": "<b>B</b>"},
					{"label": "italic", "html": "<i>I</i>"},
					{"label": "underline", "html": "<u>U</u>"},
					{"label": "strike", "html": "<s>S</s>"},
					{"label": "super", "html": "<span>A</span><sup>2</sup>"},
					{"label": "spoiler", "html": "<span>👁‍🗨</span>"},
					//{"label": "quote", "html": '"'},
					//{"label": "code", "html": "<>"},
					{"label": "link", "html": ("<img src='data:image/svg+xml;base64,"+btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 836.7 836.7"><path d="M648.4 228.1h-66.6c-4.5 0-8.9 1.8-12.1 5-3.2 3.2-5 7.5-5 12.1v54.1c0 4.5 1.8 8.9 5 12.1 3.2 3.2 7.6 5 12.1 5l66.6-.2c55.4 0 100.2 44.9 100.2 100.2v2.9c0 55.4-44.9 100.2-100.2 100.2H397.1v-146c0-4.5-1.8-8.9-5-12.1-3.2-3.2-7.5-5-12.1-5h-54c-4.5 0-8.9 1.8-12.1 5-3.2 3.2-5 7.5-5 12.1v214.2c0 11 9 20 20 20h319.4c50.3 0 97.6-19.6 133.2-55.2s55.2-82.9 55.2-133.2v-2.9c0-50.3-19.6-97.6-55.2-133.2S698.7 228.1 648.4 228.1zM255 520.4l-66.6.2c-55.4 0-100.2-44.9-100.2-100.2v-2.9c0-55.4 44.9-100.2 100.2-100.2h251.2v146.1c0 4.5 1.8 8.9 5 12.1 3.2 3.2 7.5 5 12.1 5h54c4.5 0 8.9-1.8 12.1-5 3.2-3.2 5-7.5 5-12.1V249.1c0-11-9-20-20-20H188.4c-50.3 0-97.6 19.6-133.2 55.2C19.6 319.8 0 367 0 417.4v2.9c0 50.3 19.6 97.6 55.2 133.2s82.9 55.2 133.2 55.2H255c4.5 0 8.9-1.8 12.1-5 3.2-3.2 5-7.5 5-12.1v-54.1c0-4.5-1.8-8.9-5-12.1-3.2-3.2-7.6-5-12.1-5z"/></svg>')+"' />")},
					{"label": "size", "html": "<span class='small'>A</span><span class='large'>A</span>"},
					{"label": "color", "html": "<span class='color1'>A</span><span class='color2'>A</span>"},
				]

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
					const selectPos = { start: input?.selectionStart, end: input?.selectionEnd };
					const selectedText = fullText.substring(selectPos?.start, selectPos?.end);
					if (!input || !fullText || typeof selectPos.start !== "number" || typeof selectPos.end !== "number" || !selectedText) return;

					const markerByType = {
						bold: "*",
						italic: "_",
						super: "^",
						underline: "+",
						strike: "-",
					};
					const marker = markerByType[type];
					if (marker) {
						const count = (selectedText.match(new RegExp(`\\${marker}`, "g")) || []).length;
						if (count % 2 !== 0) return;
					}

					const requestData = dropdown.querySelector("input[type='radio']:checked ~ *")?.value;

					const wrapText = (t, text, value = "") => {
						switch (t) {
							case "bold": return `*${text}*`;
							case "italic": return `_${text}_`;
							case "super": return `^${text}^`;
							case "underline": return `+${text}+`;
							case "strike": return `-${text}-`;
							case "link": return `["${text}":${value}]`;
							case "color": return `%{color:${value}}${text}%`;
							case "size": return `%{font-size:${value}}${text}%`;
							case "spoiler": return `%(spoiler)<span class='spoiler-content'>${text}</span>%`;
							default: return text;
						}
					};

					const replaceRange = (start, end, replacement) => fullText.substring(0, start) + replacement + fullText.substring(end);

					                    const parseStyleList = (styleText) => {
                        const entries = {};
                        const order = [];
                        styleText.split(";").forEach(part => {
                            const trimmed = part.trim();
                            if (!trimmed) return;
                            const colonIndex = trimmed.indexOf(":");
                            if (colonIndex === -1) return;
                            const key = trimmed.slice(0, colonIndex).trim();
                            const value = trimmed.slice(colonIndex + 1).trim();
                            if (!key) return;
                            if (!(key in entries)) order.push(key);
                            entries[key] = value;
                        });
                        return { entries, order };
                    };

                    const mergeStyleList = (styleText, key, value) => {
                        const parsed = parseStyleList(styleText);
                        if (!(key in parsed.entries)) parsed.order.push(key);
                        parsed.entries[key] = value;
                        return parsed.order.map(k => `${k}:${parsed.entries[k]}`).join(";");
                    };

                    const findStyleWrapper = (text, start, end) => {
                        const re = /%\{([^}]+)\}([\s\S]*?)%/g;
                        for (const m of text.matchAll(re)) {
                            const mStart = m.index;
                            const mEnd = m.index + m[0].length;
                            if (start >= mStart && end <= mEnd) {
                                return { start: mStart, end: mEnd, style: m[1] ?? "", inner: m[2] ?? "" };
                            }
                        }
                        return null;
                    };

                    const findWrapper = (t, text, start, end) => {
                        const patterns = {
                            link: /\["([^\n]+?)":((?:\[[a-z0-9]*\]|[^\]])+)\]/g,
                            color: /%\{color\s*:\s*([^}]+)\}([\s\S]*?)%/g,
                            size: /%\{font-size\s*:\s*([^}]+)\}([\s\S]*?)%/g,
                            spoiler: /%\((?:spoiler)\)<span class='spoiler-content'>([\s\S]*?)<\/span>%/g,
                        };
                        
                        const re = patterns[t];
                        if (!re) return null;

                        if (t === "spoiler") {
                            for (const m of text.matchAll(re)) {
                                const mStart = m.index;
                                const mEnd = m.index + m[0].length;
                                if (start >= mStart && end <= mEnd) {
                                    return { start: mStart, end: mEnd, inner: m[1] ?? "" };
                                }
                            }
                            return null;
                        }

                        for (const m of text.matchAll(re)) {
                            const mStart = m.index;
                            const mEnd = m.index + m[0].length;
                            if (start >= mStart && end <= mEnd) {
                                const inner = (t === "link") ? m[1] : (m[2] || m[1] || "");
                                return { start: mStart, end: mEnd, inner };
                            }
                        }
                        return null;
                    };

                    // If selection is inside an existing wrapper, update or remove it
                    const styleWrapper = (type === "color" || type === "size")
                        ? findStyleWrapper(fullText, selectPos.start, selectPos.end)
                        : null;
                    if (styleWrapper) {
                        let replacement;
                        const styleKey = type === "color" ? "color" : "font-size";

                        if (!requestData) {
                            const parsed = parseStyleList(styleWrapper.style);
                            if (styleKey in parsed.entries) {
                                delete parsed.entries[styleKey];
                            }
                            const remainingOrder = parsed.order.filter(key => key !== styleKey);
                            const remaining = remainingOrder
                                .map(key => `${key}:${parsed.entries[key]}`)
                                .join(";");

                            replacement = remaining
                                ? `%{${remaining}}${styleWrapper.inner}%`
                                : styleWrapper.inner;
                        } else {
                            const mergedStyle = mergeStyleList(styleWrapper.style, styleKey, requestData);
                            replacement = `%{${mergedStyle}}${styleWrapper.inner}%`;
                        }

                        input.value = replaceRange(styleWrapper.start, styleWrapper.end, replacement);
                        handleFieldChange(input, input.value, input.dataset.field);
                        return;
                    }

                    const wrapper = findWrapper(type, fullText, selectPos.start, selectPos.end);
                    if (wrapper) {
                        let replacement;

                        if (type === "spoiler") {
                            replacement = wrapper.inner; // remove
                        } else if (["link", "color", "size"].includes(type)) {
                            replacement = requestData ? wrapText(type, wrapper.inner, requestData) : wrapper.inner;
                        } else {
                            replacement = wrapper.inner;
                        }

                        input.value = replaceRange(wrapper.start, wrapper.end, replacement);
                        handleFieldChange(input, input.value, input.dataset.field);
                        return;
                    }

					// No wrapper found: apply normal behavior
					if (!requestData && ["link", "color", "size"].includes(type)) return;
					const unwrapInline = (t, text) => {
						switch (t) {
							case "bold": return text.match(/^\*([\s\S]+)\*$/)?.[1] ?? null;
							case "italic": return text.match(/^_([\s\S]+)_$/)?.[1] ?? null;
							case "super": return text.match(/^\^([\s\S]+)\^$/)?.[1] ?? null;
							case "underline": return text.match(/^\+([\s\S]+)\+$/)?.[1] ?? null;
							case "strike": return text.match(/^-([\s\S]+)-$/)?.[1] ?? null;
							default: return null;
						}
					};

					const unwrapped = unwrapInline(type, selectedText);
					let outputText;

					if (unwrapped !== null) {
						outputText = unwrapped;
					} else {
						if (["link", "color", "size", "spoiler"].includes(type)) {
							outputText = wrapText(type, selectedText, requestData);
						} else {
							outputText = wrapText(type, selectedText);
						}
					}

					input.value =
						fullText.substring(0, selectPos.start) +
						outputText +
						fullText.substring(selectPos.end);

					handleFieldChange(input, input.value, input.dataset.field);
					}
			}
			else if (field == "order") {
				if (state.currentEntry?.type == "table-cell") {

					const orderBuildData = [];
					const entries = guideData.content.filter(e => e.parent == state.currentEntry?.parent && e.type == 'table-cell');
					const rowMax = entries.reduce((max, current) => current.row > max.row ? current : max).row;

					let totalRows = 0;
					for (let r = 0; r < rowMax; r++) {
						const foundEntries = entries.filter(e => e.row == (r+1));
						if (foundEntries.length > 0) {
							totalRows++;
							const object = {};
							object.data = foundEntries;
							object.groupTitle = `${totalRows}`;
							object.groupKey = "row";
							orderBuildData.push(object);
						}
					}

					const extraRowMax = guideData.content.filter(e => e.parent == state.currentEntry?.parent && e.type == 'table-cell' && e.id != state.currentEntry?.id).reduce((max, current) => current.row > max.row ? current : max).row;
					let extraRows = 0;
					for (let r = 0; r < extraRowMax; r++) {
						const foundEntries = entries.filter(e => e.row == (r+1));
						if (foundEntries.length > 0) {
							extraRows++;
						}
					}
		
					if (extraRows >= totalRows) {
						const extraObj = {};
						extraObj.data = [];
						extraObj.groupTitle = `${totalRows+1}`;
						extraObj.groupKey = "row";
						orderBuildData.push(extraObj);
					}

					orderBuildData.length && (fieldDiv.append(buildOrderSort(orderBuildData)[0]));
				}
				else {
					fieldDiv.append(buildOrderSort([
						{ data: guideData.content.filter(e => e.parent == state.currentEntry?.parent), }
					])[0]);
				}
			}
			else if (field == "row") {
				const input = document.createElement("input");
				input.type = "number";
				input.id = generateID();
				input.dataset.field = field;
				input.min = 1;
				input.max = (guideData.content.filter(e => e.parent == state.currentEntry?.parent && e.type == 'table-cell' && e.id != state.currentEntry?.id).reduce((max, current) => current.row > max.row ? current : max).row)+1;
				input.value = (state.currentEntry?.[field] || 1)
				input.dataset.oldValue = input.value;
				fieldDiv.appendChild(input);
			}
			else if (field == "colspan" || field == "rowspan") {
				const input = document.createElement("input");
				input.type = "number";
				input.id = generateID();
				input.dataset.field = field;
				input.min = 1;
				input.max = 99;
				input.value = state.currentEntry?.[field] || 1
				input.dataset.oldValue = input.value;
				fieldDiv.appendChild(input);
			}
			else if (field == "parent") {
				const selectContent = [guideData.content.find(e => e.id === state.currentPage?.id), ...getPageChildren(state.currentPage?.id, state.currentEntry?.id)].filter(e => ["page","panel","section","tab"].includes(e?.type)).map(entry => `${(capitalizeString(entry.type))} (${entry.id})` );
		
				const select = document.createElement("select");
				select.dataset.field = field;

				selectContent.forEach(sel => {
					const option = document.createElement("option");
					option.value = sel?.match(/(?<=\()[^)]+(?=\))/) || sel;
					option.textContent = sel;
					select.appendChild(option);
				});
				select.value = (state.currentEntry?.[field] || "");
				fieldDiv.appendChild(select);
			}
			else if (field == "target") {
				const wrap = document.createElement("div");
				fieldDiv.appendChild(wrap)

				const targets = state.currentEntry?.target || [];
				const allTargets = guideData.content.filter(e => e.parent == state.currentEntry?.parent && e.id != state.currentEntry?.id);
				
				allTargets.forEach(t => {
					const inputId = generateID();
					const label = document.createElement("label");
					label.for = inputId;
					wrap.appendChild(label);

					const text = document.createElement("span");
					text.textContent = `${capitalizeString(t.text.toString().replace(/<[^>]*>/g, ''))} (${t.id})`;
					label.appendChild(text)

					const checkbox = document.createElement("input");
					checkbox.type = "checkbox";
					checkbox.id = inputId;
					checkbox.dataset.id = t.id;
					checkbox.checked = targets.includes(t.id)
					label.appendChild(checkbox);

					checkbox.addEventListener("change", function() {handleTargetChange(this)});
				});

				function handleTargetChange(_this) {
					const array = [];
					fieldDiv.parentElement.querySelectorAll("input[data-id]:checked").forEach(i => {
						array.push(i.dataset.id);
					});

					state.currentEntry?.target = array;

					handleBuild();
					saveGuide();
				}
			
			}
			else if (field == "background" || field == "border-color") {
				const wrap = document.createElement("div");
				wrap.classList.add("sidebar-inline")
				fieldDiv.appendChild(wrap)

				const input = document.createElement("input");
				input.type = "text";
				input.id = generateID();
				input.dataset.field = field;
				input.value = entryOptions[field].type == "style" ? (state.currentEntry?.style?.[field] || "") : entryOptions[field].type == "key" ? (state.currentEntry?.[field] || "") : ""
				input.dataset.oldValue = input.value;
				wrap.appendChild(input);

				const colorPicker = document.createElement("input");
				colorPicker.type = "color";
				colorPicker.id = generateID();
				colorPicker.value = input.value;
				wrap.appendChild(colorPicker);

				colorPicker.addEventListener("change", function() {
					input.value = this.value;
					handleFieldChange(input, input.value,input.dataset.field);
				})
				input.addEventListener("change", function() {
					const normalizedColor = normalizeColor(this.value);
					const toNormalize = normalizedColor != "#000000" ? true : (this.value.toLowerCase() == "black" || this.value.match(/^#0*$/) || false);
					if (this.value != "" && toNormalize) {
						this.value = normalizedColor
					}
					colorPicker.value = this.value;
				})
			}
			else if (entryOptions[field]?.options) {
				const select = createSelect(field, entryOptions[field]?.options, (entryOptions[field].type == "style" ? (state.currentEntry?.style?.[field] || "") : entryOptions[field].type == "key" ? (state.currentEntry?.[field] || "") : ""));
				fieldDiv.appendChild(select);
			}
			else {
				const input = document.createElement("input");
				input.type = "text";
				input.id = generateID();
				input.dataset.field = field;
				input.value = entryOptions[field].type == "style" ? (state.currentEntry?.style?.[field] || "") : entryOptions[field].type == "key" ? (state.currentEntry?.[field] || "") : ""
				input.dataset.oldValue = input.value;
				fieldDiv.appendChild(input);
			}
			
		});

		stylesWrap.appendChild(groupEl);
	});
}

async function buildSidebar() {
	const sidebar = document.getElementById("sidebar");
	
	clearSidebar();

	const selectorSection = document.createElement("section");
	selectorSection.className = "sidebar-section";
	selectorSection.dataset.section = "selectors";
	renderSelectors(selectorSection);
	sidebar.appendChild(selectorSection);

	const editSection = document.createElement("section");
	editSection.className = "sidebar-section";
	editSection.dataset.section = "edit-tools";
	renderEditControls(editSection);
	sidebar.appendChild(editSection);

	const addSection = document.createElement("section");
	addSection.className = "sidebar-section";
	addSection.dataset.section = "add-tools";
	renderAddTools(addSection);
	sidebar.appendChild(addSection);

	const miscSection = document.createElement("section");
	miscSection.className = "sidebar-section";
	miscSection.dataset.section = "misc-tools";
	renderMiscTools(miscSection);
	sidebar.appendChild(miscSection);

	if (!state.currentEntry) {
		editSection.hidden = true;
		miscSection.hidden = true;
	}

	handleDisplaySelects();

	addFieldEventListeners();
	addMiscEventListeners();
}

function consoleText(text, config = {}) {
	
	const { 
        duration = 2000, 
        position = "bottom-left", 
        id = generateID(),
    } = config;

	const con = document.getElementById("console");
	con.className = position;

    let p = document.createElement("span");
    p.textContent = text;
	p.id = id;
    con.appendChild(p);

    p.style.opacity = "1";

	if (duration != Infinity) {
		removeConsoleText(p.id, duration)
	}

    console.log(text);
}

function removeConsoleText(id, duration = 0) {
	const p = document.getElementById(id);
	if (!p) return;

	setInterval(function() {
		p.style.opacity = "0";

		setTimeout(function () {
			p.remove();
		}, 1000);
	}, duration);
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
				element.addEventListener("change", function() { handleIdChange(this,element.value,element.dataset.oldValue) });
				break;
			default:
				element.addEventListener("change", function() { handleFieldChange(this,element.value,element.dataset.field) });
				break;
		}

		
		if (["parent","row"].includes(element?.dataset?.field)) {
			element.addEventListener("change", buildSidebar);
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

	handleFieldChange(_this, _this.value,_this.dataset.field);
}


function handleDisplaySelects(_this = document.querySelector("#sidebar .sidebar-field.display select")) {
	if (!_this) return;
	const displaySelect = _this.parentElement.parentElement.querySelector(".display select");
	const elements = _this.parentElement.parentElement.querySelectorAll(".align-items select, .align-content select, .justify-content select, .flex-direction select, .flex-wrap select");

	elements.forEach(element => {
		element.disabled = !["flex","inline-flex"].includes(displaySelect.value);
	});
}

function handleFieldChange(_this,val,field) {
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
		if (!state.currentEntry) return;
		if (!field) return;
		
		switch (entryOptions[field]?.type) {
			case "style":
				state.currentEntry?.style = state.currentEntry?.style || {};
				state.currentEntry?.style[field] = val;
				val === "" && (delete state.currentEntry?.style?.[field]);
				break;
			case "key":
				state.currentEntry[field] = !isNaN(Number(val)) ? Number(val) : val;
				val === "" && (delete state.currentEntry?.[field]);
				break;
			default:
				break;
		}
		
		handleBuild();
		saveGuide();
	}
}



function isValidElementId(id) {
	if (typeof id !== 'string') return false;
    if (id.length === 0) return false;
    if (id.trim().length === 0) return false;
    if (id.includes(' ')) return false;
    if (!isValidCSSSelector(id)) return false;
    
    return true;
}

function isValidCSSSelector(id) {
    try {
        // This will throw if the selector is invalid
        document.querySelector(`#${id}`);
        return true;
    } catch (e) {
        return false;
    }
}

function handleIdChange(_this) {

	const newVal = _this.value;
	const oldVal = _this.dataset.oldValue;

	if (guideData.content.find(e => e.id === newVal)) {
		alert("ID already exists.")
		_this.value = oldVal;
		return;
	}

	if (!isValidElementId(newVal)) {
		alert("Invalid ID.")
		_this.value = oldVal;
		return;
	}

    const now = Date.now();
    const last = self.lastCall || 0;
    const delay = 150;


    if (now - last < delay) {
        if (!self.pending) {
            self.pending = setTimeout(() => {
                inputChange(_this);
                self.lastCall = Date.now();
                delete self.pending;
            }, delay - (now - last));
        }
        return;
    }

    inputChange(_this);
    self.lastCall = now;

	function inputChange(_this) {
		const newVal = _this.value;
		const oldVal = _this.dataset.oldValue;

		// update oldValue
		_this.dataset.oldValue = _this.value;

		// update entry id
		guideData.content.filter(e => e.id == oldVal).forEach(e => { e.id = newVal; });

		// update parents
		guideData.content.filter(e => e.parent == oldVal).forEach(e => { e.parent = newVal; });

		// update links
		guideData.content.forEach(entry => (entry.text) && (entry.text.toString().replace(new RegExp(`(link:'#)${oldVal}(';?)`, 'g'), `$1${newVal}$2`)));

		// update targets
		guideData.content.filter(e => e.target && e.target.includes(oldVal)).forEach(e => { 
			e.target = e.target.map(item => item === oldVal ? newVal : item);
		});

		handleBuild();
		buildSidebar();

		changePage(newVal)
		selectTarget(newVal);

		saveGuide();
	}
}

function addMiscEventListeners() {
	document.getElementById("sidebar-page-select").addEventListener("change", function() {handlePageSelect(this); document.getElementById("sidebar-page-select")?.focus();});
	document.getElementById("sidebar-element-select").addEventListener("change", function() {handleElementSelect(this);document.getElementById("sidebar-element-select")?.focus(); });
}

function handlePageSelect(_this = document.getElementById("sidebar-page-select")) {
	if (_this?.value) {
		clearSelection();
		changePage(_this.value);
		buildSidebar();
		handleElementSelect(document.getElementById("sidebar-element-select"))
	}
}
function handleElementSelect(_this = document.getElementById("sidebar-element-select")) {
	const val = _this.value;
	const entry = guideData.content.find(e => e.id == val)


	if (entry) {
		selectTarget(val);
		buildSidebar();
	}
	else {
		clearSelection();
	}
}





function clearSelection() {
	if (!state.currentEntry?.id) return;
	const el = document.getElementById(state.currentEntry?.id);
	if (!el) return;
	
	document.querySelectorAll(".editor-selected").forEach(e => {e.classList.remove("editor-selected")});
	
	state.currentEntry = null;
	buildSidebar();
}



function selectTarget(id) {
	if (!id) { console.error(`Invalid id: ${id}`); return};
	const entry = guideData.content.find(e => e.id == id);
	if (!entry) { console.error(`Invalid entry: ${id}`); return; }
	if (!entryTypes[entry?.type]) { console.error(`Invalid entry type: ${id}`); return; }

	const page = getEntryPage(entry.id);

	if (page?.id != state.currentPage?.id) {
		changePage(page?.id);
	}

	state.currentEntry = entry;
	
	const el = document.getElementById(id) || document.querySelector(`#content [data-id='${id}']`);
	if (el) {
		document.querySelectorAll(".editor-selected").forEach(e => {e.classList.remove("editor-selected")});
		el.classList.add("editor-selected");
	}
	else {
		console.warn(`Invalid el: ${id}`)
	}
}

function removeEntry(id) {
	const entryToRemove = guideData.content.find(e => e.id == id);
	if (!entryToRemove) return;

	if (state.currentEntry && confirm(`Warning: You're about to remove '${capitalizeString(entryToRemove.type)} (${entryToRemove.id})' and all of its content.\nProceed?`)) {
		
		const idsToRemove = [entryToRemove.id, ...collectDescendantIds(entryToRemove.id)];

		// remove ids
		guideData.content = guideData.content.filter(e => !idsToRemove.includes(e.id));

		// clean links
		for (const id of idsToRemove) {
			guideData.content.forEach(entry => (entry.text) && (entry.text.toString().replace(new RegExp(`(\\|[^|{]*?)link:'#${id}';?`, 'g'), '$1').replace(/;+/g, ';').replace(/\|;/g, '|').replace(/;\}/g, '}')));
		}

		// clean targets
		guideData.content = guideData.content.map(entry => entry.target ? { ...entry, target: entry.target.filter(id => !idsToRemove.includes(id)) } : entry);

		const currentPage = state.currentPage;
		handleBuild();
		saveGuide();

		clearSelection();

		changePage(currentPage);

	}
}
function cloneEntry() {
	if (state.currentEntry && confirm("Duplicate this element?")) {
		
	}
}
let copiedEntry = null;
document.addEventListener("keydown", (e) => {

	if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.isContentEditable) return;

	if (e.ctrlKey && e.key === 'c') {
		copiedEntry = !["page-nav"].includes(state.currentEntry?.type) ? state.currentEntry?.id : null;
		if (copiedEntry) {
			consoleText("Copy successful")
		}
	}

	if (e.ctrlKey && e.key === 'v') {
		if (copiedEntry) {
			for (const i of [1]) {
				let entry = { ...guideData.content.find(e => e.id == copiedEntry) }

				if (!entry) break;
		
				if (!entryTypes[entry.type]?.parentTypes.includes(state.currentEntry?.type) && !(entryTypes[entry.type]?.parentTypes.includes("base") && !state.currentEntry)) {
					consoleText("Not a valid parent");
					break;
				}

				const newId = copyPasteEntry(entry.id);
				if (newId) {

					handleBuild();
					saveGuide();
					
					const newPage = getEntryPage(newId);
					if (newPage) {
						changePage(newPage?.id);
					}
					
				
					selectTarget(newId);
					buildSidebar();
					
					consoleText("Paste successful");
				}
			}
		}
	}

	if (e.ctrlKey && e.key === 'b') {
		handleBuild(true);
	}

	switch (e.key) {
		case "Escape":
			if (state.currentEntry) {
				clearSelection();
			}
			else {
				closeSidebar();
			}
			closeMenu();
			break;
		case "Delete":
			if (state.currentEntry) {
				removeEntry(state.currentEntry?.id);
			}
			break;
		default:
			break;
	}
});

function copyPasteEntry(id, recursive = true) {
	const root = guideData.content.find(e => e.id === id);
	if (!root) return null;

	// 1) collect all IDs to copy (root + descendants)
	const toCopy = [id].concat(recursive ? collectDescendantIds(id) : []);

	// 2) allocate new IDs (oldId -> newId)
	const idMap = new Map();
	toCopy.forEach(oldId => idMap.set(oldId, generateID()));

	// 3) clone & insert copies (preserve relative structure)
	for (const oldId of toCopy) {
		const src = guideData.content.find(e => e.id === oldId);
		if (!src) continue;
		const copy = JSON.parse(JSON.stringify(src)); // plain-data deep clone
		copy.id = idMap.get(oldId);

		// root copy: attach to current selection (if present), otherwise keep original parent

		if (oldId === id) {
			if (state.currentEntry) {
				copy.parent = state.currentEntry?.id;
			}

			if (copy.type == "page" && copy.title) {
				const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				const base = copy.title.replace(/\s*\(\d+\)$/, '').trim();
				const rx = new RegExp(`^${escapeRegExp(base)}(?: \\((\\d+)\\))?$`);
				let max = 0;
				guideData.content.forEach(e => {
					if (!e.title) return;
					const m = e.title.match(rx);
					if (!m) return;
					const n = m[1] ? Number(m[1]) : 0;
					if (n > max) max = n;
				});
				copy.title = `${base} (${max + 1})`;
			}
		}
		else {
			copy.parent = idMap.get(src.parent) || src.parent;
		}

		guideData.content.push(copy);
	}

	// 4) remap internal references ONLY inside the newly-created copies
	const newIdsSet = new Set(Array.from(idMap.values()));
	const oldIds = Array.from(idMap.keys());

	guideData.content.forEach(entry => {
		if (!newIdsSet.has(entry.id)) return; // <-- IMPORTANT: update copied entries only

		// remap link:'#OLD' → link:'#NEW' for copied internal refs
		if (entry.text) {
		oldIds.forEach(oldRefId => {
			const newRefId = idMap.get(oldRefId);
			entry.text = entry?.text.toString().replace(
			new RegExp(`(link:'#)${oldRefId}(';?)`, 'g'),
			`$1${newRefId}$2`
			);
		});
		}

		// remap target arrays only for copied entries
		if (Array.isArray(entry.target)) {
		entry.target = entry.target.map(t => idMap.get(t) || t);
		}
	});

	return idMap.get(id); // return new root id
}


function isIgnoredElement(el) {
	if (!el) return false;

	return Object.entries(entryTypes).some(([type, config]) => {
		if (!config.ignore) return false;
		
		if (config.ignore === "element") {
			return el.dataset.type === type;
		}
		if (config.ignore === "closest") {
			return !!el.closest(`*[data-type='${type}']`);
		}
		return false;
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
		handleBuild(true);
		changePage(guideData.content.filter(e => e.type == "page").sort((a, b) => a.order - b.order)[0]?.id);
		buildSidebar();

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
	if (!data) return;
	["title","version","author","created","modified","content"].forEach(k => { if (data[k] == undefined) return; });

	guideData = new ManualSaveWrapper(data);
	initLoad();
	handleBuild(true);
	changePage(guideData.content.filter(e => e.type == "page").sort((a, b) => a.order - b.order)[0]?.id);
	buildSidebar();
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
		guideData = new ManualSaveWrapper(template_data);
		guideData.id = generateID();
		guideData.created = Date.now();
		guideData.modified = guideData.created;
		guideName && (guideData.title = guideName);

		initLoad();
		handleBuild(true);
		changePage(guideData.content.filter(e => e.type == "page").sort((a, b) => a.order - b.order)[0]?.id);
		buildSidebar();
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

async function buildData() {
	const content = document.getElementById("content");
    content.innerHTML = "";

	const data = guideData.content.filter(e => e.type === "page" || e.type === "navigator").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).flatMap(page => [page, ...getPageChildren(page.id)]);
	data.forEach(content => {
		const base = content.parent && (document.getElementById(`${content.parent}`)) || document.getElementById("content")
		base.innerHTML += buildContent(content)
	});
	
	const pageId = getEntryPage(state.currentEntry?.id)?.id;
	if (pageId) {
		changePage(pageId);
	}

	await renderDiagrams();

	const id = state.currentEntry?.id || document.getElementById("sidebar-element-select")?.value;
	id && (selectTarget(id));

	initDragDrop();
	handlePageSelect();

	document.querySelectorAll("#content a").forEach(a => {
		a.addEventListener("click", redirectHighlight);
	})

	document.querySelectorAll("#content a.link").forEach(e => {
		e.addEventListener("click", function() {
			const link = e.href.match(/#(.*)$/)?.[0];
			if (link) {
				let target = findById(link.slice(1));
				if (target) {
					let i = 0;
					while (target && target.type !== "page" && i < 10) {
						target = guideData.content.find(item => item.id === target.parent);
						i++;
					}

					target && (changePage(target.id));
				}
			}
		}) 
	})

	document.querySelectorAll("#content .spoiler").forEach(e => {
		e.dataset.spoiler = true;
		e.addEventListener("click", function() {
			this.dataset.spoiler = false;
		}) 
	})

	state.edited = false;
}


function initDragDrop() {
	if (typeof $ === 'undefined' || !$.ui || !$.ui.draggable) return;

	const $nodes = $('#content').find('[id],[data-id]').filter(function () { return this.dataset && this.dataset.type; });

	$nodes.each(function () {
		if ($(this).data('ui-draggable')) { try { $(this).draggable('destroy'); } catch(e){} }
		if ($(this).data('ui-droppable')) { try { $(this).droppable('destroy'); } catch(e){} }
	});

	if (!isEditor()) return;

	$nodes.draggable({
		helper: 'clone',
		revert: true,
		zIndex: 20000,
		start(event, ui) {
			const oe = event.originalEvent || {};
			const isModifier = !!(oe.ctrlKey || oe.altKey || oe.shiftKey);
			if (!isModifier) return false;

			const mode = oe.ctrlKey ? 'copy' : 'move';
			ui.helper.data('dragMode', mode);


			consoleText(mode == "copy" ? "Copying Element": "Moving Element", { duration: Infinity, id: "entryDrag" })

			const srcEl = this; // original DOM node
			const sourceId = $(srcEl).attr('id') || $(srcEl).data('id');
			ui.helper.data('sourceId', sourceId);
			ui.helper.data('sourceEl', srcEl);

			// hide original element using visibility (preserves layout)
			srcEl.style.visibility = 'hidden';
		},

		stop(_event, ui) {
			// always restore original element visibility (if it was hidden)
			const srcEl = ui.helper && ui.helper.data && ui.helper.data('sourceEl');
			if (srcEl && srcEl.style) srcEl.style.visibility = '';

			removeConsoleText("entryDrag")

			// cleanup helper data / UI cues
			ui.helper && ui.helper.removeData && ui.helper.removeData('sourceEl');
			$('.drop-target-valid, .drop-target-invalid').removeClass('drop-target-valid drop-target-invalid');
		}
	});

	$nodes.droppable({
		tolerance: 'pointer',
		greedy: true,
		over(_ev, ui) {
			if (!ui.helper || !ui.helper.data) return;
			const mode = ui.helper.data('dragMode');
			const sourceId = ui.helper.data('sourceId');
			if (!mode || !sourceId) return;

			const src = guideData.content.find(e => e.id === sourceId);
			const tgtId = $(this).attr('id') || $(this).data('id');
			const tgt = guideData.content.find(e => e.id === tgtId);
			const allowed = src && entryTypes[src.type]?.parentTypes || [];
			const isValid = !!src && !!tgt && allowed.includes(tgt.type);

			$(this).removeClass('drop-target-valid drop-target-invalid');
			$(this).addClass(isValid ? 'drop-target-valid' : 'drop-target-invalid');
		},
		out(_ev, ui) {
			$(this).removeClass('drop-target-valid drop-target-invalid');
		},
		drop(ev, ui) {
			$(this).removeClass('drop-target');
			const mode = ui.helper.data('dragMode');
			if (!mode) return;

			const sourceId = ui.helper.data('sourceId') || ui.draggable.attr('id') || ui.draggable.data('id');
			const targetId = $(this).attr('id') || $(this).data('id');
			if (!sourceId || !targetId || sourceId === targetId) return;

			const src = guideData.content.find(e => e.id === sourceId);
			const tgt = guideData.content.find(e => e.id === targetId);
			if (!src || !tgt) return;

			const allowed = entryTypes[src.type]?.parentTypes || [];
			if (!allowed.includes(tgt.type)) { 
				consoleText('Invalid drop target for this element'); return; 
			}

			if (mode === 'move') {
				src.parent = targetId;
				saveGuide();
				handleBuild();
				buildSidebar();
				selectTarget(src.id);
			}
			else if (mode === 'copy') {
				const newId = copyPasteEntry(src.id);
				if (!newId) return;
				const newEntry = guideData.content.find(e => e.id === newId);
				if (!newEntry) return;
				newEntry.parent = targetId;
				saveGuide();
				handleBuild();
				buildSidebar();
				selectTarget(newId);
			}
		}
	});
}
