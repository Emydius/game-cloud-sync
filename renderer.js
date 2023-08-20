// import { ipcRenderer, dialog } from 'electron';

var fileUploadButton = document.getElementById('file_upload_button')
var heading = document.getElementById('heading')
var button = document.createElement('button')
var input = document.createElement('input')
input.type = 'file';

heading.addEventListener('click', () => {
    console.log('heading click')
})

// Fires when you add a file
fileUploadButton.onchange = e => {
    uploadedFile = e.target.files[0]
    console.log(uploadedFile)
    // sends call to main.js
    window.electronAPI.addFile(uploadedFile.path)
}