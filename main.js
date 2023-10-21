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

    // Update renderer list on app start with currently synced files
    win.webContents.send('update-list', fileList)

    
    // Upon 'addFile' request from renderer: create SyncedFile object, add to file list, and update renderer list
    // TODO: Check for duplicate files (currently broken!)
    ipcMain.handle('addFile', addFile)
    function addFile(event, filePath) {
        addedFile = new SyncedFile(filePath, fileList.length)
        fileList.push(addedFile)
        console.log(fileList)
        
        // Sends objects to be turned into HTML elements
        win.webContents.send('update-list', fileList)
    }

    win.loadFile('index.html')
}


app.whenReady().then(() => {
    // Listens for ipc channel 'addFile' when file is added
    createWindow()
})


// TODO: Catch error when failing to connect to Dropbox
// Start dropbox object with necessary access token while authentication isn't added yet
// const dbx = new Dropbox({
//     accessToken: 'accessToken',
//     fetch
// })

// dbx.filesListFolder({
//     path: '',
// }).then(res => console.log(res.result.entries[0])
// ).catch((e) => console.log(e))