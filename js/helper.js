
function getPages() {
	return guideData.content.filter(e => e.type === "page" || e.type === "navigator")
}

function getCurrentPage() {
	return guideData.content.find(e => e.id == document.querySelector("#content > *[data-open='true']")?.id);
}

function getPageChildren(id, excludeBranchId = null) {
    const children = [];
    
    function collectChildren(parentId) {
        const directChildren = guideData.content
            .filter(e => e.parent === parentId)
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            
        directChildren.forEach(child => {
            // Skip if this child is part of the excluded branch
            if (excludeBranchId && child.id === excludeBranchId) {
                return; // Skip this entire branch
            }
            
            children.push(child);
            collectChildren(child.id);
        });
    }
    
    collectChildren(id);
    return children;
}

function getElementPage(id) {
  const element = document.querySelector(`*[data-id='${id}']`) || document.getElementById(id);
  
  if (!element) return null;
  
  let current = element;
  while (current && current.getAttribute('data-type') !== 'page') {
    current = current.parentElement;
  }
  
  return current;
}
function getEntryPageId(id) {
	if (!id) return null;

	let current = guideData.content.find(e => e.id === id);
	while (current && !["page", "navigator"].includes(current.type)) {
		current = guideData.content.find(e => e.id === current.parent);
	}

	return current?.id || null;
}

function isVisible(el) {
	return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function getElementType(el) {
	if (!el) return "";
	return entryTypes[el?.dataset?.type] || "";
}

function getSelectableTarget(el) {
	if (!el) return null;
	return el.closest(Object.keys(entryTypes).map(type => `[data-type="${type}"]`).join(","));
}

function getEntryFamily(entry) {
 	return guideData.content.filter(e => e.parent === entry.parent);
}

function capitalizeString(str) {
	return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

			
function normalizeColor(color) {
	const ctx = document.createElement('canvas').getContext('2d');
	ctx.fillStyle = color;
	return ctx.fillStyle;
}

function generateID(prefix = 'id') {
	return `${prefix}-${crypto.randomUUID()}`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}



const collectDescendantIds = (parentId) => {
	let ids = [];
	let children = guideData.content.filter(e => e.parent === parentId);
	
	children.forEach(child => {
		ids.push(child.id);
		ids = ids.concat(collectDescendantIds(child.id));
	});
	
	return ids;
};


function addStyles(styleObj, include = [], exclude = []) {
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

	if (!styleObj) return '';
	const list = include.length ? include : styles;
	return list
		.filter(prop => !exclude.includes(prop))
		.map(prop => (styleObj[prop] ? `${prop}:${styleObj[prop]};` : ''))
		.join('');
}
