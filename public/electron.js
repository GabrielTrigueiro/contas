require("@electron/remote/main").initialize();

const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

let mainWindow;
let splash;
let isDev;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;

async function loadIsDev() {
  isDev = (await import("electron-is-dev")).default;
}

async function createWindow() {
  splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  splash.loadURL(`file://${path.join(__dirname, "splashScreen.html")}`);

  await loadIsDev();

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    maximized: false,
    show: false,
    title: "LBS Desktop",
    removeMenu: true,
    acceptFirstMouse: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

function sendStatusToWindow(text) {
  splash.webContents.send("message", text);
}

// Eventos do autoUpdater
autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Buscando atualizações...");
});

autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("Atualização disponível. Baixando...");
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("Não há atualizações disponíveis.");
  setTimeout(() => {
    splash.destroy();
    mainWindow.show();
  }, 3000);
});

autoUpdater.on("error", (err) => {
  sendStatusToWindow(`Erro ao atualizar: ${err}`);
  setTimeout(() => {
    splash.destroy();
    mainWindow.show();
  }, 3000);
});

autoUpdater.on("download-progress", (progressObj) => {
  const log_message = `Baixando ${progressObj.percent.toFixed(2)}%`;
  sendStatusToWindow(log_message);
});

autoUpdater.on("update-downloaded", () => {
  sendStatusToWindow("Atualização baixada. Aplicando agora...");

  if (mainWindow) {
    mainWindow.close();
  }

  setTimeout(() => {
    autoUpdater.quitAndInstall(true, true);
  }, 2000);
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  autoUpdater.checkForUpdates();
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});
