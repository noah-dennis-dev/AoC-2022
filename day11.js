const fs = require('fs');
let monkeys = fs.readFileSync('./input.txt', 'utf8').split('\n\n');

let monkeyVals = [];

monkeys.forEach(monkey => {
    let lines = monkey.split('\n');

    let i = parseInt(lines[0].replace('Monkey ', '').replace(':', ''));
    let startingItems = lines[1].replace('  Starting items: ', '').split(', ').map(el => parseInt(el));
    let operation = lines[2].replace('  Operation: new = ', '').split(' ');
    let test = parseInt(lines[3].replace('  Test: divisible by ', ''));
    let truePass = parseInt(lines[4].replace('    If true: throw to monkey ', ''));
    let falsePass = parseInt(lines[5].replace('    If false: throw to monkey ', ''));

    monkeyVals.push({ i, startingItems, operation, test, truePass, falsePass, inspected: 0 })
})


let maxStress = 1;
for (let monkey of monkeyVals) {
    maxStress *= monkey.test;
}

for (let i = 0; i < 10000; i++) {
    monkeyVals.forEach(monkey => {
        for (item of monkey.startingItems) {
            if (monkey.operation[1] === '*') {
                item = item * (Number(monkey.operation[2]) || item);
            } else {
                item = item + Number(monkey.operation[2] || item);
            }

            item = item % maxStress;

            if (item % monkey.test === 0) {
                monkeyVals[monkey.truePass].startingItems.push(item);
            } else {
                monkeyVals[monkey.falsePass].startingItems.push(item);
            }

            monkey.inspected += monkey.startingItems.length
            monkey.startingItems = []
        }
    })
}

console.log(monkeyVals);
monkeyVals.sort((a, b) => a.inspected - b.inspected)

let vals = [monkeyVals.pop().inspected, monkeyVals.pop().inspected]

console.log(vals);
console.log(vals.reduce((prev, curr) => prev * curr));