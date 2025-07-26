document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Ghi log khi DOM đã sẵn sàng

    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const themeIcon = themeSwitcher ? themeSwitcher.querySelector('i') : null;

    // Kiểm tra xem các phần tử có được tìm thấy không
    if (!themeSwitcher || !body || !themeIcon) {
        console.error('Theme switcher elements not found!');
        return;
    }

    console.log('Theme switcher elements found:', { themeSwitcher, body, themeIcon });

    const applyTheme = (theme) => {
        console.log(`Applying theme: ${theme}`);
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

    themeSwitcher.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
        console.log(`Switching to ${newTheme}`);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    console.log(`Initial theme from localStorage: ${savedTheme}`);
    applyTheme(savedTheme);
});