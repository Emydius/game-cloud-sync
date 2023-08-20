// import { ipcRenderer, dialog } from 'electron';

var fileUploadButton = document.getElementById('file_upload_button')
var heading = document.getElementById('heading')
var button = document.createElement('button')
var input = document.createElement('input')
var fileList = [];
input.type = 'file';

heading.addEventListener('click', () => {
    console.log('heading click')
})

// Fires when you add a file
fileUploadButton.onchange = e => {
    fileList.push(e.target.files[0].path)
    console.log('renderer.js fileList: fileList')
    window.electronAPI.sendFileArray(fileList)
}