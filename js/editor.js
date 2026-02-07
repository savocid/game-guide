// Minimal drag + resize for editor mode.
(function () {
    const state = {
        dragging: false,
        resizing: false,
        target: null,
        startX: 0,
        startY: 0,
        startW: 0,
        startH: 0,
        startML: 0,
        startMT: 0,
    };

    const isEditor = () => document.body.dataset.editor === "true";

    function selectTarget(el) {
        if (!el || !el.id) return;
        state.target = el;
        el.classList.add("editor-selected");

        let handle = el.querySelector(":scope > .resize-handle");
        if (!handle) {
            handle = document.createElement("div");
            handle.className = "resize-handle";
            el.appendChild(handle);
        }
    }

    document.addEventListener("mousedown", (e) => {
        if (!isEditor()) return;

        const handle = e.target.closest(".resize-handle");
        const el = handle ? handle.parentElement : e.target.closest("#content *");
        if (!el || !el.id) return;

        // select
        selectTarget(el);

        const rect = el.getBoundingClientRect();
        const styles = getComputedStyle(el);

        state.startX = e.clientX;
        state.startY = e.clientY;
        state.startW = rect.width;
        state.startH = rect.height;
        state.startML = parseFloat(styles.marginLeft) || 0;
        state.startMT = parseFloat(styles.marginTop) || 0;

        state.resizing = !!handle;
        state.dragging = !handle;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isEditor() || !state.target) return;

        const dx = e.clientX - state.startX;
        const dy = e.clientY - state.startY;

        if (state.resizing) {
            state.target.style.width = Math.max(40, state.startW + dx) + "px";
            state.target.style.height = Math.max(24, state.startH + dy) + "px";
        } else if (state.dragging) {
            state.target.style.marginLeft = state.startML + dx + "px";
            state.target.style.marginTop = state.startMT + dy + "px";
        }
    });

    document.addEventListener("mouseup", () => {
        state.dragging = false;
        state.resizing = false;
    });
})();