function variantBadge() {
    const config = {
        badgeClass: 'variant-badge',
        badgeStyle: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: '1000',
            opacity: '0',
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none'
        }
    };

    let fadeTimeout = null;
    let badge = null;
    let lastSelectedVariants = [];
    let lastLoggedBadgeText = '';

    // Debounce utility
    function debounce(fn, delay) {
        let timer = null;
        return function(...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Create and style the badge element
    function createBadge() {
        const badge = document.createElement('div');
        badge.className = config.badgeClass;
        Object.assign(badge.style, config.badgeStyle);
        return badge;
    }

    // Get all selected variants
    function getSelectedVariants() {
        return Array.from(document.querySelectorAll('.product-form__input'))
            .map(group => {
                const selected = group.querySelector('input[type="radio"]:checked');
                return selected ? { label: selected.value, value: selected.value } : null;
            })
            .filter(Boolean);
    }

    // Update badge with selected variants
    function updateBadge(selectedVariants) {
        if (!badge || selectedVariants.length === 0) return;
        
        const hasChanged = selectedVariants.length !== lastSelectedVariants.length ||
            selectedVariants.some((variant, index) => variant.value !== lastSelectedVariants[index]?.value);
        
        if (!hasChanged) return;
        
        lastSelectedVariants = [...selectedVariants];
        if (fadeTimeout) clearTimeout(fadeTimeout);
        
        badge.style.opacity = '0';
        badge.offsetHeight; // Force reflow
        badge.textContent = selectedVariants.map(v => v.value).join(' : ');
        badge.style.opacity = '1';
        
        fadeTimeout = setTimeout(() => badge && (badge.style.opacity = '0'), 1000);
    }

    const debouncedVariantClick = debounce(() => {
        const selectedVariants = getSelectedVariants();
        if (selectedVariants.length > 0) {
            updateBadge(selectedVariants);
            if (badge.textContent !== lastLoggedBadgeText) {
                console.log('Badge Text:', badge.textContent);
                lastLoggedBadgeText = badge.textContent;
            }
        }
    }, 100);

    function handleVariantClick() {
        debouncedVariantClick();
    }

    // Initialize the badge system
    function init() {
        // Get the product image container
        const imageContainer = document.querySelector('.product__media-wrapper');
        if (!imageContainer) return;

        // Create and append badge
        badge = createBadge();
        imageContainer.style.position = 'relative';
        imageContainer.appendChild(badge);

        // Initial update
        const initialVariants = getSelectedVariants();
        if (initialVariants.length > 0) {
            updateBadge(initialVariants);
        }

        // Add global click handler
        document.addEventListener('click', e => {
            if (e.target.type === 'radio' || e.target.closest('.product-form__input')) {
                setTimeout(handleVariantClick, 50);
            }
        });

        // Also listen for change events on radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('click', handleVariantClick);
        });
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    return lastSelectedVariants;
}

variantBadge();
