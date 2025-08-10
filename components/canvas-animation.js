// Canvas Animation - Lazy loaded and performance optimized
class CanvasAnimation {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particlesArray = [];
        this.isInitialized = false;
        this.isAnimating = false;
        this.animationFrame = null;
        this.mouse = { x: null, y: null, radius: 40 }; // Reduced radius
        this.lastRender = 0;
        this.fps = 30; // Limit FPS for better performance
        this.frameInterval = 1000 / this.fps;
    }

    // Initialize canvas only when it becomes visible
    init() {
        if (this.isInitialized) return;

        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.isInitialized = true;
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAnimation();
                } else {
                    this.stopAnimation();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.canvas);
    }

    setupEventListeners() {
        // Optimized resize handler with debouncing
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
            }, 250);
        };
        
        window.addEventListener('resize', handleResize, { passive: true });

        // Mouse events with passive listeners
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
        this.canvas.addEventListener('mouseout', this.handleMouseOut.bind(this), { passive: true });
    }

    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;
    }

    handleMouseOut() {
        this.mouse.x = null;
        this.mouse.y = null;
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.initParticles();
    }

    initParticles() {
        this.particlesArray = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Optimized font rendering
        const fontSize = Math.min(this.canvas.width * 0.8, 200);
        const yOffset = this.canvas.height * 0.05;
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = `900 ${fontSize}px 'Poppins', Arial, sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('C', this.canvas.width / 2, (this.canvas.height / 2) + yOffset);

        const textCoordinates = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Reduced particle density for better performance
        const step = Math.max(2, Math.floor(this.canvas.width / 100));
        const maxParticles = 800; // Limit max particles
        let particleCount = 0;

        for (let y = 0; y < textCoordinates.height && particleCount < maxParticles; y += step) {
            for (let x = 0; x < textCoordinates.width && particleCount < maxParticles; x += step) {
                if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                    this.particlesArray.push(new Particle(x, y));
                    particleCount++;
                }
            }
        }
    }

    startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.resizeCanvas();
        this.animate();
    }

    stopAnimation() {
        this.isAnimating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    // FPS-limited animation loop
    animate(currentTime = 0) {
        if (!this.isAnimating) return;

        const elapsed = currentTime - this.lastRender;
        
        if (elapsed >= this.frameInterval) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw particles
            for (let i = 0; i < this.particlesArray.length; i++) {
                this.particlesArray[i].update();
                this.particlesArray[i].draw(this.ctx);
            }
            
            this.lastRender = currentTime;
        }
        
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }

    // Update particle colors when theme changes
    updateParticleColors() {
        const newColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        this.particlesArray.forEach(particle => {
            particle.color = newColor;
        });
    }
}

// Optimized Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1.2; // Smaller particles
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 10; // Reduced density range
        this.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        const canvas = document.getElementById('particle-canvas');
        const mouse = window.CanvasAnimation?.mouse;
        
        if (!mouse || !canvas) return;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius && mouse.x !== null) {
            const force = (mouse.radius - distance) / mouse.radius;
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const directionX = forceDirectionX * force * this.density * 0.3; // Reduced force
            const directionY = forceDirectionY * force * this.density * 0.3;
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // Smooth return to original position
            if (this.x !== this.baseX) {
                let dx_return = this.x - this.baseX;
                this.x -= dx_return / 25;
            }
            if (this.y !== this.baseY) {
                let dy_return = this.y - this.baseY;
                this.y -= dy_return / 25;
            }
        }
    }
}

// Export singleton instance
window.CanvasAnimation = new CanvasAnimation();
