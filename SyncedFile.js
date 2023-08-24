const fs = require('fs')
const path = require('path')

/*
A class structure to represented files the program is currently keeping
track of, safe enough to transfer across electron IPC channels.

Figures out its own name, size, and last modified times from a path string.

*/
module.exports = class SyncedFile {
    constructor(filePath) {
        var stats = fs.statSync(filePath)

        this.name = path.basename(filePath)
        this.path = filePath
        this.size = stats.size 
        this.lastModified = new Date(stats.mtime)
    }
}
