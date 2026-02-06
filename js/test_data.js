const test_data = {
	"title": "Test Guide",
	"version": "1.0",
	"author": "GameGuide",
	"created": "2026-02-05",
	"modified": "2026-02-05",

	"content": [
		{
			"type": "page",
			"id": "a786ef2a-12sb-4657-b403-765c64d3d8d2",
			"order": 0,
			"title": "Introduction"
		},
		{
			"type": "header",
			"id": "a786ef2a-12eb-4657-b403-765c64d3d8d2",
			"parent": "a786ef2a-12sb-4657-b403-765c64d3d8d2",
			"order": 0,
			"text": "Welcome to the {[Guide]|url:'#a786ef2a-12eb-4657-b403-765c64d3d8d2';}"
		},
		{
			"type": "image",
			"id": "a786eb2a-12eb-4657-b403-765c64d3d8d2",
			"parent": "a786ef2a-12sb-4657-b403-765c64d3d8d2",
			"order": 0,
			"src": "./guide1/media/Dark_Chronicle_poster_3.png",
			"caption": "Dark Chronicle",
			"style": {
				"width": "50%",
				"height": "1000px",
				"float": "right",
				"max-width": "400px",
	
				"object-fit": "fill"
			}
		},
		{
			"type": "section",
			"id": "a786efsa-12eb-4657-b403-765c64d3d8d2",
			"parent": "a786ef2a-12sb-4657-b403-765c64d3d8d2",
			"order": 0,
			"title": "The Bombs"
		},
		{
			"type": "panel",
			"id": "a786ef2a-12eb-4657-b403-765c64d3d2d2",
			"parent": "a786efsa-12eb-4657-b403-765c64d3d8d2",
			"order": 0,
			"style": {
				"width": "500px",
				"background": "red"
			}
		},
		{
			"type": "tabs",
			"id": "a786ef2a-12eb-4657-b403-7s5c64d3d2d2",
			"parent": "a786ef2a-12eb-4657-b403-765c64d3d2d2",
			"order": 0,
			"tabs": {
				"a786ef2a-12eb-4657-b403-7s5f64d3d2d2": {"title": "Old", "order": 0},
				"a786ef2a-12eb-4257-b403-7s5c64d3d2d2": {"title": "New", "order": 1, "style": {} },
				"a786ef2a-12eb-23-b403-7s5c64d3d2d2": {"title": "Newest", "order": 2}
			}
		},
		{
			"type": "table",
			"id": "a786ef2a-12eb-4657-b403-765c6423d2d2",
			"parent": "a786ef2a-12eb-4257-b403-7s5c64d3d2d2",
			"order": 0,
			"style": {"margin": "0 auto"},
			"table": {
				"headers": [
					{ "text": "Employee", "colspan": 1 },
					{ "text": "Contact Info", "colspan": 2 }
				],
				"rows": [
					[
						{ "text": "John Doe", "rowspan": 2 },
						{ "text": "Email:", "colspan": 1 }
					],
					[
						{ "text": "Phone:", "colspan": 1 }
					],
					[
						{ "text": "No contact info", "colspan": 2 }
					]
				]
			}
		}
	]
}