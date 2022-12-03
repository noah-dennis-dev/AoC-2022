// Part 1: Time - 13:26, Rank - 4458
// Part 2: Time - 17:17, Rank - 2934 

const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

function Part1() {
    function DeterminePriority(char) {
        if (char.toUpperCase() == char) {
            return char.charCodeAt(0) - 38;
        }

        return char.charCodeAt(0) - 96;
    }

    let count = 0;
    lines.forEach(line => {
        first = line.substring(0, line.length / 2);
        second = line.substring(line.length / 2);

        for (let i = 0; i < first.length; i++) {
            if (second.includes(first[i])) {
                count += DeterminePriority(first[i]);
                break;
            }
        }
    })
    console.log(count)

}

Part1();


function Part2() {
    function DeterminePriority(char) {
        if (char.toUpperCase() == char) {
            return char.charCodeAt(0) - 38;
        }

        return char.charCodeAt(0) - 96;
    }

    let count = 0;
    for (let x = 0; x < lines.length; x += 3) {
        let first = lines[x];
        let second = lines[x + 1];
        let third = lines[x + 2];

        for (let i = 0; i < first.length; i++) {
            if (second.includes(first[i]) && third.includes(first[i])) {
                count += DeterminePriority(first[i]);
                break;
            }
        }
    }
    console.log(count)

}

Part2();