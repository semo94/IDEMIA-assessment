const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    webPreferences: { nodeIntegration: true }
  })

  win.loadURL(`file://${__dirname}/dist/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('save_image', (event, img) => {
  // create images folder if not exist
  const homedir = os.homedir();
  const dir = path.resolve(homedir, 'IDM_Photo');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // construct the path of the image
  const imagePath = path.resolve(dir, img.name);
  fs.writeFile(imagePath, img.data, 'base64', (error) => {
      if (error) throw error;
      console.log('File has been saved on: ', imagePath);
    })
})

ipcMain.on('delete_image', (event, name) => {
  const imagePath = path.resolve(os.homedir(), 'IDM_Photo', name);
  console.log(imagePath);
  if (fs.existsSync(imagePath)) {
    fs.unlink(imagePath, (err) => {
      if (err) throw err;
      console.log(imagePath, ' has been deleted');
    });
  }
})