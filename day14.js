const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');
let grid = [];

function AddToGrid(a, b) {
    for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) {
        for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) {
            if (grid.filter(el => el.x === x && el.y === y).length === 0) {
                grid.push({ y, x })
            }
        }
    }
}


function FindNextCoord(coords) {
    let coordsToCheck = [
        { x: coords.x, y: coords.y + 1 }, // Down
        { x: coords.x - 1, y: coords.y + 1 }, // Down-Left
        { x: coords.x + 1, y: coords.y + 1 }, // Down-Right
    ]

    for (coord of coordsToCheck) {
        let filter = grid.filter(el => el.x === coord.x && el.y === coord.y);
        if (filter.length === 0) {
            return coord;
        }
    }

    return false;
}


lines.forEach(line => {
    let currentLineCoords = line.split(' -> ');
    for (let i = 1; i < currentLineCoords.length; i++) {
        let prev = currentLineCoords[i - 1];
        let curr = currentLineCoords[i]
        AddToGrid({ x: prev.split(',')[0], y: prev.split(',')[1] }, { x: curr.split(',')[0], y: curr.split(',')[1] });
    }
})


let minY = 0;

grid.forEach(item => {
    if (item.y > minY) minY = item.y;
})

AddToGrid({ x: -1000, y: minY + 2 }, { x: 2000, y: minY + 2 })

let sandCount = 0;

let finished = false;
while (!finished) {
    let newSand = { x: 500, y: 0, type: 'sand' };
    while (true) {
        let next = FindNextCoord(newSand);
        if (next !== false) {
            newSand.x = next.x; newSand.y = next.y;

        } else {
            sandCount++;
            grid.push(newSand);
            console.log(newSand)
            if (newSand.x == 500 && newSand.y == 0) {
                finished = true;
            }

            break;
        }
    }
}


console.log(finished, sandCount);