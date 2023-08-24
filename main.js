const { Dropbox } = require('dropbox')
const { webContents } = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const { listenerCount } = require('process')
const fs = require('fs')
var SyncedFile = require("./SyncedFile.js")

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
    function addFile(event, filePath) {
        fileList.push(filePath)
        console.log(fileList)
        // Sends objects to be turned into HTML elements
        win.webContents.send('update-list', new SyncedFile(filePath))
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
    accessToken: 'sl.Bkt53v3Xi0zCWMWDmKSH1pLRdpOi01GAJMzMV0pTAVha4xv_yLGuW9fkNEvkmhr4_obTThnyWXWYFP-y6m1_7baT8T8CL8A2tW5oYwKB9LTxFOqBa9r3-6aLB-qcTvmDETYEOkcGJdiG',
    fetch
})

dbx.filesListFolder({
    path: '',
}).then(res => console.log(res.result.entries[0])
).catch((e) => console.log(e))