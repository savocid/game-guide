
function getPages() {
	return guideData.content.filter(e => e.type === "page" || e.type === "navigator")
}

function getCurrentPage() {
	return document.querySelector("#content > .page[data-page-open]") || getPages()[0] || null;
}

function getPageChildren(id) {
    const children = [];
    function collectChildren(parentId) {
        const directChildren = guideData.content
            .filter(e => e.parent === parentId)
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        directChildren.forEach(child => {
            children.push(child);
            collectChildren(child.id);
        });
    }
    collectChildren(id);

	return children;
}

function getElementType(el) {
	if (!el) return "";
	return selectableTypes.find(type => el.classList.contains(type)) || "";
}

function getSelectableTarget(el) {
	if (!el) return null;
	return el.closest(selectableTypes.map(type => `.${type}`).join(","));
}

function getEntryFamily(entry) {
 	return guideData.content.filter(e => e.parent === entry.parent);
}

function capitalizeString(str) {
	return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}