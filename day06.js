const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

let i = 0;
while (true) {
    if (Valid(i)) {
        console.log(lines[0].substring(i, i + 14), i + 14)
        break;
    }
    i++;
}

function Valid(i) {
    let charList = []
    lines[0].substring(i, i + 14).split('').forEach(char => charList.push(char));

    let valid = true;
    while (charList.length > 0) {
        let val = charList.pop();
        if (charList.indexOf(val) !== -1) valid = false;
    }

    return valid
}