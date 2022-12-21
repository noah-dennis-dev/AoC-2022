const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');

let monkeys = {};

for (let line of lines) {
    let monkey = line.split(':')[0];
    let mathsOp = isNaN(line.split(': ')[1])
    let RHS = line.split(': ')[1];
    if (!mathsOp) { RHS = Number(RHS); }
    else { RHS = RHS.split(' ') }
    monkeys[monkey] = ({ mathsOp, RHS })
}

// Did this part manually changing the initial value of i, after comparing the difference.
for (let i = 3678125400000; i < 10000000000000; i++) {
    monkeys['humn']['RHS'] = i;

    let total = FindTotal('root');

    if (total === true) {
        console.log(i);
        break;
    }
}



function FindTotal(name) {
    if (name == 'root') {
        let item1 = FindTotal(monkeys[name]['RHS'][0]);
        let item2 = FindTotal(monkeys[name]['RHS'][2]);
        console.log(item1 - item2)
        if (item1 === item2) {
            return true;
        }
    }

    if (!isNaN(monkeys[name]['RHS'])) return monkeys[name]['RHS'];

    let item1 = FindTotal(monkeys[name]['RHS'][0]);
    let item2 = FindTotal(monkeys[name]['RHS'][2]);

    let operator = monkeys[name]['RHS'][1];

    if (operator === '+') return item1 + item2;
    if (operator === '-') return item1 - item2;
    if (operator === '/') return item1 / item2;
    if (operator === '*') return item1 * item2;
}