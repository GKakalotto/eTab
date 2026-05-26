document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 检查本地存储，记住用户上次的选择
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light', 'dark');
        body.classList.add(savedTheme);
    }

    // 绑定点击事件
    toggleBtn.addEventListener('click', () => {
        // 切换模式
        const isDark = body.classList.contains('dark');
        body.classList.replace(isDark ? 'dark' : 'light', isDark ? 'light' : 'dark');

        // 将当前状态保存到本地存储
        const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
});
