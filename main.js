const { Dropbox } = require('dropbox')
const { webContents } = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const { listenerCount } = require('process')

// Where our files will be kept
var fileList = []

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.handle('addFile', addFile)
    
    // TODO: This will then access each file and create GUI elements for each one
    function addFile(event, file) {
        fileList.push(file)
        console.log(fileList)
        event.return
        win.webContents.send('update-list', fileList)
    }
    
    win.loadFile('index.html')
}


app.whenReady().then(() => {
    // Listens for ipc channel 'addFile' when file is added
    createWindow()
})


// TODO: Catch error when failing to connect to Dropbox
// Start dropbox object with necessary access token
const dbx = new Dropbox({
    accessToken: 'sl.BkiaytsNmwz_FvOsEoPoGDu4ysFhvbN0KjLemjfC2SUwq7H5KCXRu2k3ejjwhlXEW7lm_CFmqi0qwCKckod-DLlVuhjLRI5GAUFWf5ASPsRgSf7-mUsL_wWAJAW82hzBJBtXGGnzxLIb',
    fetch
})

dbx.filesListFolder({
    path: '',
}).then(res => console.log(res.result.entries[0])
).catch((e) => console.log(e))

console.log("Hello World!")