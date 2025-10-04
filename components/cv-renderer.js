// CV Renderer - Optimized for performance
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
        const [year, month] = dateString.split('-');
        return `${month}/${year}`;
    }

    renderSkillProgressBar(skill) {
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

    renderProjectCard(project) {
        const headerContent = project.status 
            ? `<div class="project-status"><span class="status-badge ${project.status}">${project.status}</span></div>`
            : `<div class="project-date"><i class="fas fa-calendar"></i> ${project.dateRange}</div>`;

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
                demo: 'fas fa-eye',
                live: 'fas fa-external-link-alt'
            };
            const labels = {
                github: 'GitHub',
                demo: 'Demo',
                live: 'Live Site'
            };
            const linkClass = type === 'github' ? 'primary' : 'secondary';
            
            return `<a href="${url}" class="project-link ${linkClass}" target="_blank">
                <i class="${icons[type]}"></i> ${labels[type]}
            </a>`;
        }).join('');

        return `
            <div class="project-card reveal">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    ${headerContent}
                </div>
                <p>${project.description}</p>
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

    // Optimized render function using DocumentFragment
    render(data) {
        if (this.isRendered) return;

        const cvHTML = `
            <div class="cv-container">
                <aside class="left-column">
                    <div class="profile-section">
                        <div class="profile-image">
                            <canvas id="particle-canvas" data-lazy="true"></canvas>
                        </div>
                        <h1>${data.personal.name}</h1>
                        <p class="title">${data.personal.title}</p>
                    </div>

                    <section id="contact">
                        <h2><i class="fas fa-address-card"></i> CONTACT</h2>
                        <ul class="contact-info">
                            <li><i class="fas fa-map-marker-alt"></i><span>${data.personal.contact.address}</span></li>
                            <li><i class="fas fa-envelope"></i><a href="mailto:${data.personal.contact.email}">${data.personal.contact.email}</a></li>
                            <li><i class="fab fa-github"></i><a href="${data.personal.contact.github}" target="_blank">github.com/thichuong</a></li>
                            <li><i class="fab fa-kaggle"></i><a href="${data.personal.contact.kaggle}" target="_blank">kaggle.com/chuongthi</a></li>
                        </ul>
                    </section>

                    <section id="skills">
                        <h2><i class="fas fa-cogs"></i> SKILLS</h2>
                        
                        <div class="skills-category">
                            <h3><i class="fas fa-code"></i> Programming Languages</h3>
                            ${data.skills.programming.map(skill => this.renderSkillProgressBar(skill)).join('')}
                        </div>

                        <div class="skills-category">
                            <h3><i class="fas fa-brain"></i> AI & Machine Learning</h3>
                            <div class="skill-tags">
                                ${this.renderSkillTags(data.skills.ai)}
                            </div>
                        </div>

                        <div class="skills-category">
                            <h3><i class="fas fa-tools"></i> Frameworks & Tools</h3>
                            <div class="skill-tags">
                                ${this.renderSkillTags(data.skills.frameworks)}
                            </div>
                        </div>

                        <div class="skills-category">
                            <h3><i class="fas fa-database"></i> Database & APIs</h3>
                            <div class="skill-tags">
                                ${this.renderSkillTags(data.skills.database)}
                            </div>
                        </div>
                    </section>
                    
                    <section id="education" class="reveal">
                        <h2><i class="fas fa-user-graduate"></i> EDUCATION</h2>
                        ${data.education.map(edu => `
                            <div class="education">
                                <h3>${edu.institution}</h3>
                                <p>${edu.degree}</p>
                                <p class="date">
                                    <time datetime="${edu.startDate}">${this.formatDate(edu.startDate)}</time> - 
                                    <time datetime="${edu.endDate}">${this.formatDate(edu.endDate)}</time>
                                </p>
                            </div>
                        `).join('')}
                    </section>

                    <section id="certificates" class="reveal">
                        <h2><i class="fas fa-certificate"></i> CERTIFICATES</h2>
                        ${data.certificates.map(cert => `
                            <div class="certificate">
                                <h3><a href="${cert.url}" target="_blank">${cert.name}</a></h3>
                                <p class="date"><time datetime="${cert.date}">${this.formatDate(cert.date)}</time></p>
                            </div>
                        `).join('')}
                    </section>
                </aside>

                <main class="right-column">
                    <section id="summary" class="reveal">
                        <h2><i class="fas fa-user-alt"></i> SUMMARY</h2>
                        <p>${data.summary}</p>
                    </section>

                    <section id="experience" class="reveal">
                        <h2><i class="fas fa-briefcase"></i> WORK EXPERIENCE</h2>
                        ${data.experience.map(job => `
                            <div class="job">
                                <h3>${job.position}</h3>
                                ${job.company ? `<h4>${job.company}</h4>` : ''}
                                <p class="date">
                                    <time datetime="${job.startDate}">${this.formatDate(job.startDate)}</time> - 
                                    <time datetime="${job.endDate}">${this.formatDate(job.endDate)}</time>
                                </p>
                                ${job.description ? `<p>${job.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </section>

                    <section id="projects" class="reveal">
                        <h2><i class="fas fa-project-diagram"></i> SELECTED PROJECTS</h2>
                        <div class="projects-grid">
                            ${data.projects.map(project => this.renderProjectCard(project)).join('')}
                        </div>
                    </section>
                </main>
            </div>
        `;
        
        // Use requestIdleCallback for better performance
        const renderContent = () => {
            const contentDiv = document.getElementById('cv-content');
            contentDiv.innerHTML = cvHTML;
            this.isRendered = true;
        };

        if (window.requestIdleCallback) {
            requestIdleCallback(renderContent);
        } else {
            setTimeout(renderContent, 0);
        }
    }
}

// Export singleton instance
window.CVRenderer = new CVRenderer();
