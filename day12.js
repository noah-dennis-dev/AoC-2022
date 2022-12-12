const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

let grid = [];
let startCoord = { x: 0, y: 0 };
let endCoord = { x: 0, y: 0 };

for (let y = 0; y < lines.length; y++) {
    let currentLine = [];
    for (let x = 0; x < lines[0].length; x++) {
        currentLine.push(lines[y][x]);

        if (lines[y][x] === 'E') {
            endCoord.x = x;
            endCoord.y = y;
        }
    }
    grid.push(currentLine);
}

grid[startCoord.y][startCoord.x] = 'a';
grid[endCoord.y][endCoord.x] = 'z';

function FindAdjacentCoords(coords) {
    let coordsToCheck = [
        { x: coords.x, y: coords.y - 1 }, // Up
        { x: coords.x + 1, y: coords.y }, // Right
        { x: coords.x, y: coords.y + 1 }, // Down
        { x: coords.x - 1, y: coords.y }, // Left
    ]

    let allowedCoords = [];
    coordsToCheck.forEach(coord => {
        if (isNaN(coord.x) || isNaN(coord.y)) return 1;

        if (!(coord.x < 0 || coord.y < 0 || coord.x > grid[0].length - 1 || coord.y > grid.length - 1)) {
            if (grid[coords.y][coords.x].charCodeAt(0) + 1 >= grid[coord.y][coord.x].charCodeAt(0)) {
                allowedCoords.push(coord);
            }
        }
    })

    return allowedCoords;

}

let allVals = [];

let allAs = FindA();
for (let a = 0; a < allAs.length; a++) {
    startCoord = allAs[a];
    let dijkstrasGrid = Array.from({ length: grid.length }, () => (Array.from({ length: grid[0].length }, () => ({ val: 100000, final: false }))));

    dijkstrasGrid[startCoord.y][startCoord.x] = { val: 0, final: true };

    FindAdjacentCoords(startCoord).forEach(item => {
        dijkstrasGrid[item.y][item.x].val = 1;
    })


    while (!dijkstrasGrid[endCoord.y][endCoord.x].final) {
        let lowestCoord = FindLowest(dijkstrasGrid);

        let adjacent = FindAdjacentCoords(lowestCoord.coords);
        if (adjacent.length > 0) {
            adjacent.forEach(item => {
                if (!dijkstrasGrid[item.y][item.x].final && dijkstrasGrid[item.y][item.x].val > lowestCoord.val + 1) {
                    dijkstrasGrid[item.y][item.x].val = lowestCoord.val + 1;
                }
            })
        }
    }

    allVals.push(dijkstrasGrid[endCoord.y][endCoord.x].val)
}

allVals.sort((a, b) => a - b);
console.log(allVals[0])

function FindA() {
    let starts = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'a') {
                starts.push({ y, x });
            }
        }
    }
    console.log(starts)
    return starts;
}


function FindLowest(dijkstrasGrid) {
    let lowest = 10000000;
    let coords = { x: 0, y: 0 };
    for (let y = 0; y < dijkstrasGrid.length; y++) {
        for (let x = 0; x < dijkstrasGrid[0].length; x++) {
            if (dijkstrasGrid[y][x].val < lowest && dijkstrasGrid[y][x].final == false) {
                coords = { x, y };
                lowest = dijkstrasGrid[y][x].val
            }
        }
    }

    dijkstrasGrid[coords.y][coords.x].final = true;
    return { coords, val: lowest };
}