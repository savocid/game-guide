
// Function to update order in table
function updateTableOrder(id, newOrder) {
	const entry = guideData.content.find(e => e.id == id);
	if (entry) {
		entry.order = newOrder;
	}
}

// Function to update group key
function updateGroupKey(id, groupKey, groupValue) {
	const entry = guideData.content.find(e => e.id == id);
	if (entry && groupKey) {
		entry[groupKey] = groupValue;
	}
}

// Function to update order numbers
// Function to update order numbers
function updateOrderNumbers(container) {
	$(container).find(".sort > div").each(function(index) {
		const $el = $(this);
		const id = $el.attr("data-id");
		
		// Skip items with no-sort class - they should keep their special order
		if ($el.hasClass("no-sort")) {
			// Make sure they have the correct data-order attribute
			const $firstCheckbox = $el.find("label:has(span:contains('First')) input");
			const $lastCheckbox = $el.find("label:has(span:contains('Last')) input");
			
			if ($firstCheckbox.prop("checked")) {
				$el.attr("data-order", -1);
				updateTableOrder(id, -1);
			} else if ($lastCheckbox.prop("checked")) {
				$el.attr("data-order", 9999);
				updateTableOrder(id, 9999);
			}
			return; // Skip to next element
		}
		
		// For non-special items, count only other non-special items
		const $allRegularItems = $(container).find(".sort > div:not(.no-sort)");
		const regularIndex = $allRegularItems.index($el);
		
		if (regularIndex !== -1) {
			const order = regularIndex + 1;
			$el.attr("data-order", order);
			updateTableOrder(id, order);
		}
	});

	refreshBuild();
	refreshSidebar();
	saveGuide();
}

// Function to initialize sortable for a container
function initSortable(container) {
	const $container = $(container);
	
	if ($container.hasClass("ui-sortable")) {
		$container.sortable("destroy");
	}
	
	$container.sortable({
		connectWith: ".sort",
		containment: container.parentElement,
		axis: "y",
		placeholder: "ui-state-highlight",
		items: "> div:not(.no-sort)",
		stop: function(event, ui) {
			updateOrderNumbers($(this).parent());
		},
		receive: function(event, ui) {
			const $targetParent = $(this);
			const $targetGroup = $targetParent.closest(".sort-group");
			const $sourceSort = ui.sender;
			
			// Get group information from target
			const targetGroupTitle = $targetParent.data("group");
			const targetGroupKey = $targetParent.data("groupkey");
			
			// Get the dragged item's id
			const itemId = ui.item.attr("data-id");
			
			// Update group key in table if target has a group key
			if (targetGroupKey && targetGroupTitle !== undefined) {
				updateGroupKey(itemId, targetGroupKey, targetGroupTitle);
			}
			
			// Check if the dragged item has the no-sort class
			if (ui.item.hasClass("no-sort")) {
				const order = ui.item.attr("data-order");
				if (order === "-1") {
					const $firstItems = $targetParent.children('[data-order="-1"]');
					if ($firstItems.length) {
						ui.item.insertAfter($firstItems.last());
					} else {
						$targetParent.prepend(ui.item);
					}
				} else if (order === "9999") {
					const $lastItems = $targetParent.children('[data-order="9999"]');
					if ($lastItems.length) {
						ui.item.insertAfter($lastItems.last());
					} else {
						$targetParent.append(ui.item);
					}
				}
			}
			
			updateOrderNumbers($(this).parent());
		}
	}).disableSelection();


	$container.find("div[data-id]").each(function() {
		const $this = $(this);
		const id = $this.data("id");
		
		
		$this.on("mouseenter", function() {
			const el = document.querySelector(`#content #${id}`);
			if (el && !el.classList.contains("editor-selected")) {
				el.classList.add("order-highlight");
			}
		});

		$this.on("mouseleave", function() {
			const el = document.querySelector(`#content #${id}`);
			if (el) {
				el.classList.remove("order-highlight");
			}
		});

		$this.on("dblclick", function() {
			const el = document.querySelector(`#content #${id}`);
			if (el) {
				selectTarget(el);
				refreshSidebar();
			}
		});
		
		
	});
}

