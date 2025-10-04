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

    // Prevent #ai-result from flashing during theme transitions.
    const aiResult = document.getElementById('ai-result');
    const hidePrompt = () => {
        if (!aiResult) return;
        aiResult.style.visibility = 'hidden';
        aiResult.setAttribute('aria-hidden', 'true');
    };
    const showPrompt = () => {
        if (!aiResult) return;
        aiResult.style.visibility = '';
        aiResult.removeAttribute('aria-hidden');
    };

    const getBodyTransitionMs = () => {
        try {
            const cs = window.getComputedStyle(body).transitionDuration || '';
            const first = cs.split(',')[0].trim();
            if (!first) return 0;
            if (first.endsWith('ms')) return parseFloat(first);
            if (first.endsWith('s')) return parseFloat(first) * 1000;
            return 0;
        } catch (e) {
            return 0;
        }
    };

    // Optimized theme switcher with debouncing
    let themeChangeTimeout;
    themeSwitcher.addEventListener('click', () => {
        clearTimeout(themeChangeTimeout);
        // Hide prompt immediately to avoid flash while theme changes
        hidePrompt();

        themeChangeTimeout = setTimeout(() => {
            const newTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);

            // Show the prompt after the body's transition finishes (plus a small buffer).
            const dur = getBodyTransitionMs();
            const wait = (dur && dur > 0) ? dur + 30 : 120; // fallback 120ms
            setTimeout(() => {
                showPrompt();
            }, wait);
        }, 50);
    }, { passive: true });

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    applyTheme(savedTheme);

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