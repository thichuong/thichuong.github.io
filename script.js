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