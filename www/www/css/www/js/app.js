var apps = [];
var currentApp = null;
var customIcons = {};
var customNames = {};

try {
    customIcons = JSON.parse(localStorage.getItem('icons') || '{}');
    customNames = JSON.parse(localStorage.getItem('names') || '{}');
} catch(e) {}

function saveData() {
    localStorage.setItem('icons', JSON.stringify(customIcons));
    localStorage.setItem('names', JSON.stringify(customNames));
}

apps = [
    {name: 'Chrome', icon: '🌐', package: 'chrome'},
    {name: 'Gmail', icon: '📧', package: 'gmail'},
    {name: 'Maps', icon: '🗺️', package: 'maps'},
    {name: 'YouTube', icon: '▶️', package: 'youtube'},
    {name: 'Camera', icon: '📷', package: 'camera'},
    {name: 'Gallery', icon: '🖼️', package: 'gallery'},
    {name: 'Settings', icon: '⚙️', package: 'settings'},
    {name: 'Calculator', icon: '🔢', package: 'calculator'},
    {name: 'Calendar', icon: '📅', package: 'calendar'},
    {name: 'Clock', icon: '⏰', package: 'clock'},
    {name: 'Contacts', icon: '👥', package: 'contacts'},
    {name: 'Music', icon: '🎵', package: 'music'},
    {name: 'Files', icon: '📁', package: 'files'},
    {name: 'Notes', icon: '📝', package: 'notes'},
    {name: 'Weather', icon: '🌤️', package: 'weather'},
    {name: 'Store', icon: '🛒', package: 'store'}
];

function renderApps() {
    var grid = document.getElementById('appGrid');
    grid.innerHTML = '';
    apps.forEach(function(app) {
        var div = document.createElement('div');
        div.className = 'app-item';
        var customIcon = customIcons[app.package];
        var customName = customNames[app.package] || app.name;
        if (customIcon) {
            div.innerHTML = '<img src="' + customIcon + '" class="app-icon"><span class="app-name">' + customName + '</span>';
        } else {
            div.innerHTML = '<div class="app-icon" style="display:flex;align-items:center;justify-content:center;font-size:24px;">' + app.icon + '</div><span class="app-name">' + customName + '</span>';
        }
        div.addEventListener('click', function() {
            alert('Opening ' + customName);
        });
        var timer;
        div.addEventListener('touchstart', function(e) {
            timer = setTimeout(function() {
                currentApp = app;
                openDialog();
            }, 600);
        });
        div.addEventListener('touchend', function() { clearTimeout(timer); });
        div.addEventListener('touchmove', function() { clearTimeout(timer); });
        grid.appendChild(div);
    });
}

function openDialog() {
    document.getElementById('dialogTitle').textContent = currentApp.name;
    document.getElementById('dialog').style.display = 'flex';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
    currentApp = null;
}

function pickIcon() {
    closeDialog();
    document.getElementById('iconPicker').click();
}

function changeIcon(event) {
    var file = event.target.files[0];
    if (file && currentApp) {
        var reader = new FileReader();
        reader.onload = function(e) {
            customIcons[currentApp.package] = e.target.result;
            saveData();
            renderApps();
        };
        reader.readAsDataURL(file);
    }
    event.target.value = '';
}

function renameApp() {
    closeDialog();
    var newName = prompt('Enter new name:', currentApp.name);
    if (newName && newName.trim()) {
        customNames[currentApp.package] = newName.trim();
        saveData();
        renderApps();
    }
}

function resetIcon() {
    if (currentApp && confirm('Reset this app?')) {
        delete customIcons[currentApp.package];
        delete customNames[currentApp.package];
        saveData();
        renderApps();
    }
    closeDialog();
}

function changeWallpaper() {
    document.getElementById('wallpaperPicker').click();
}

function setWallpaper(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('app').style.backgroundImage = 'url(' + e.target.result + ')';
            document.getElementById('app').style.backgroundSize = 'cover';
        };
        reader.readAsDataURL(file);
    }
    event.target.value = '';
}

function resetAll() {
    if (confirm('Reset ALL customizations?')) {
        localStorage.clear();
        customIcons = {};
        customNames = {};
        document.getElementById('app').style.backgroundImage = '';
        renderApps();
    }
}

window.onload = function() {
    renderApps();
};
