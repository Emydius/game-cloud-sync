var fileUploadButton = document.getElementById('file_upload_button')
var heading = document.getElementById('heading')
var listContainer = document.getElementById('list_container')
var button = document.createElement('button')
var input = document.createElement('input')
input.type = 'file';

function createFileEntry(file) {
    let listEntry = document.createElement('div')
    listEntry.className = 'list_entry'
    listEntry.appendChild(Object.assign(document.createElement('p'), {innerHTML: file.name}))
    listEntry.appendChild(Object.assign(document.createElement('p'), {innerHTML: file.size + "B"}))
    listEntry.appendChild(Object.assign(document.createElement('p'), {innerHTML: file.lastModified.toUTCString()}))
    listContainer.appendChild(listEntry)
}

heading.addEventListener('click', () => {
    console.log('heading click')
})

fileUploadButton.onchange = e => {
    uploadedFile = e.target.files[0]
    console.log(uploadedFile)
    window.electronAPI.addFile(uploadedFile.path)
}

window.electronAPI.updateList((event, value) => {
    console.log('file added and updateList call sent back from main: ' + value)
    createFileEntry(value)
})