
function getPages() {
	return guideData.content.filter(e => e.type === "page" || e.type === "navigator")
}

function getCurrentPage() {
	return document.querySelector("#content > .page[data-page-open]") || getPages()[0] || null;
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

			
function normalizeColor(color) {
	const ctx = document.createElement('canvas').getContext('2d');
	ctx.fillStyle = color;
	return ctx.fillStyle;
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
