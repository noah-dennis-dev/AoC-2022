const fs = require('fs');
let lines = fs.readFileSync('./test.txt', 'utf8').split('\n');

let tailVisited = [{ x: 0, y: 0 }];
let currentPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 },
{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]

let directions = { 'U': { x: 0, y: 1 }, 'D': { x: 0, y: -1 }, 'L': { x: -1, y: 0 }, 'R': { x: 1, y: 0 } };

let prevDirections = [];

lines.forEach(line => {
    let direction = directions[line.split(' ')[0]];
    let magnitude = parseInt(line.split(' ')[1]);


    for (let a = 0; a < magnitude; a++) {
        for (let i = 0; i < 10; i++) {
            if (i == 0) {
                currentPositions[0].x += direction.x;
                currentPositions[0].y += direction.y;
            } else {
                let adjacent = FindAdjacentCoords(currentPositions[i - 1]);
                let valid = false;

                adjacent.forEach(item => {
                    if (item.x === currentPositions[i].x && item.y === currentPositions[i].y) {
                        valid = true;
                        return false;
                    }
                })

                if (!valid) {
                    MoveTail(direction, currentPositions[i], currentPositions[0]);
                }
                console.log(currentPositions)

                if (i === 9) {
                    tailVisited.push({ x: currentPositions[9].x, y: currentPositions[9].y })
                }
            }
        }
    }
})


console.log(tailVisited, tailVisited.length)

for (let y = 15; y >= -5; y--) {
    let currentLine = '';
    for (let x = -20; x < 20; x++) {
        if (tailVisited.filter(el => el.x === x && el.y === y).length >= 1) {
            currentLine += '#';
        } else {
            currentLine += '.'
        }
    }
    console.log(currentLine);
}



function FindAdjacentCoords(coords) {
    let coordsToCheck = [
        { x: coords.x, y: coords.y - 1 },
        { x: coords.x + 1, y: coords.y },
        { x: coords.x, y: coords.y + 1 },
        { x: coords.x - 1, y: coords.y },
        { x: coords.x + 1, y: coords.y - 1 },
        { x: coords.x + 1, y: coords.y + 1 },
        { x: coords.x - 1, y: coords.y + 1 },
        { x: coords.x - 1, y: coords.y - 1 }
    ]

    let allowedCoords = [];
    coordsToCheck.forEach(coord => {
        allowedCoords.push(coord);
    })

    allowedCoords.push({ x: coords.x, y: coords.y })

    return allowedCoords;
}


function MoveTail(direction, currentTail, currentHead) {
    if (currentHead.x === currentTail.x) {
        currentTail.y += direction.y;
    } else if (currentHead.y === currentTail.y) {
        currentTail.x += direction.x;
    } else {
        if (direction.y !== 0) {
            currentTail.y += direction.y;
            currentTail.x += (currentHead.x - currentTail.x);
        } else {
            currentTail.x += direction.x;
            currentTail.y += (currentHead.y - currentTail.y);
        }
    }
}