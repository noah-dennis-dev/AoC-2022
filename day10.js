const fs = require('fs');
let lines = fs.readFileSync('./test.txt', 'utf8').split('\n');

let cycles = 0;
let x = 1;
let count = 0;
let checked = [];
let crt = 0;

let output = "";
lines.forEach(line => {
    if (line === 'noop') {
        cycles++;
        crt = (crt + 1) % 40;
        CheckCycles()
    } else {
        let parts = line.split(' ');
        for (let i = 0; i < 2; i++) {
            cycles++;
            crt = (crt + 1) % 40;
            if (crt >= x - 1 && crt <= x + 1) {
                output += '#';
            } else {
                output += '.';
            }
            CheckCycles();

            console.log(crt, x, crt >= x - 1 && crt <= x + 1)
        }

        x += parseInt(parts[1]);
    }
})


for (let current = 0; current < output.length / 40; current++) {
    console.log(output.substring(current * 40, (current + 1) * 40))
}



function CheckCycles() {
    if (cycles == 20 || cycles == 60 || cycles == 100 || cycles == 140 || cycles == 180 | cycles == 220) {
        if (!checked.includes(cycles)) {
            count += (cycles * x);
            checked.push(cycles);
        }
    }
}