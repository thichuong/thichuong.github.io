// Skills Section Component
class SkillsComponent {
    constructor(data) {
        this.data = data;
    }

    renderProgressBar(skill) {
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

    render() {
        return `
            <section id="skills">
                <h2><i class="fas fa-cogs"></i> KỸ NĂNG</h2>
                
                <div class="skills-category">
                    <h3><i class="fas fa-code"></i> Ngôn ngữ lập trình</h3>
                    ${this.data.programming.map(skill => this.renderProgressBar(skill)).join('')}
                </div>

                <div class="skills-category">
                    <h3><i class="fas fa-brain"></i> AI & Machine Learning</h3>
                    <div class="skill-tags">
                        ${this.renderSkillTags(this.data.ai)}
                    </div>
                </div>

                <div class="skills-category">
                    <h3><i class="fas fa-tools"></i> Frameworks & Tools</h3>
                    <div class="skill-tags">
                        ${this.renderSkillTags(this.data.frameworks)}
                    </div>
                </div>

                <div class="skills-category">
                    <h3><i class="fas fa-database"></i> Database & APIs</h3>
                    <div class="skill-tags">
                        ${this.renderSkillTags(this.data.database)}
                    </div>
                </div>
            </section>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsComponent;
}
