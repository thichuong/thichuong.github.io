// Contact Section Component
class ContactComponent {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `
            <section id="contact">
                <h2><i class="fas fa-address-card"></i> LIÊN HỆ</h2>
                <ul class="contact-info">
                    <li><i class="fas fa-map-marker-alt"></i><span>${this.data.address}</span></li>
                    <li><i class="fas fa-envelope"></i><a href="mailto:${this.data.email}">${this.data.email}</a></li>
                    <li><i class="fab fa-github"></i><a href="${this.data.github}" target="_blank">github.com/thichuong</a></li>
                    <li><i class="fab fa-kaggle"></i><a href="${this.data.kaggle}" target="_blank">kaggle.com/chuongthi</a></li>
                </ul>
            </section>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactComponent;
}
