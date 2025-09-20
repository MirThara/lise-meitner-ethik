const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // Lade deine HTML-Datei
    win.loadFile('index.html');

    app.setAboutPanelOptions({
        applicationName: 'Lise Meitner Ethik',
        applicationVersion: app.getVersion(),
        version: app.getVersion(),
        copyright: '(c) 2025 Lea Evers, Miron Tharandt',
    });

    const menuTemplate = [
        {
            label: "Lise Meitner",
            submenu: [
                { label: 'Über diese App', role: 'about' },
                { type: 'separator' },
                { role: 'quit', label: 'Beenden' }
            ]
        },
        {
            label: 'Hilfe',
            submenu: [
                {
                    label: 'Hinweis zur Darstellung',
                    click: () => {
                        createAboutWindow();
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

// macOS: Fenster öffnen, falls alle geschlossen
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// App beenden, wenn alle Fenster geschlossen
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

const createAboutWindow = () => {
    const aboutWin = new BrowserWindow({
        width: 400,
        height: 300,
        resizable: false,
        minimizable: false,
        maximizable: false,
        title: 'Über Lise Meitner Ethik',
        modal: true,
        parent: BrowserWindow.getFocusedWindow(),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // HTML für About/Info laden
    aboutWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <html>
      <head>
        <title>Über Lise Meitner Ethik</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 20px; }
          h1 { margin-top: 0; }
          p { margin: 5px 0; }
          button { margin-top: 20px; padding: 5px 15px; }
        </style>
      </head>
      <body>
        <h1>Lise Meitner Ethik</h1>
        <p style="font-size: smaller; color: #ccc">Version: ${app.getVersion()}</p>
        <p>Zur optimalen Darstellung der Inhalte wird empfohlen, 
        einen Bildschirm mit einer Auflösung von 1920x1080px oder ähnlich zu verwenden, 
        da sonst einzelne Inhalte verschoben werden können</p>
        <button onclick="window.close()">OK</button>
      </body>
    </html>
  `));
};