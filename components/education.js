// Education Section Component
class EducationComponent {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `
            <section id="education" class="reveal">
                <h2><i class="fas fa-user-graduate"></i> EDUCATION</h2>
                ${this.data.map(edu => `
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
        `;
    }

    formatDate(dateString) {
        const [year, month] = dateString.split('-');
        return `${month}/${year}`;
    }
}

// Certificates Section Component
class CertificatesComponent {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `
            <section id="certificates" class="reveal">
                <h2><i class="fas fa-certificate"></i> CERTIFICATES</h2>
                ${this.data.map(cert => `
                    <div class="certificate">
                        <h3><a href="${cert.url}" target="_blank">${cert.name}</a></h3>
                        <p class="date"><time datetime="${cert.date}">${this.formatDate(cert.date)}</time></p>
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
    module.exports = { EducationComponent, CertificatesComponent };
}
