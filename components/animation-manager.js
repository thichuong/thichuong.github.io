// Animation Manager - Lazy loaded and optimized animations
class AnimationManager {
    constructor() {
        this.isInitialized = false;
        this.animationQueue = [];
        this.observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '20px'
        };
    }

    // Initialize only when needed
    init() {
        if (this.isInitialized) return;

        this.setupRevealAnimations();
        this.setupSkillAnimations();
        this.setupCardMouseTracking();
        this.setupTypingEffect();
        this.isInitialized = true;
    }

    // Lazy load reveal animations
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Use requestIdleCallback for better performance
                    const animate = () => {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 50); // Reduced delay
                        observer.unobserve(entry.target);
                    };

                    if (window.requestIdleCallback) {
                        requestIdleCallback(animate);
                    } else {
                        animate();
                    }
                }
            });
        }, this.observerOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Optimized skill progress animations
    setupSkillAnimations() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        if (skillProgressBars.length === 0) return;

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');

                    // Use CSS transitions instead of JavaScript animation
                    requestAnimationFrame(() => {
                        progressBar.style.transition = 'width 1s ease-out';
                        progressBar.style.width = targetWidth + '%';
                    });

                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.3 });

        skillProgressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Card mouse tracking for glow effect
    setupCardMouseTracking() {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length === 0) return;

        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            }, { passive: true });
        });
    }

    // Optimized typing effect with better performance
    setupTypingEffect() {
        const titleElement = document.querySelector('.title');
        if (!titleElement) return;

        const originalText = titleElement.textContent;
        titleElement.textContent = '';

        let i = 0;
        const typingEffect = () => {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;

                // Use requestAnimationFrame for smoother animation
                if (i < originalText.length) {
                    setTimeout(() => requestAnimationFrame(typingEffect), 80);
                }
            }
        };

        // Start typing effect after a delay
        setTimeout(() => requestAnimationFrame(typingEffect), 1200);
    }

    // Lazy load floating animation for skill tags
    setupFloatingAnimation() {
        const skillTags = document.querySelectorAll('.skill-tag');
        if (skillTags.length === 0) return;

        // Add CSS animation class with staggered delay
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.05}s`;
            tag.classList.add('float-animation');
        });

        // Add CSS styles if not already present
        if (!document.getElementById('float-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'float-animation-styles';
            style.textContent = `
                .float-animation {
                    animation: float 4s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-2px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Cleanup method for performance
    cleanup() {
        this.animationQueue = [];
        this.isInitialized = false;
    }
}

// Export singleton instance
window.AnimationManager = new AnimationManager();
