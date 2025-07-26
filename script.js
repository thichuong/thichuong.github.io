document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const themeIcon = themeSwitcher.querySelector('i');

    // Hàm để áp dụng theme và cập nhật icon
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

    // Bắt sự kiện click để đổi theme
    themeSwitcher.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Tải theme đã lưu từ localStorage hoặc dùng theme sáng làm mặc định
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    applyTheme(savedTheme);
});