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
			"order": 1
		},
		{
			"type": "page",
			"id": "page-intro",
			"order": 2,
			"title": "Introduction",
		},
		{
			"type": "header",
			"id": "header-intro",
			"parent": "page-intro",
			"order": 1,
			"text": "Introduction"
		},
		{
			"type": "text",
			"id": "text-intro-1",
			"parent": "page-intro",
			"order": 2,
			"text": "This guide uses {[inline]|italic} styles, {[bold]|bold} emphasis, and {[links]|url:'#page-gear';} to move between sections."
		},
		{
			"type": "panel",
			"id": "panel-intro-image-1",
			"parent": "page-intro",
			"order": 3,
			"style": {
				"width": "100%",
				"height": "360px",
				"float": "right",
				"max-width": "420px",
				"object-fit": "cover",
				"display": "block"
			}
		},
		{
			"type": "image",
			"id": "img-intro-1",
			"parent": "panel-intro-image-1",
			"order": 3,
			"src": "./guide1/media/Dark_Chronicle_poster_3.png",
			"caption": "A mysterious relic",
			"style": {
				"object-fit": "cover",
				"border-radius":"0.5rem",
			}
		},
		{
			"type": "section",
			"id": "section-intro-1",
			"parent": "page-intro",
			"order": 9999,
			"title": "Quick Start"
		},
		{
			"type": "sub-header",
			"id": "subheader-intro-1",
			"parent": "section-intro-1",
			"order": 1,
			"text": "Quick Start"
		},
		{
			"type": "panel",
			"id": "panel-intro-1",
			"parent": "section-intro-1",
			"order": 1,
			"style": {
				"max-width": "520px",
				"text-align": "center",
				"display": "flex",
				"flex-direction": "row",
				"align-items": "center",
				"flex-wrap": "wrap",
				"border-color": "#900e0e"
			}
		},
		{
			"type": "panel",
			"id": "panels-panel-1",
			"parent": "panel-intro-1",
			"order": 2,
			"style": {
				"width": "50%"
			}
		},
		{
			"type": "panel",
			"id": "panels-panel-2",
			"parent": "panel-intro-1",
			"order": 3,
			"style": {
				"width": "50%",
				"border": "solid rgba(0,0,0,0.2)",
				"border-width": "0 0 0 1px"
			}
		},
		{
			"type": "panel",
			"id": "panels-panel-3",
			"parent": "panel-intro-1",
			"order": 4,
			"style": {
				"width": "100%",
				"border": "solid rgba(0,0,0,0.2)",
				"border-width": "1px 0 0 0"
			}
		},
		{
			"type": "text",
			"id": "text-intro-2",
			"parent": "panels-panel-1",
			"order": 1,
			"text": "Start with the Town route, then detour to the Workshop for early upgrades."
		},
		{
			"type": "text",
			"id": "text-intro-3",
			"parent": "panels-panel-2",
			"order": 1,
			"text": "Then do this and that."
		},
		{
			"type": "text",
			"id": "text-intro-4",
			"parent": "panels-panel-3",
			"order": 1,
			"text": "Welcome to the sentence of doom, eredar lord of the burning legion."
		},
		{
			"type": "section",
			"id": "section-intro-2",
			"parent": "page-intro",
			"order": 5,
			"title": "Key Terms"
		},
		{
			"type": "sub-header",
			"id": "subheader-intro-2",
			"parent": "section-intro-2",
			"order": 1,
			"text": "Key Terms"
		},
		{
			"type": "text",
			"id": "text-intro-5",
			"parent": "section-intro-2",
			"order": 1,
			"text": "Focus on {[Core]|bold} stats early: power, stamina, and a dash of luck for rare drops."
		},
		{
			"type": "page",
			"id": "page-gear",
			"order": 3,
			"title": "Gear and Builds",
		},
		{
			"type": "header",
			"id": "header-gear",
			"parent": "page-gear",
			"order": 1,
			"text": "Gear and Builds"
		},
		{
			"type": "section",
			"id": "section-gear-1",
			"parent": "page-gear",
			"order": 2,
			"title": "Core Components"
		},
		{
			"type": "sub-header",
			"id": "subheader-gear-1",
			"parent": "section-gear-1",
			"order": 1,
			"text": "Core Components"
		},
		{
			"type": "table",
			"id": "table-gear-1",
			"parent": "section-gear-1",
			"order": 1,
			"style": {"max-width": "600px"},
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
			"order": 3,
			"title": "Upgrade Priority"
		},
		{
			"type": "sub-header",
			"id": "subheader-gear-2",
			"parent": "section-gear-2",
			"order": 1,
			"text": "Upgrade Priority"
		},
		{
			"type": "text",
			"id": "text-gear-1",
			"parent": "section-gear-2",
			"order": 1,
			"text": "Upgrade blade first, then armor. Save gold for the Tier-2 stabilizer."
		},
		{
			"type": "page",
			"id": "page-maps",
			"order": 4,
			"title": "Maps and Routes",
		},
		{
			"type": "header",
			"id": "header-maps",
			"parent": "page-maps",
			"order": 1,
			"text": "Maps and Routes"
		},
		{
			"type": "section",
			"id": "section-maps-1",
			"parent": "page-maps",
			"order": 2,
			"title": "Two-Stop Loop"
		},
		{
			"type": "sub-header",
			"id": "subheader-maps-1",
			"parent": "section-maps-1",
			"order": 1,
			"text": "Two-Stop Loop"
		},
		{
			"type": "text",
			"id": "text-maps-1",
			"parent": "section-maps-1",
			"order": 1,
			"text": "Harbor -> Market -> Harbor. Fast gold, minimal travel."
		},
		{
			"type": "tabs",
			"id": "tabs-maps-1",
			"parent": "section-maps-1",
			"order": 2,
		},
		{
			"type": "tab",
			"id": "tab-maps-early",
			"parent": "tabs-maps-1",
			"order": 1,
			"title": "Early",
		},
		{
			"type": "tab",
			"id": "tab-maps-mid",
			"parent": "tabs-maps-1",
			"order": 2,
			"title": "Mid",
		},
		{
			"type": "tab",
			"id": "tab-maps-late",
			"parent": "tabs-maps-1",
			"order": 3,
			"title": "Late",
		},
		{
			"type": "text",
			"id": "text-maps-early-1",
			"parent": "tab-maps-early",
			"order": 1,
			"text": "Safe path: Harbor gate -> Market alley -> Docks. Prioritize vendors."
		},
		{
			"type": "text",
			"id": "text-maps-mid-1",
			"parent": "tab-maps-mid",
			"order": 1,
			"text": "Mid route: Switchyard -> Canal -> Market. Bring two stamina tonics."
		},
		{
			"type": "text",
			"id": "text-maps-late-1",
			"parent": "tab-maps-late",
			"order": 1,
			"text": "Late loop: Ridge -> Observatory -> Vault. Expect elite patrols."
		},
		{
			"type": "section",
			"id": "section-maps-2",
			"parent": "page-maps",
			"order": 3,
			"title": "Hazard Notes"
		},
		{
			"type": "sub-header",
			"id": "subheader-maps-2",
			"parent": "section-maps-2",
			"order": 1,
			"text": "Hazard Notes"
		},
		{
			"type": "text",
			"id": "text-maps-2",
			"parent": "section-maps-2",
			"order": 1,
			"text": "Avoid the flooded tunnel unless you have a light source. It drains stamina quickly."
		},
		{
			"type": "page",
			"id": "page-bosses",
			"order": 5,
			"title": "Boss Notes",
		},
		{
			"type": "header",
			"id": "header-bosses",
			"parent": "page-bosses",
			"order": 1,
			"text": "Boss Notes"
		},
		{
			"type": "section",
			"id": "section-bosses-1",
			"parent": "page-bosses",
			"order": 2,
			"title": "Phase Notes"
		},
		{
			"type": "sub-header",
			"id": "subheader-bosses-1",
			"parent": "section-bosses-1",
			"order": 1,
			"text": "Phase Notes"
		},
		{
			"type": "text",
			"id": "text-bosses-1",
			"parent": "section-bosses-1",
			"order": 1,
			"text": "Dodge the third slam, then counter during the glow window. {[Tip]|url:'#Wrench'} Save burst for phase two."
		},
		{
			"type": "image",
			"id": "img-bosses-1",
			"parent": "section-bosses-1",
			"order": 2,
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
			"order": 3,
			"title": "Loot Table"
		},
		{
			"type": "sub-header",
			"id": "subheader-bosses-2",
			"parent": "section-bosses-2",
			"order": 1,
			"text": "Loot Table"
		},
		{
			"type": "table",
			"id": "table-bosses-1",
			"parent": "section-bosses-2",
			"order": 1,
			"style": {"max-width": "520px"},
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
		},
		{
			"type": "page",
			"id": "page-weapons",
			"order": 6,
			"title": "Weapons"
		},
		{
			"type": "header",
			"id": "header-weapons",
			"parent": "page-weapons",
			"order": 1,
			"text": "Weapons"
		},
		{
			"type": "section",
			"id": "section-wrenches",
			"parent": "page-weapons",
			"order": 2,
			"title": "Wrenches"
		},
		{
			"type": "sub-header",
			"id": "subheader-wrenches",
			"parent": "section-wrenches",
			"order": 1,
			"text": "Wrenches"
		},
		{
			"type": "table",
			"id": "table-wrenches-1",
			"parent": "section-wrenches",
			"order": 2,
			"style": {"max-width": "100%"},
			"table": {
				"headers": [
					{ "text": "Weapon" },
					{ "text": "Combos" },
					{ "text": "SP" },
					{ "text": "Base ABS" },
					{ "text": "Build Up" },
					{ "text": "Obtained" }
				],
				"rows": [
					[
						{ "text": "Wrench", "id": "Wrench", "parent":"section-wrenches",},
						{ "text": "5" },
						{ "text": "3" },
						{ "text": "32" },
						{ "text": "N/A" },
						{ "text": "Intro sequence only" }
					],
					[
						{ "text": "Battle Wrench" },
						{ "text": "5" },
						{ "text": "3" },
						{ "text": "32" },
						{ "text": "Drill Wrench, True Battle Wrench" },
						{ "text": "Buy from Milane for 200 Gilda" }
					],
					[
						{ "text": "True Battle Wrench" },
						{ "text": "5" },
						{ "text": "3" },
						{ "text": "32" },
						{ "text": "Drill Wrench" },
						{ "text": "Find or build up" }
					],
					[
						{ "text": "Drill Wrench" },
						{ "text": "5" },
						{ "text": "3" },
						{ "text": "64" },
						{ "text": "Smash Wrench" },
						{ "text": "Buy from Milane for 350 Gilda (Chapter 2+)" }
					]
				]
			}
		},
		{
			"type": "text",
			"id": "text-wrenches-stats",
			"parent": "section-wrenches",
			"order": 3,
			"text": "{[Min/Max Stats]|bold}: All wrenches share similar stat ranges. Wrench & Battle Wrench have Min (8/10/2/0/0/0/5/0/0/0) and Max (20/19/19/19/19/19/19/19/19/19). True Battle Wrench has Min (13/11/2/0/0/0/5/0/0/0). Drill Wrench upgrades to Min (15/11/2/0/0/0/9/0/5/0) and Max (35/34/34/34/34/34/34/34/34/34)."
		},
		{
			"type": "section",
			"id": "max-weapons",
			"parent": "page-intro",
			"order": 6,
			"title": "Max Weapons",
			"style": {
				"width": "auto",
				"text-align": "center"
			},
		},
		{
			"type": "sub-header",
			"id": "max-weapons-header",
			"parent": "max-weapons",
			"order": 3,
			"text": "Max Weapons",
			"style": {
				"justify-self": "center",
			},
		},
		{
			"type": "diagram",
			"id": "weapon-diagram",
			"parent": "max-weapons",
			"order": 5,
			"direction": "LR",
			"nodes": [
				{ "id": "battle_wrench", "text": "Battle Wrench" },
				{ "id": "drill_wrench", "text": "Drill Wrench" },
				{ "id": "smash_wrench", "text": "Smash Wrench" },
				{ "id": "stinger_wrench", "text": "Stinger Wrench" },
				{ "id": "poison_wrench", "text": "Poison Wrench" },
				{ "id": "sigma_breaker", "text": "Sigma Breaker" },
				{ "id": "grade_zero", "text": "Grade Zero" },

				{ "id": "true_battle_wrench", "text": "True Battle Wrench" },
				{ "id": "frozen_tuna", "text": "Frozen Tuna" },
				{ "id": "cubic_hammer", "text": "Cubic Hammer" },
				{ "id": "digi_hammer", "text": "Digi Hammer" },
				{ "id": "heavy_hammer", "text": "Heavy Hammer" },
				{ "id": "legend", "text": "Legend" },

				{ "id": "turtle_shell_hammer", "text": "Turtle Shell Hammer" },
				{ "id": "kuberas_hand", "text": "Kubera's Hand" },
				{ "id": "big_bucks_hammer", "text": "Big Bucks Hammer" },

				{ "id": "handy_stick", "text": "Handy Stick" },

				{ "id": "turkey", "text": "Turkey" },
				{ "id": "swan", "text": "Swan\n{[At]|color:red}: 24 • Ch: 10 • Cy: 10" },
				{ "id": "flamingo", "text": "Flamingo" },
				{ "id": "falcon", "text": "Falcon" },
				{ "id": "albatross", "text": "Albatross" }
			],
			"links": [
				{ "source": "battle_wrench", "target": "drill_wrench" },
				{ "source": "drill_wrench", "target": "smash_wrench" },
				{ "source": "smash_wrench", "target": "stinger_wrench" },
				{ "source": "stinger_wrench", "target": "poison_wrench" },
				{ "source": "poison_wrench", "target": "sigma_breaker" },
				{ "source": "sigma_breaker", "target": "grade_zero" },

				{ "source": "true_battle_wrench", "target": "drill_wrench" },
				{ "source": "true_battle_wrench", "target": "frozen_tuna" },

				{ "source": "frozen_tuna", "target": "cubic_hammer" },
				{ "source": "cubic_hammer", "target": "digi_hammer" },
				{ "source": "digi_hammer", "target": "heavy_hammer" },
				{ "source": "heavy_hammer", "target": "legend" },

				{ "source": "turtle_shell_hammer", "target": "kuberas_hand" },
				{ "source": "kuberas_hand", "target": "big_bucks_hammer" },
				{ "source": "frozen_tuna", "target": "big_bucks_hammer" },

				{ "source": "turkey", "target": "flamingo" },
				{ "source": "swan", "target": "flamingo" },
				{ "source": "flamingo", "target": "falcon" },
				{ "source": "falcon", "target": "albatross" }
			]
		},
		{
			"type": "footer",
			"id": "footer-intro",
			"parent": "page-intro",
			"order": 9999
		},
		{
			"type": "footer",
			"id": "footer-gear",
			"parent": "page-gear",
			"order": 4
		},
		{
			"type": "footer",
			"id": "footer-maps",
			"parent": "page-maps",
			"order": 4
		},
		{
			"type": "footer",
			"id": "footer-bosses",
			"parent": "page-bosses",
			"order": 4
		},
		{
			"type": "footer",
			"id": "footer-weapons",
			"parent": "page-weapons",
			"order": 3
		},
	]
}