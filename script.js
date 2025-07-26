document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LOGIC CHUYỂN ĐỔI THEME (SÁNG/TỐI) ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const themeIcon = themeSwitcher.querySelector('i');

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


    // --- 2. LOGIC HIỆU ỨNG FADE-IN KHI CUỘN CHUỘT ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.1 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    
    // --- 3. LOGIC HIỆU ỨNG CANVAS CHỮ 'C' (ĐÃ CẬP NHẬT) ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        // GIẢM BÁN KÍNH TƯƠNG TÁC CỦA CHUỘT
        const mouse = { x: null, y: null, radius: 50 }; 

        const container = canvas.parentElement;
        
        function resizeCanvas() {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            init(); // Vẽ lại khi thay đổi kích thước
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
                this.size = 1.5; // Kích thước hạt nhỏ hơn một chút
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 40) + 5; // Điều chỉnh mật độ
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
                    const directionX = forceDirectionX * force * this.density * 0.5; // Giảm lực đẩy
                    const directionY = forceDirectionY * force * this.density * 0.5;
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Quay về vị trí ban đầu một cách mượt mà hơn
                    if (this.x !== this.baseX) {
                        let dx_return = this.x - this.baseX;
                        this.x -= dx_return / 20; // Tăng mẫu số để làm chậm tốc độ
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
            
            // Căn chỉnh chữ 'C' chính xác hơn
            const fontSize = canvas.width * 0.85;
            const yOffset = canvas.height * 0.05; // Điều chỉnh vị trí theo chiều dọc
            ctx.fillStyle = 'white';
            ctx.font = `900 ${fontSize}px 'Poppins'`; // Dùng font weight đậm hơn
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('C', canvas.width / 2, (canvas.height / 2) + yOffset);

            const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // GIẢM BƯỚC NHẢY ĐỂ TĂNG MẬT ĐỘ HẠT
            const step = Math.max(1, Math.floor(canvas.width / 150));
            for (let y = 0; y < textCoordinates.height; y += step) {
                for (let x = 0; x < textCoordinates.width; x += step) {
                    // Kiểm tra giá trị alpha của pixel
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
        
        // Khởi chạy
        resizeCanvas();
        animate();
    }
});