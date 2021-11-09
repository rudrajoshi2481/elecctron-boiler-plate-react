const path = require("path");
const { ipcMain, app, BrowserWindow, Notification ,Menu, Tray} = require("electron");
const isDev = require("electron-is-dev");

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log("Heyyyyy", arg);
  new Notification({
    
    title: "V-2 New Notification",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan nunc at massa consectetur, varius ultrices elit accumsan. Morbi eget iaculis tortor. Aliquam a aliquam purus. Sed condimentum feugiat pellentesque. Maecenas molestie diam sit amet mi aliquet viverra. Cras vestibulum risus eget augue condimentum efficitur. Nullam enim lectus, finibus in sem eget, pellentesque faucibus urna. Phasellus gravida mauris ut leo lobortis vestibulum. Maecenas rhoncus diam et varius placerat. Maecenas cursus luctus purus, id commodo orci placerat et. Etiam mollis scelerisque bibendum. Donec eget consequat urna.",
    icon:`file://${path.join(__dirname, "../build/index.html")}`
  }).show();

  appIcon =  new Tray(path.join(__dirname,"./favicon.ico"))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)

});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "bottom" });
  }
};

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
