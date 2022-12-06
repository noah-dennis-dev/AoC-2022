// coords should be a single Object in the form {y: 1, x: 1}
function FindAdjacentCoords(grid, coords, diagonals = false) {
    let coordsToCheck = [
        { x: coords.x, y: coords.y - 1 }, // Up
        { x: coords.x + 1, y: coords.y }, // Right
        { x: coords.x, y: coords.y + 1 }, // Down
        { x: coords.x - 1, y: coords.y }, // Left
    ]

    if (diagonals) {
        [{ x: coords.x + 1, y: coords.y - 1 }, // Up-Right
        { x: coords.x + 1, y: coords.y + 1 }, // Down-Right
        { x: coords.x - 1, y: coords.y + 1 }, // Down-Left
        { x: coords.x - 1, y: coords.y - 1 }] // Up-Left
            .forEach(diagonal => coordsToCheck.push(diagonal));
    }

    let allowedCoords = [];
    coordsToCheck.forEach(coord => {
        if (!(coord.x < 0 || coord.y < 0 || coord.x > grid[0].length - 1 || coord.y > grid.length - 1)) {
            allowedCoords.push(coord);
        }
    })

    return allowedCoords;
}

module.exports = { FindAdjacentCoords };
