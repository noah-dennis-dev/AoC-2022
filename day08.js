const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

let grid = [];
let valid = [];

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
        if (!grid.includes({ x, y, val: parseInt(lines[y][x]) })) grid.push({ x, y, val: parseInt(lines[y][x]) });
    }
}

let topScore = 0;

grid.forEach(coord => {

    if (!(coord.x < 1 || coord.x > lines[0].length - 2 || coord.y < 1 || coord.y > lines.length - 2)) {
        FindAdjacentCoords(coord);
    }
})



function FindAdjacentCoords(coords) {
    let coordCounts = 0;
    let coordsDiff = [
        { x: 0, y: - 1, }, // Up
        { x: 1, y: 0 }, // Right
        { x: 0, y: 1 }, // Down
        { x: -1, y: 0 }, // Left
    ]

    let currentScore = 1;

    coordsDiff.forEach(check => {
        let diff = { x: check.x, y: check.y };
        let x = coords.x + check.x;
        let y = coords.y + check.y;
        let currentCount = 1;

        let valid = true;
        while (y < lines.length && x < lines[0].length && y > -1 && x > -1) {
            let result = checkSide({ x: coords.x, y: coords.y }, check, coords)
            if (result === false) {
                valid = false;
                break;
            } else if (result === 'side') {
                currentCount -= 1;
                break;
            } else {
                check.x += diff.x;
                check.y += diff.y;
                currentCount++;
            }
        }

        currentScore *= currentCount;

        if (valid) coordCounts += 1;
    })

    if (currentScore > topScore) topScore = currentScore

    if (coordCounts > 0)
        valid.push(coords);

}


function checkSide(coord, change, origin) {
    let newCoord = { x: coord.x, y: coord.y };
    newCoord.x += change.x;
    newCoord.y += change.y;

    let newC = grid.filter(el => el.x === newCoord.x && el.y === newCoord.y)[0];
    let oldC = grid.filter(el => el.x === coord.x && el.y === coord.y)[0];

    if (newC === undefined || oldC === undefined) {
        return 'side';
    }

    return (origin.val > newC.val);
}

let count = (valid.length + (lines.length - 1) * 2 + (lines[0].length - 1) * 2)
console.log(count)
console.log(topScore)