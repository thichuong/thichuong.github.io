// CV Renderer - Modern Portfolio Layout
class CVRenderer {
    constructor() {
        this.isRendered = false;
        this.observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '50px'
        };
    }

    // Helper functions
    formatDate(dateString) {
        if (dateString.toLowerCase() === 'present') return 'Present';
        const [year, month] = dateString.split('-');
        return `${month}/${year}`;
    }

    // Render Navigation Bar
    renderNavigation() {
        return `
            <nav class="nav-bar" id="nav-bar">
                <div class="nav-container">
                    <a href="#home" class="nav-logo">
                        <span class="logo-text">TC</span>
                    </a>
                    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-menu" id="nav-menu">
                        <li><a href="#home" class="nav-link active" data-section="home"><i class="fas fa-home"></i> Home</a></li>
                        <li><a href="#skills" class="nav-link" data-section="skills"><i class="fas fa-cogs"></i> Skills</a></li>
                        <li><a href="#projects" class="nav-link" data-section="projects"><i class="fas fa-project-diagram"></i> Projects</a></li>
                        <li><a href="#education" class="nav-link" data-section="education"><i class="fas fa-graduation-cap"></i> Education</a></li>
                        <li><a href="#contact" class="nav-link" data-section="contact"><i class="fas fa-envelope"></i> Contact</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }

    // Render Hero Section
    renderHeroSection(data) {
        return `
            <section id="home" class="hero-section">
                <div class="hero-background">
                    <div class="hero-particles"></div>
                </div>
                <div class="hero-content">
                    <div class="hero-avatar">
                        <canvas id="particle-canvas" data-lazy="true"></canvas>
                    </div>
                    <h1 class="hero-name">${data.personal.name}</h1>
                    <p class="hero-title">${data.personal.title}</p>
                    <p class="hero-summary">${data.summary}</p>
                    <div class="hero-cta">
                        <a href="#projects" class="btn btn-primary">
                            <i class="fas fa-folder-open"></i> View Projects
                        </a>
                        <a href="#contact" class="btn btn-secondary">
                            <i class="fas fa-paper-plane"></i> Contact Me
                        </a>
                    </div>
                    <div class="hero-social">
                        <a href="${data.personal.contact.github}" target="_blank" class="social-link" aria-label="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="${data.personal.contact.kaggle}" target="_blank" class="social-link" aria-label="Kaggle">
                            <i class="fab fa-kaggle"></i>
                        </a>
                        <a href="mailto:${data.personal.contact.email}" class="social-link" aria-label="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
                <div class="hero-scroll-indicator">
                    <span>Scroll Down</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </section>
        `;
    }

    // Render Skills Section
    renderSkillsSection(data) {
        return `
            <section id="skills" class="content-section skills-section">
                <div class="section-container">
                    <h2 class="section-title">
                        <i class="fas fa-cogs"></i>
                        <span>Skills & Expertise</span>
                    </h2>
                    
                    <div class="skills-grid">
                        <div class="skill-category-card reveal">
                            <div class="skill-category-header">
                                <i class="fas fa-code"></i>
                                <h3>Programming Languages</h3>
                            </div>
                            <div class="skill-bars">
                                ${data.skills.programming.map(skill => this.renderSkillBar(skill)).join('')}
                            </div>
                        </div>

                        <div class="skill-category-card reveal">
                            <div class="skill-category-header">
                                <i class="fas fa-brain"></i>
                                <h3>AI & Machine Learning</h3>
                            </div>
                            <div class="skill-tags-container">
                                ${this.renderSkillTags(data.skills.ai)}
                            </div>
                        </div>

                        <div class="skill-category-card reveal">
                            <div class="skill-category-header">
                                <i class="fas fa-tools"></i>
                                <h3>Frameworks & Tools</h3>
                            </div>
                            <div class="skill-tags-container">
                                ${this.renderSkillTags(data.skills.frameworks)}
                            </div>
                        </div>

                        <div class="skill-category-card reveal">
                            <div class="skill-category-header">
                                <i class="fas fa-database"></i>
                                <h3>Database & APIs</h3>
                            </div>
                            <div class="skill-tags-container">
                                ${this.renderSkillTags(data.skills.database)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderSkillBar(skill) {
        return `
            <div class="skill-item">
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${skill.level}"></div>
                </div>
            </div>
        `;
    }

    renderSkillTags(skills) {
        return skills.map(skill =>
            `<span class="skill-tag ${skill.level}">${skill.name}</span>`
        ).join('');
    }

    // Render Projects Section
    renderProjectsSection(data) {
        return `
            <section id="projects" class="content-section projects-section">
                <div class="section-container">
                    <h2 class="section-title">
                        <i class="fas fa-project-diagram"></i>
                        <span>Selected Projects</span>
                    </h2>
                    
                    <div class="projects-grid">
                        ${data.projects.map(project => this.renderProjectCard(project)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderProjectCard(project) {
        const headerContent = project.status
            ? `<span class="status-badge ${project.status}">${project.status}</span>`
            : `<span class="project-date"><i class="fas fa-calendar"></i> ${project.dateRange}</span>`;

        const featuresContent = project.features
            ? `<div class="project-features">
                ${project.features.map(feature =>
                `<div class="feature-item"><i class="${feature.icon}"></i> ${feature.text}</div>`
            ).join('')}
               </div>`
            : '';

        const achievementsContent = project.achievements
            ? `<div class="project-achievements">
                ${project.achievements.map(achievement =>
                `<div class="achievement-item"><i class="${achievement.icon}"></i> ${achievement.text}</div>`
            ).join('')}
               </div>`
            : '';

        const highlightContent = project.highlight
            ? `<div class="project-highlight"><strong>${project.highlight}</strong></div>`
            : '';

        const links = Object.entries(project.links).map(([type, url]) => {
            const icons = {
                github: 'fab fa-github',
                demo: 'fas fa-external-link-alt',
                live: 'fas fa-globe',
                crate: 'fas fa-cube'
            };
            const labels = {
                github: 'GitHub',
                demo: 'Live Demo',
                live: 'Live Site',
                crate: 'View Crate'
            };
            const linkClass = type === 'github' ? 'btn-outline' : 'btn-primary';

            return `<a href="${url}" class="btn ${linkClass}" target="_blank">
                <i class="${icons[type]}"></i> ${labels[type]}
            </a>`;
        }).join('');

        return `
            <div class="project-card reveal">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    ${headerContent}
                </div>
                <p class="project-description">${project.description}</p>
                ${highlightContent}
                ${featuresContent}
                ${achievementsContent}
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    ${links}
                </div>
            </div>
        `;
    }

    // Render Education Section
    renderEducationSection(data) {
        return `
            <section id="education" class="content-section education-section">
                <div class="section-container">
                    <h2 class="section-title">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Education & Certificates</span>
                    </h2>
                    
                    <div class="education-grid">
                        <div class="education-card reveal">
                            <div class="education-icon">
                                <i class="fas fa-university"></i>
                            </div>
                            <div class="education-content">
                                <h3>Education</h3>
                                ${data.education.map(edu => `
                                    <div class="education-item">
                                        <h4>${edu.institution}</h4>
                                        <p class="degree">${edu.degree}</p>
                                        <p class="date">
                                            <i class="fas fa-calendar-alt"></i>
                                            <time datetime="${edu.startDate}">${this.formatDate(edu.startDate)}</time> - 
                                            <time datetime="${edu.endDate}">${this.formatDate(edu.endDate)}</time>
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="certificates-card reveal">
                            <div class="certificates-icon">
                                <i class="fas fa-certificate"></i>
                            </div>
                            <div class="certificates-content">
                                <h3>Certificates</h3>
                                <div class="certificates-list">
                                    ${data.certificates.map(cert => `
                                        <a href="${cert.url}" target="_blank" class="certificate-item">
                                            <div class="cert-info">
                                                <h4>${cert.name}</h4>
                                                <p class="date">
                                                    <time datetime="${cert.date}">${this.formatDate(cert.date)}</time>
                                                </p>
                                            </div>
                                            <i class="fas fa-external-link-alt"></i>
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <div class="experience-card reveal">
                            <div class="experience-icon">
                                <i class="fas fa-briefcase"></i>
                            </div>
                            <div class="experience-content">
                                <h3>Experience</h3>
                                ${data.experience.map(job => `
                                    <div class="experience-item">
                                        <h4>${job.position}</h4>
                                        ${job.company ? `<p class="company">${job.company}</p>` : ''}
                                        <p class="date">
                                            <i class="fas fa-calendar-alt"></i>
                                            <time datetime="${job.startDate}">${this.formatDate(job.startDate)}</time> - 
                                            <time datetime="${job.endDate}">${this.formatDate(job.endDate)}</time>
                                        </p>
                                        ${job.description ? `<p class="description">${job.description}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Render Contact Section
    renderContactSection(data) {
        return `
            <section id="contact" class="content-section contact-section">
                <div class="section-container">
                    <h2 class="section-title">
                        <i class="fas fa-envelope"></i>
                        <span>Get In Touch</span>
                    </h2>
                    
                    <div class="contact-content">
                        <div class="contact-info-grid">
                            <a href="mailto:${data.personal.contact.email}" class="contact-card">
                                <div class="contact-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Email</h4>
                                    <p>${data.personal.contact.email}</p>
                                </div>
                            </a>

                            <a href="${data.personal.contact.github}" target="_blank" class="contact-card">
                                <div class="contact-icon">
                                    <i class="fab fa-github"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>GitHub</h4>
                                    <p>github.com/thichuong</p>
                                </div>
                            </a>

                            <a href="${data.personal.contact.kaggle}" target="_blank" class="contact-card">
                                <div class="contact-icon">
                                    <i class="fab fa-kaggle"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Kaggle</h4>
                                    <p>kaggle.com/chuongthi</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Render Footer
    renderFooter() {
        const year = new Date().getFullYear();
        return `
            <footer class="site-footer">
                <div class="footer-content">
                    <p>&copy; ${year} Thi Thanh Chương. Built with ❤️</p>
                </div>
            </footer>
        `;
    }

    // Main render function
    render(data) {
        if (this.isRendered) return;

        const cvHTML = `
            ${this.renderNavigation()}
            <main class="main-content">
                ${this.renderHeroSection(data)}
                ${this.renderSkillsSection(data)}
                ${this.renderProjectsSection(data)}
                ${this.renderEducationSection(data)}
                ${this.renderContactSection(data)}
            </main>
            ${this.renderFooter()}
        `;

        const renderContent = () => {
            const contentDiv = document.getElementById('cv-content');
            contentDiv.innerHTML = cvHTML;
            this.isRendered = true;

            // Initialize navigation functionality
            this.initNavigation();
        };

        if (window.requestIdleCallback) {
            requestIdleCallback(renderContent);
        } else {
            setTimeout(renderContent, 0);
        }
    }

    // Initialize navigation
    initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Active section detection on scroll
        const sections = document.querySelectorAll('section[id]');

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
            rootMargin: '-100px 0px -40% 0px'
        });

        sections.forEach(section => observer.observe(section));

        // Navbar background on scroll + Home section detection
        const navbar = document.getElementById('nav-bar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Highlight Home when near top of page
            if (window.scrollY < 200) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === 'home') {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Export singleton instance
window.CVRenderer = new CVRenderer();
