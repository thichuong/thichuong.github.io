// UI Interactions and Effects Manager
class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.initThemeSwitcher();
        this.initRevealAnimations();
        this.initSkillAnimations();
        this.initCardHoverEffects();
        this.initTypingEffect();
        this.initFloatingAnimations();
        this.initParticleCanvas();
    }

    // Theme Switcher Logic
    initThemeSwitcher() {
        const themeSwitcher = document.getElementById('theme-switcher');
        const body = document.body;
        const themeIcon = themeSwitcher?.querySelector('i');

        if (!themeSwitcher || !themeIcon) return;

        const applyTheme = (theme) => {
            if (theme === 'dark-theme') {
                body.classList.add('dark-theme');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                body.classList.remove('dark-theme');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        };

        themeSwitcher.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        applyTheme(savedTheme);
    }

    // Reveal Animations
    initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.1 });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Skill Progress Bar Animations
    initSkillAnimations() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                    }, 300);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillProgressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Enhanced Card Hover Effects
    initCardHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Dynamic Typing Effect for Title
    initTypingEffect() {
        const titleElement = document.querySelector('.title');
        if (!titleElement) return;

        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typingEffect = () => {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typingEffect, 100);
            }
        };
        
        setTimeout(typingEffect, 1000);
    }

    // Floating Animation for Skill Tags
    initFloatingAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('float-animation');
        });

        // Add CSS animation for floating effect
        if (!document.querySelector('#float-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'float-animation-styles';
            style.textContent = `
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Particle Canvas Animation (keeping original logic)
    initParticleCanvas() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        const mouse = { x: null, y: null, radius: 50 }; 
        const container = canvas.parentElement;
        
        function resizeCanvas() {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            init();
        }
        
        window.addEventListener('resize', resizeCanvas);

        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        canvas.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = 1.5;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 40) + 5;
                this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const directionX = forceDirectionX * force * this.density * 0.5;
                    const directionY = forceDirectionY * force * this.density * 0.5;
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx_return = this.x - this.baseX;
                        this.x -= dx_return / 20;
                    }
                    if (this.y !== this.baseY) {
                        let dy_return = this.y - this.baseY;
                        this.y -= dy_return / 20;
                    }
                }
            }
        }

        function init() {
            particlesArray = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const fontSize = canvas.width * 0.85;
            const yOffset = canvas.height * 0.05;
            ctx.fillStyle = 'white';
            ctx.font = `900 ${fontSize}px 'Inter'`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('C', canvas.width / 2, (canvas.height / 2) + yOffset);

            const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const step = Math.max(1, Math.floor(canvas.width / 150));
            for (let y = 0; y < textCoordinates.height; y += step) {
                for (let x = 0; x < textCoordinates.width; x += step) {
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        particlesArray.push(new Particle(x, y));
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].draw();
                particlesArray[i].update();
            }
            requestAnimationFrame(animate);
        }

        const themeObserver = new MutationObserver(() => {
            const newColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            particlesArray.forEach(p => p.color = newColor);
        });
        themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        
        resizeCanvas();
        animate();
    }
}

// Initialize UI Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for components to render
    setTimeout(() => {
        new UIManager();
    }, 100);
});
