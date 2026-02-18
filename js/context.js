function closeMenu() {
	document.getElementById("context-menu").dataset.open = "false";
}

function closeSidebar() {
	document.body.dataset.sidebar = false;
}

function loadMenu() {

	const actions = ["edit", "add", "remove", "close"]
	const menu = document.getElementById("context-menu");

	menu.innerHTML = ``;

	for (const a of actions) {

		const actionTitle = capitalizeString(a);

		const actionWrap = document.createElement("div");
		actionWrap.classList.add(a);
		menu.appendChild(actionWrap);

		const actionText = document.createElement("span");
		actionText.textContent = actionTitle;
		actionWrap.appendChild(actionText);

		switch (a) {
			case "add":
				const submenu = document.createElement("div");
				submenu.classList.add("submenu");
				submenu.dataset.open = false;
				actionWrap.appendChild(submenu);

				actionWrap.addEventListener("mouseenter", function(e) {
					submenu.dataset.open = true;

					setTimeout(() => {
						positionSubmenu(submenu, actionWrap);
					}, 0);
				})
				actionWrap.addEventListener("mouseleave", function(e) {
					submenu.dataset.open = false;
				})
				
				const items = Object.keys(entryTypes).filter(key => entryTypes[key].add === true);
				for (const i of items) {
					if (entryTypes[i].parentTypes && !entryTypes[i].parentTypes.includes(state.currentEntry?.type)) continue;
					if (i == "navigator" || i == "page") continue;
					if (i == "page-nav") {
						if (!guideData.content.find(e => e.type == "navigator")) continue;
						if (guideData.content.find(e => e.type == "page-nav" && e.parent == state.currentEntry?.id)) continue;
					}

					const itemTitle = capitalizeString(i);

					const itemWrap = document.createElement("div")
					itemWrap.dataset.action = "add";
					submenu.appendChild(itemWrap);

					const itemText = document.createElement("span")
					itemText.textContent = itemTitle;
					itemWrap.appendChild(itemText);

					if (entryTypes[i]?.svg) {
						const itemImg = document.createElement("img")
						itemImg.src = `data:image/svg+xml;base64,${btoa(entryTypes[i]?.svg)}`;
						itemImg.alt = itemTitle;
						itemWrap.appendChild(itemImg);
					}

					itemWrap.addEventListener("click", function() {
						addEntry(i,state.currentEntry?.id);
						closeMenu();
					})
				}

				function positionSubmenu(submenu, parentElement) {
					const parentRect = parentElement.getBoundingClientRect();
					
					// Show submenu first to get its dimensions
					submenu.dataset.open = true;
					const submenuRect = submenu.getBoundingClientRect();
					
					// Check available space
					const spaceOnRight = window.innerWidth - parentRect.right;
					const spaceOnLeft = parentRect.left;
					
					// Default: show on right side
					let showOnRight = true;
					let submenuLeft = parentRect.right;
					
					// If not enough space on right, show on left
					if (spaceOnRight < submenuRect.width && spaceOnLeft > submenuRect.width) {
						showOnRight = false;
						submenuLeft = parentRect.left - submenuRect.width;
					}
					
					// Set arrow position and rotation on parent
					if (showOnRight) {
						parentElement.style.setProperty('--arrow-left', 'auto');
						parentElement.style.setProperty('--arrow-right', '-6px');
						parentElement.style.setProperty('--arrow-rotate', '45deg'); // Original rotation
					} else {
						parentElement.style.setProperty('--arrow-left', '-6px');
						parentElement.style.setProperty('--arrow-right', 'auto');
						parentElement.style.setProperty('--arrow-rotate', '225deg'); // Rotated for left side
					}
					
					// Set submenu position
					submenu.style.left = `${submenuLeft-2}px`;
					submenu.style.top = `${parentRect.top-2}px`;
					
					// Adjust vertical position if needed
					if (parentRect.top + submenuRect.height > window.innerHeight) {
						submenu.style.top = `${window.innerHeight - submenuRect.height - 8}px`;
					}
					if (parentRect.top < 0) {
						submenu.style.top = '8px';
					}
				}


				break;
			case "edit":
				actionWrap.addEventListener("click", function() {
					openSidebar(true);
					closeMenu();
				});
				break;
			case "remove":
				actionWrap.addEventListener("click", function() {
					removeEntry(state.currentEntry?.id);
					closeMenu();
				});
				break;
			case "close":
				actionWrap.addEventListener("click", function() {
					closeMenu();
					closeSidebar();
				});
				break;
			default:
				break;
		}
	}




	

}





window.addEventListener('resize', () => {
	document.querySelectorAll('.submenu[data-open="true"]').forEach(submenu => {
		const parent = submenu.closest('div[data-action="Add"]');
		if (parent) {
			const parentRect = parent.getBoundingClientRect();
			positionSubmenu(submenu, parentRect);
		}
	});
});


function openMenu(x, y) {
	loadMenu();
	
	const menu = document.getElementById("context-menu");
	const hasSelection = !!state.currentEntry;
	const removeButton = menu.querySelector("button[data-action='remove']");
	if (removeButton) removeButton.hidden = !hasSelection;
	menu.dataset.open = true;
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


document.getElementById("context-menu").addEventListener("click", (e) => {
	e.stopPropagation();
	const action = e.target.closest("button")?.dataset.action;
	if (!action) return;

	switch (action) {
		case "edit":
			openSidebar(true);
			break;
		case "remove":
			removeEntry(state.currentEntry?.id);
			break;
		case "close":
			closeMenu();
			closeSidebar();
			break;
		default:
			break;
	}

	closeMenu();
});

document.addEventListener("mousedown", (e) => {
	if (!isEditor()) return;
	if (e.button === 2) return;
	if (document.getElementById("context-menu").dataset.open == "true" && !e.target.closest("#context-menu")) {
		closeMenu();
	}
}, true);


document.addEventListener("contextmenu", (e) => {
	if (!isEditor()) return;
	if (e.altKey) return;

	const el = getSelectableTarget(e.target.closest("#content *"));
	const id = el?.dataset.id || el?.id;
	if (!el || !id) return;
	e.preventDefault();
	selectTarget(id);

	buildSidebar();
	openMenu(e.clientX, e.clientY);
});

document.addEventListener("click", (e) => {
	if (!isEditor()) return;
	if (e.target.closest("#context-menu")) return;
	const inSidebar = e.target.closest("#sidebar");
	const inHeader = e.target.closest("header");
	const inContent = e.target.closest("#content");
	if (!inContent) {
		if (!inSidebar && !inHeader) {
			closeMenu();
		}
		return;
	}

	const el = getSelectableTarget(e.target.closest("#content *"));
	const id = el?.dataset.id || el?.id;

	if (!el || !id) return;
	selectTarget(id);
	buildSidebar();
	closeMenu();
});

document.addEventListener("dblclick", (e) => {
	if (!isEditor()) return;
	if (e.target.closest("#context-menu")) return;
	if (!e.target.closest("#content") || !e.target.closest("*[data-type][id]")) return;

	openSidebar(true);
});