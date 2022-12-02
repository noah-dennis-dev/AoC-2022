// Maybe the worst possible solution?
// Part 1: Time - 17:01, Rank - 6884
// Part 2: Time - 30:30, Rank - 8262 

const fs = require('fs');
const lines = fs.readFileSync('./input.txt', 'utf8').split('\n');


function Part1() {
    count = 0;

    lines.forEach(line => {
        let items = line.split(' ');

        if (items[1] == 'X') count += 1;
        else if (items[1] == 'Y') count += 2;
        else if (items[1] == 'Z') count += 3;


        if (items[0] == 'A') {
            if (items[1] == 'X') {
                count += 3;
            } else if (items[1] == 'Y') {
                count += 6;
            }
        } else if (items[0] == 'B') {
            if (items[1] == 'Y') {
                count += 3;
            } else if (items[1] == 'Z') {
                count += 6;
            }
        } else if (items[0] == 'C') {
            if (items[1] == 'X') {
                count += 6;
            } else if (items[1] == 'Z') {
                count += 3;
            }
        }
    })

    console.log(count);

}

Part1();






function Part2() {
    count = 0;

    lines.forEach(line => {
        let items = line.split(' ');

        if (items[1] == 'X') count += 0;
        else if (items[1] == 'Y') count += 3;
        else if (items[1] == 'Z') count += 6;


        if (items[0] == 'A') { //Rock
            if (items[1] == 'X') {
                count += 3;
            } else if (items[1] == 'Y') {
                count += 1;
            } else {
                count += 2;
            }
        } else if (items[0] == 'B') { // Paper
            if (items[1] == 'Y') {
                count += 2;
            } else if (items[1] == 'X') {
                count += 1;
            } else {
                count += 3;
            }
        } else if (items[0] == 'C') { // Scissors
            if (items[1] == 'X') {
                count += 2;
            } else if (items[1] == 'Z') {
                count += 1;
            } else {
                count += 3;
            }
        }

    })

    console.log(count);

}

Part2();