const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');


class File {
    constructor(name, parent, size) {
        this.name = name;
        this.parent = parent;
        this.size = size;
    }
}

class Folder {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
    }
    children = [];

    returnSize() {
        let size = 0;
        this.children.forEach(el => {
            if (el instanceof Folder) {
                size += el.returnSize();
            } else {
                size += el.size;
            }
        })

        if (size <= 100000) {
            total += size;
        }

        if (typeof freeSpace === 'number') {
            let remaining = 30000000 - freeSpace;
            if (size >= remaining) {
                if (!possibleForDelete.includes(size)) possibleForDelete.push(size);
            }
        }

        return size;
    }
}

let baseFolder = new Folder('root', null);
let currFolder = baseFolder;

let freeSpace = 0;

let total = 0;
let possibleForDelete = [];

lines.forEach(line => {
    let parts = line.split(' ');

    if (parts[0] == '$') {
        // Command
        if (parts[1] == 'cd') {
            if (parts[2] == '..') {
                currFolder = currFolder.parent;
            } else {
                currFolder.children.forEach(el => {
                    if (el.name == parts[2]) {
                        currFolder = el;
                    }
                })
            }
        }

    } else if (parts[0] == 'dir') {
        // Folder
        let folder = new Folder(parts[1], currFolder);
        currFolder.children.push(folder)

    } else {
        // File
        let file = new File(parts[1], currFolder, parseInt(parts[0]),);
        currFolder.children.push(file)
    }
})


freeSpace = 70000000 - baseFolder.returnSize();
console.log('Part 1:', total);

baseFolder.returnSize()

possibleForDelete.sort((a, b) => a - b);
console.log('Part 2:', possibleForDelete[0])