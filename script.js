document.addEventListener('DOMContentLoaded', () => {
    // --- OPTIMIZED THEME SWITCHER ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const themeIcon = themeSwitcher.querySelector('i');

    const applyTheme = (theme) => {
        const isDark = theme === 'dark-theme';
        body.classList.toggle('dark-theme', isDark);
        
        // Update icon with requestAnimationFrame for smooth transition
        requestAnimationFrame(() => {
            themeIcon.classList.toggle('fa-moon', !isDark);
            themeIcon.classList.toggle('fa-sun', isDark);
        });
        
        // Update canvas particles if available
        if (window.CanvasAnimation?.updateParticleColors) {
            window.CanvasAnimation.updateParticleColors();
        }
    };

    // Optimized theme switcher with debouncing
    let themeChangeTimeout;
    themeSwitcher.addEventListener('click', () => {
        clearTimeout(themeChangeTimeout);
        themeChangeTimeout = setTimeout(() => {
            const newTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        }, 50);
    }, { passive: true });

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    applyTheme(savedTheme);

    // Helper: keep AI prompt in DOM but visually hidden so AI parsers can still read it
    const hideAIPrompt = () => {
        try {
            const aiEl = document.getElementById('ai-result');
            if (aiEl && !aiEl.classList.contains('visually-hidden')) {
                aiEl.classList.add('visually-hidden');
            }
        } catch (e) {
            // Fail silently - non-critical
            console.warn('hideAIPrompt error', e);
        }
    };

    // Ensure the prompt is hidden after initial render and on theme change
    // CVRenderer.render injects the element; hide it when it appears
    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') hideAIPrompt();
    });

    // Also call once now in case the element is already present
    hideAIPrompt();

    // --- PERFORMANCE MONITORING (Optional) ---
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark('cv-load-complete');
        
        // Optional: Log performance metrics
        window.addEventListener('load', () => {
            requestIdleCallback(() => {
                if (performance.getEntriesByType) {
                    const paintMetrics = performance.getEntriesByType('paint');
                    console.log('Performance metrics:', paintMetrics);
                }
            });
        });
    }
});