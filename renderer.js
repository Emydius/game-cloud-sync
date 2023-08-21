// import { ipcRenderer, dialog } from 'electron';

var fileUploadButton = document.getElementById('file_upload_button')
var heading = document.getElementById('heading')
var listContainer = document.getElementById('list_container')
var button = document.createElement('button')
var input = document.createElement('input')
input.type = 'file';

function createFileEntry(file) {
    let listEntry = document.createElement('div')
    listEntry.className = 'list_entry'
    var name = document.createElement('p')
    name.innerHTML = file
    listEntry.appendChild(name)
    listContainer.appendChild(listEntry)
}

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

window.electronAPI.updateList((event, value) => {
    console.log('file added and updateList call sent back from main: ' + value)
    createFileEntry(value)
})