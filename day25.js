const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

let count = 0;

lines.forEach(line => {
    let currentLine = 0;
    for (let i = 0; i <= line.length; i++) {
        switch (line[line.length - i - 1]) {
            case '1':
                currentLine += Math.pow(5, i);
                break;

            case '2':
                currentLine += Math.pow(5, i) * 2;
                break;

            case '-':
                currentLine -= Math.pow(5, i);
                break;

            case '=':
                currentLine -= Math.pow(5, i) * 2;
                break;
        }
    }
    count += currentLine;
})


function toB5(n) {
    if (n === 0) return "";
    if (n % 5 === 0) return toB5(Math.floor(n / 5)) + "0";
    if (n % 5 === 1) return toB5(Math.floor(n / 5)) + "1";
    if (n % 5 === 2) return toB5(Math.floor(n / 5)) + "2";
    if (n % 5 === 3) return toB5((n + 2) / 5) + "=";
    if (n % 5 === 4) return toB5((n + 1) / 5) + "-";
}

console.log(toB5(count))