// Function to build HTML from data
function buildOrderSort(configs) {
	let containerId = 'container-' + Date.now();
	let $container = $(`<div class="sort-container" id="${containerId}"></div>`);
	
	configs.forEach((config, index) => {
		const { data, groupTitle, groupKey } = config;
		
		let $groupWrapper = $(`<div class="sort-group"></div>`);
		
		// Add group header if groupTitle exists
		if (groupTitle !== undefined) {
			$groupWrapper.append(`<div class="group-header">${capitalizeString(groupKey)}: ${groupTitle}</div>`);
		}
		
		let $sortDiv = $(`<div class="sort" data-group="${groupTitle !== undefined ? groupTitle : ''}" data-groupkey="${groupKey || ''}"></div>`);
		
		// Sort data by order
		const sortedData = [...data].sort((a, b) => {
			if (a.order === -1) return -1;
			if (b.order === -1) return 1;
			if (a.order === 9999) return 1;
			if (b.order === 9999) return -1;
			return a.order - b.order;
		});
		
		// Build elements
		sortedData.forEach(item => {
			const isFirst = item.order === -1;
			const isLast = item.order === 9999;
			const isCurrent = item.id == state.selected.entry.id;
			
			let $div = $(`
				<div data-id="${item.id}" class="${isFirst || isLast ? 'no-sort' : ''}" data-current="${isCurrent}" data-order="${item.order}">
					<label for='${item.id}-firstOrderCheckbox'><span>First</span><input type="checkbox" id='${item.id}-firstOrderCheckbox' ${isFirst ? 'checked' : ''}></label>
					<span>${capitalizeString(item.type)} (${item.id})</span>
					<label for='${item.id}-lastOrderCheckbox'><span>Last</span><input type="checkbox" id='${item.id}-lastOrderCheckbox' ${isLast ? 'checked' : ''}></label>
				</div>
			`);
			
			$sortDiv.append($div);
		});
		
		$groupWrapper.append($sortDiv);
		$container.append($groupWrapper);
		
		// Initialize checkboxes for this group
		$sortDiv.find("> div").each(function() {
			const $el = $(this);
			const $firstCheckbox = $el.find("label:has(span:contains('First')) input");
			const $lastCheckbox = $el.find("label:has(span:contains('Last')) input");
	
			$firstCheckbox.on("change", handleSpecialOrderCheckbox($el, $container, $sortDiv, groupKey, groupTitle, 'first'));
			$lastCheckbox.on("change", handleSpecialOrderCheckbox($el, $container, $sortDiv, groupKey, groupTitle, 'last'));

			function handleSpecialOrderCheckbox($el, $container, $sortDiv, groupKey, groupTitle, type) {
				const isFirst = type === 'first';
				const orderValue = isFirst ? -1 : 9999;
				const oppositeSelector = isFirst ? 'last' : 'first';
				const $thisCheckbox = $el.find(`label:has(span:contains('${capitalizeString(type)}')) input`);
				const $oppositeCheckbox = $el.find(`label:has(span:contains('${capitalizeString(oppositeSelector)}')) input`);
				
				return function() {
					if (this.checked) {
						$oppositeCheckbox.prop("checked", false);
						
						const $sameTypeItems = $el.parent().children(`[data-order="${orderValue}"]`);
						
						if ($sameTypeItems.length === 0) {
							isFirst ? $el.parent().prepend($el) : $el.parent().append($el);
						} else {
							$el.insertAfter($sameTypeItems.last());
						}
						
						$el.attr("data-order", orderValue).addClass("no-sort");
						updateTableOrder($el.attr("data-id"), orderValue);
						
						if (groupKey) {
							updateGroupKey($el.attr("data-id"), groupKey, groupTitle);
						}
					} else {
						$el.removeClass("no-sort").removeAttr("data-order");
						
						const $sameTypeItems = $el.parent().children(`[data-order="${orderValue}"]`);
						const $regularItems = $el.parent().children(':not(.no-sort)');
						
						if (isFirst) {
							// For First: place after last first item or before first regular item
							$sameTypeItems.length ? 
								$el.insertAfter($sameTypeItems.last()) : 
								$el.insertBefore($regularItems.first());
						} else {
							// For Last: place before first last item or after last regular item
							$sameTypeItems.length ? 
								$el.insertBefore($sameTypeItems.first()) : 
								($regularItems.length ? $el.insertAfter($regularItems.last()) : $el.parent().append($el));
						}
					}
					
					initSortable($sortDiv);
					updateOrderNumbers($container);
				};
			}
		});
		
		// Initialize sortable for this group
		initSortable($sortDiv);
	});
	
	return $container;
}

