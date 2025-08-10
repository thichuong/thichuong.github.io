// Summary Section Component
class SummaryComponent {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `
            <section id="summary" class="reveal">
                <h2><i class="fas fa-user-alt"></i> GIỚI THIỆU</h2>
                <p>${this.data}</p>
            </section>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SummaryComponent;
}
