const fs = require('fs');
let parts = fs.readFileSync('./input.txt', 'utf8').split('\n\n')


let crates = parts[0].split('\n');
let instructions = parts[1].split('\n');

function ParseInput() {
    let rows = [[], [], [], [], [], [], [], [], []];
    crates.forEach(row => {

        for (let i = 0; i < row.split(' ').length; i++) {
            if (row.split(' ')[i] !== '.') {
                rows[i].push(row.split(' ')[i])
            }
        }


    });
    return rows
}


let crateRows = ParseInput();

instructions.forEach(instruction => {
    let parts = instruction.split(',').map(el => parseInt(el));
    let addingItems = [];
    for (let i = 0; i < parts[0]; i++) {
        addingItems.push(crateRows[parts[1] - 1].shift());
    }
    addingItems.reverse();
    addingItems.forEach(item => {
        crateRows[parts[2] - 1].unshift(item);
    })

    console.log(crateRows)
})

crateRows.forEach(row => {
    console.log(row[0])
})
