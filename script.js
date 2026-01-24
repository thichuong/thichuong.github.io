document.addEventListener('DOMContentLoaded', () => {
    // --- OPTIMIZED THEME SWITCHER ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const themeIcon = themeSwitcher?.querySelector('i');

    const applyTheme = (theme) => {
        const isDark = theme === 'dark-theme';
        body.classList.toggle('dark-theme', isDark);

        // Update icon with requestAnimationFrame for smooth transition
        requestAnimationFrame(() => {
            if (themeIcon) {
                themeIcon.classList.toggle('fa-moon', !isDark);
                themeIcon.classList.toggle('fa-sun', isDark);
            }
        });

        // Update canvas particles if available
        if (window.CanvasAnimation?.updateParticleColors) {
            window.CanvasAnimation.updateParticleColors();
        }
    };

    // Optimized theme switcher with debouncing
    if (themeSwitcher) {
        let themeChangeTimeout;
        themeSwitcher.addEventListener('click', () => {
            clearTimeout(themeChangeTimeout);
            themeChangeTimeout = setTimeout(() => {
                const newTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            }, 50);
        }, { passive: true });
    }

    // Apply saved theme (default to dark mode)
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    applyTheme(savedTheme);

    // --- SMOOTH SCROLL REMOVED ---
    // Navigation is now page-based (handled in cv-renderer.js)

    // --- REVEAL ANIMATIONS ON SCROLL ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate skill bars when visible
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 200);
                    }
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Also animate skill bars in skill cards
    const skillCards = document.querySelectorAll('.skill-category-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 100 * index);
                    }
                });
            }
        });
    }, {
        threshold: 0.2
    });

    skillCards.forEach(card => skillObserver.observe(card));

    // --- STAGGER ANIMATION FOR PROJECT CARDS ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // --- PERFORMANCE MONITORING (Optional) ---
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark('cv-load-complete');

        window.addEventListener('load', () => {
            if (window.requestIdleCallback) {
                requestIdleCallback(() => {
                    if (performance.getEntriesByType) {
                        const paintMetrics = performance.getEntriesByType('paint');
                        console.log('Performance metrics:', paintMetrics);
                    }
                });
            }
        });
    }
});