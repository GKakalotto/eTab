const SEARCH_ENGINES = {
    google: 'https://www.google.com.hk/search?q=',
    bing: 'https://cn.bing.com/search?q=',
    baidu: 'https://www.baidu.com/s?wd=',
};

const ENGINE_LIST = [
    { value: 'google', name: 'Google', color: '#4285F4' },
    { value: 'bing', name: 'Bing', color: '#008373' },
    { value: 'baidu', name: '百度', color: '#2932E1' },
];

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchEngine = document.getElementById('search-engine');
    const enginePicker = document.getElementById('engine-picker');
    const engineTrigger = document.getElementById('engine-trigger');
    const engineMenu = document.getElementById('engine-menu');
    const engineDot = document.getElementById('engine-dot');
    const engineLabel = document.getElementById('engine-label');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light', 'dark');
        body.classList.add(savedTheme);
    }

    ENGINE_LIST.forEach((engine) => {
        const item = document.createElement('li');
        item.className = 'engine-option';
        item.role = 'option';
        item.dataset.value = engine.value;
        item.innerHTML = `<span class="engine-dot" style="background-color:${engine.color}"></span><span>${engine.name}</span>`;
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            selectEngine(engine.value);
        });
        engineMenu.appendChild(item);
    });

    const savedEngine = localStorage.getItem('searchEngine');
    selectEngine(savedEngine && SEARCH_ENGINES[savedEngine] ? savedEngine : 'google', false);

    toggleBtn.addEventListener('click', () => {
        const isDark = body.classList.contains('dark');
        body.classList.replace(isDark ? 'dark' : 'light', isDark ? 'light' : 'dark');

        const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    engineTrigger.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu(engineMenu.hidden);
    });

    document.addEventListener('click', () => {
        toggleMenu(false);
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        navigate(searchInput.value, searchEngine.value);
    });

    function selectEngine(value, save = true) {
        const engine = ENGINE_LIST.find((item) => item.value === value);
        if (!engine) {
            return;
        }

        searchEngine.value = engine.value;
        engineDot.style.backgroundColor = engine.color;
        engineLabel.textContent = engine.name;

        engineMenu.querySelectorAll('.engine-option').forEach((option) => {
            option.classList.toggle('active', option.dataset.value === value);
        });

        if (save) {
            localStorage.setItem('searchEngine', value);
        }

        toggleMenu(false);
    }

    function toggleMenu(open) {
        engineMenu.hidden = !open;
        engineTrigger.setAttribute('aria-expanded', String(open));
        enginePicker.classList.toggle('open', open);
    }
});

function navigate(query, engine) {
    const text = query.trim();
    if (!text) {
        return;
    }

    const url = toUrl(text);
    window.location.href = url || SEARCH_ENGINES[engine] + encodeURIComponent(text);
}

function toUrl(text) {
    if (/^https?:\/\//i.test(text)) {
        return text;
    }
    if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(text)) {
        return 'https://' + text;
    }
    return null;
}
