// Part 1: Time - 04:31, Rank - 2293
// Part 2: Time - 07:39, Rank - 2647 

const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n\n');

function Part1() {
    let largest = 0;
    for (let i = 0; i < lines.length; i++) {
        let count = 0;
        for (let item of lines[i].split('\n')) {
            count += parseInt(item);
        }
        if (count > largest) largest = count;
    }
    console.log(largest);
}

Part1();



function Part2() {
    let items = [];
    for (let i = 0; i < lines.length; i++) {
        let count = 0;
        for (let item of lines[i].split('\n')) {
            count += parseInt(item);
        }
        items.push(count);
    }

    items.sort();
    let total = 0;
    for (let i = items.length - 3; i < items.length; i++) {
        total += items[i];
    }

    console.log(total);
}

Part2();