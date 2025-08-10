// Experience Section Component
class ExperienceComponent {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `
            <section id="experience" class="reveal">
                <h2><i class="fas fa-briefcase"></i> KINH NGHIỆM LÀM VIỆC</h2>
                ${this.data.map(job => `
                    <div class="job">
                        <h3>${job.position}</h3>
                        ${job.company ? `<h4>${job.company}</h4>` : ''}
                        <p class="date">
                            <i class="fas fa-calendar"></i>
                            <time datetime="${job.startDate}">${this.formatDate(job.startDate)}</time> - 
                            <time datetime="${job.endDate}">${this.formatDate(job.endDate)}</time>
                        </p>
                        ${job.description ? `<p>${job.description}</p>` : ''}
                    </div>
                `).join('')}
            </section>
        `;
    }

    formatDate(dateString) {
        const [year, month] = dateString.split('-');
        return `${month}/${year}`;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExperienceComponent;
}
