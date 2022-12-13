const fs = require('fs');
let pairs = fs.readFileSync('./input.txt', 'utf8').split('\n\n');

let count = 0;
for (let i = 0; i < pairs.length; i++) {
    let items = pairs[i].split('\n').map(el => JSON.parse(el));
    let comparison = goCompare(items[0], items[1]);
    if (comparison) count += i + 1;
}

console.log('Part 1:', count);

let input = fs.readFileSync('./input.txt', 'utf-8').split('\n').filter(el => el != '').map(el => JSON.parse(el));
input.push([[2]], [[6]]);
input.sort((a, b) => goCompare(a, b) ? -1 : 1);

let part2Count = 1;
for (let i = 0; i < input.length; i++) {
    if (input[i].length == 1) {
        if (input[i][0] == 2 || input[i][0] == 6) part2Count *= i + 1;
    }
}

console.log('Part 2:', part2Count);




function goCompare(itemA, itemB) {
    if (typeof itemA == 'number' && typeof itemB == 'number') {
        if (itemA < itemB) return true;
        if (itemA > itemB) return false;
        return undefined;
    }

    if (typeof itemA == 'object' && typeof itemB == 'object') {
        for (let i = 0; i < Math.min(itemA.length, itemB.length); i++) {
            let comparison = goCompare(itemA[i], itemB[i]);
            if (comparison != undefined) return comparison;
        }

        if (itemA.length === itemB.length) return undefined;
        return itemA.length < itemB.length;
    }

    if (typeof itemA == 'object') return goCompare(itemA, [itemB])
    if (typeof itemB == 'object') return goCompare([itemA], itemB)
}

