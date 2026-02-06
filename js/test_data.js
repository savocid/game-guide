const test_data = {
	"title": "Test Guide",
	"version": "1.0",
	"author": "GameGuide",
	"created": "2026-02-05",
	"modified": "2026-02-05",

	"content": [
		{
			"type": "navigator",
			"id": "nav-1",
			"order": 0
		},
		{
			"type": "page",
			"id": "page-intro",
			"order": 0,
			"title": "Introduction",
			"style": {
				"min-height": "900px"
			}
		},
		{
			"type": "header",
			"id": "header-intro",
			"parent": "page-intro",
			"order": 0,
			"text": "Introduction"
		},
		{
			"type": "text",
			"id": "text-intro-1",
			"parent": "page-intro",
			"order": 1,
			"text": "This guide uses {[inline]|italic} styles, {[bold]|bold} emphasis, and {[links]|url:'#page-gear';} to move between sections."
		},
		{
			"type": "image",
			"id": "img-intro-1",
			"parent": "page-intro",
			"order": 2,
			"src": "./guide1/media/Dark_Chronicle_poster_3.png",
			"caption": "A mysterious relic",
			"style": {
				"width": "100%",
				"height": "360px",
				"float": "right",
				"max-width": "420px",
				"object-fit": "cover"
			}
		},
		{
			"type": "section",
			"id": "section-intro-1",
			"parent": "page-intro",
			"order": 3,
			"title": "Quick Start"
		},
		{
			"type": "sub-header",
			"id": "subheader-intro-1",
			"parent": "section-intro-1",
			"order": 0,
			"text": "Quick Start"
		},
		{
			"type": "panel",
			"id": "panel-intro-1",
			"parent": "section-intro-1",
			"order": 0,
			"style": {
				"max-width": "520px"
			}
		},
		{
			"type": "text",
			"id": "text-intro-2",
			"parent": "panel-intro-1",
			"order": 0,
			"text": "Start with the Town route, then detour to the Workshop for early upgrades."
		},
		{
			"type": "section",
			"id": "section-intro-2",
			"parent": "page-intro",
			"order": 4,
			"title": "Key Terms"
		},
		{
			"type": "sub-header",
			"id": "subheader-intro-2",
			"parent": "section-intro-2",
			"order": 0,
			"text": "Key Terms"
		},
		{
			"type": "text",
			"id": "text-intro-3",
			"parent": "section-intro-2",
			"order": 0,
			"text": "Focus on {[Core]|bold} stats early: power, stamina, and a dash of luck for rare drops."
		},
		{
			"type": "page",
			"id": "page-gear",
			"order": 1,
			"title": "Gear and Builds",
			"style": {
				"min-height": "900px"
			}
		},
		{
			"type": "header",
			"id": "header-gear",
			"parent": "page-gear",
			"order": 0,
			"text": "Gear and Builds"
		},
		{
			"type": "section",
			"id": "section-gear-1",
			"parent": "page-gear",
			"order": 1,
			"title": "Core Components"
		},
		{
			"type": "sub-header",
			"id": "subheader-gear-1",
			"parent": "section-gear-1",
			"order": 0,
			"text": "Core Components"
		},
		{
			"type": "table",
			"id": "table-gear-1",
			"parent": "section-gear-1",
			"order": 0,
			"style": {"margin": "0 auto", "max-width": "600px"},
			"table": {
				"headers": [
					{ "text": "Item", "colspan": 1 },
					{ "text": "Effect", "colspan": 1 },
					{ "text": "Notes", "colspan": 1 }
				],
				"rows": [
					[
						{ "text": "Steel Coil" },
						{ "text": "+12% crit" },
						{ "text": "Stacks with Arc buff" }
					],
					[
						{ "text": "Prism Lens" },
						{ "text": "+1 range" },
						{ "text": "Unlocks beam variant" }
					]
				]
			}
		},
		{
			"type": "section",
			"id": "section-gear-2",
			"parent": "page-gear",
			"order": 2,
			"title": "Upgrade Priority"
		},
		{
			"type": "sub-header",
			"id": "subheader-gear-2",
			"parent": "section-gear-2",
			"order": 0,
			"text": "Upgrade Priority"
		},
		{
			"type": "text",
			"id": "text-gear-1",
			"parent": "section-gear-2",
			"order": 0,
			"text": "Upgrade blade first, then armor. Save gold for the Tier-2 stabilizer."
		},
		{
			"type": "page",
			"id": "page-maps",
			"order": 2,
			"title": "Maps and Routes",
			"style": {
				"min-height": "900px"
			}
		},
		{
			"type": "header",
			"id": "header-maps",
			"parent": "page-maps",
			"order": 0,
			"text": "Maps and Routes"
		},
		{
			"type": "section",
			"id": "section-maps-1",
			"parent": "page-maps",
			"order": 1,
			"title": "Two-Stop Loop"
		},
		{
			"type": "sub-header",
			"id": "subheader-maps-1",
			"parent": "section-maps-1",
			"order": 0,
			"text": "Two-Stop Loop"
		},
		{
			"type": "text",
			"id": "text-maps-1",
			"parent": "section-maps-1",
			"order": 0,
			"text": "Harbor -> Market -> Harbor. Fast gold, minimal travel."
		},
		{
			"type": "tabs",
			"id": "tabs-maps-1",
			"parent": "section-maps-1",
			"order": 1,
			"tabs": {
				"tab-maps-early": {"title": "Early", "order": 0,},
				"tab-maps-mid": {"title": "Mid", "order": 1,},
				"tab-maps-late": {"title": "Late", "order": 2,}
			}
		},
		{
			"type": "text",
			"id": "text-maps-early-1",
			"parent": "tab-maps-early",
			"order": 0,
			"text": "Safe path: Harbor gate -> Market alley -> Docks. Prioritize vendors."
		},
		{
			"type": "text",
			"id": "text-maps-mid-1",
			"parent": "tab-maps-mid",
			"order": 0,
			"text": "Mid route: Switchyard -> Canal -> Market. Bring two stamina tonics."
		},
		{
			"type": "text",
			"id": "text-maps-late-1",
			"parent": "tab-maps-late",
			"order": 0,
			"text": "Late loop: Ridge -> Observatory -> Vault. Expect elite patrols."
		},
		{
			"type": "section",
			"id": "section-maps-2",
			"parent": "page-maps",
			"order": 2,
			"title": "Hazard Notes"
		},
		{
			"type": "sub-header",
			"id": "subheader-maps-2",
			"parent": "section-maps-2",
			"order": 0,
			"text": "Hazard Notes"
		},
		{
			"type": "text",
			"id": "text-maps-2",
			"parent": "section-maps-2",
			"order": 0,
			"text": "Avoid the flooded tunnel unless you have a light source. It drains stamina quickly."
		},
		{
			"type": "page",
			"id": "page-bosses",
			"order": 3,
			"title": "Boss Notes",
			"style": {
				"min-height": "900px"
			}
		},
		{
			"type": "header",
			"id": "header-bosses",
			"parent": "page-bosses",
			"order": 0,
			"text": "Boss Notes"
		},
		{
			"type": "section",
			"id": "section-bosses-1",
			"parent": "page-bosses",
			"order": 1,
			"title": "Phase Notes"
		},
		{
			"type": "sub-header",
			"id": "subheader-bosses-1",
			"parent": "section-bosses-1",
			"order": 0,
			"text": "Phase Notes"
		},
		{
			"type": "text",
			"id": "text-bosses-1",
			"parent": "section-bosses-1",
			"order": 0,
			"text": "Dodge the third slam, then counter during the glow window. {[Tip]|bold} Save burst for phase two."
		},
		{
			"type": "image",
			"id": "img-bosses-1",
			"parent": "section-bosses-1",
			"order": 1,
			"src": "./guide1/media/Dark_Chronicle_poster_3.png",
			"caption": "Warden silhouette",
			"style": {
				"width": "100%",
				"height": "260px",
				"object-fit": "cover"
			}
		}
		,
		{
			"type": "section",
			"id": "section-bosses-2",
			"parent": "page-bosses",
			"order": 2,
			"title": "Loot Table"
		},
		{
			"type": "sub-header",
			"id": "subheader-bosses-2",
			"parent": "section-bosses-2",
			"order": 0,
			"text": "Loot Table"
		},
		{
			"type": "table",
			"id": "table-bosses-1",
			"parent": "section-bosses-2",
			"order": 0,
			"style": {"margin": "0 auto", "max-width": "520px"},
			"table": {
				"headers": [
					{ "text": "Drop", "colspan": 1 },
					{ "text": "Chance", "colspan": 1 }
				],
				"rows": [
					[
						{ "text": "Warden Core" },
						{ "text": "12%" }
					],
					[
						{ "text": "Iron Sigil" },
						{ "text": "35%" }
					]
				]
			}
		}
	]
}