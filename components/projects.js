// Projects Section Component
class ProjectsComponent {
    constructor(data) {
        this.data = data;
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

    render() {
        return `
            <section id="projects" class="reveal">
                <h2><i class="fas fa-project-diagram"></i> SELECTED PROJECTS</h2>
                <div class="projects-grid">
                    ${this.data.map(project => this.renderProjectCard(project)).join('')}
                </div>
            </section>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsComponent;
}
