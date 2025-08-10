// Component Manager - Handles loading and rendering all components
class ComponentManager {
    constructor() {
        this.components = {};
        this.data = null;
    }

    async loadData() {
        // In a real environment, this would be loaded from cv-data.js
        // For now, we'll use the global CVData variable
        this.data = CVData;
    }

    async loadComponents() {
        // In a real environment, these would be dynamically imported
        // For now, we'll assume they're available globally
        this.components = {
            contact: new ContactComponent(this.data.personal.contact),
            skills: new SkillsComponent(this.data.skills),
            education: new EducationComponent(this.data.education),
            certificates: new CertificatesComponent(this.data.certificates),
            experience: new ExperienceComponent(this.data.experience),
            summary: new SummaryComponent(this.data.summary),
            projects: new ProjectsComponent(this.data.projects)
        };
    }

    renderLeftColumn() {
        return `
            <aside class="left-column">
                <div class="profile-section">
                    <div class="profile-image">
                        <canvas id="particle-canvas"></canvas>
                    </div>
                    <h1>${this.data.personal.name}</h1>
                    <p class="title">${this.data.personal.title}</p>
                </div>
                ${this.components.contact.render()}
                ${this.components.skills.render()}
                ${this.components.education.render()}
                ${this.components.certificates.render()}
            </aside>
        `;
    }

    renderRightColumn() {
        return `
            <main class="right-column">
                ${this.components.summary.render()}
                ${this.components.experience.render()}
                ${this.components.projects.render()}
            </main>
        `;
    }

    async render() {
        await this.loadData();
        await this.loadComponents();

        const leftColumn = this.renderLeftColumn();
        const rightColumn = this.renderRightColumn();

        return `
            <div class="cv-container">
                ${leftColumn}
                ${rightColumn}
            </div>
        `;
    }

    async renderToElement(elementId) {
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = await this.render();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentManager;
}
