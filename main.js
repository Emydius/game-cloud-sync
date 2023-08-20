const { Dropbox } = require('dropbox')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

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

    win.loadFile('index.html')
}

// When file is added, add to fileList
function updateFileList(event, newList) {
   fileList = newList 
   console.log('updateFileList function')
   console.log('main.js fileList: ' + fileList)
}

app.whenReady().then(() => {
    // Listens for ipc channel 'sendFiles' when file is added
    ipcMain.on('sendFiles', updateFileList)
    createWindow()
})

// Start dropbox object with necessary access token
const dbx = new Dropbox({
    accessToken: 'sl.Bke2qjIGrgmsI3nUm2_2b4eEVz0QKFZIXkWCcyexHWEWkd8LF_UM4evaPnuz_bT92q48fPVHUZrkR_kgJRs5Tb07c85aumIHitLX3k3KDQXQjm7yjcb3IBFMnOoFc-k7o1qYVJYXAhRV',
    fetch
})

dbx.filesListFolder({
    path: '',
}).then(res => console.log(res.result.entries[0])
).catch((e) => console.log(e))

console.log("Hello World!")