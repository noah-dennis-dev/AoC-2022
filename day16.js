const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');
let items = {};

lines.forEach(line => {
    let name = line.replace('Valve ', '').split(' ')[0];
    let rate = Number(line.split('; ')[0].split('=')[1]);
    let leading = line.split(';')[1].split(', ').map(el => el.trim());
    items[name] = { rate, leading };
})

function Part1() {
    function calcNode(nodeName, timeLeft, opened, prev) {
        let vals = [];
        let outNum = 0

        if (timeLeft > 0) {
            if (!opened.includes(nodeName) && items[nodeName].rate > 0) {
                let newOpened = opened.map(el => el);
                newOpened.push(nodeName);
                vals.push((items[nodeName].rate * (timeLeft - 1)) + calcNode(nodeName, timeLeft - 1, newOpened, [nodeName]));
            }

            (items[nodeName].leading).filter(el => !prev.includes(el)).forEach(leadingItem => {
                vals.push(calcNode(leadingItem, timeLeft - 1, opened, [nodeName]));
            })
        } else {
            return 0;
        }

        outNum = vals.reduce((prev, next) => (prev < next) ? next : prev, 0);
        return outNum;
    }

    return (calcNode('AA', 30, [], []));
}

console.log(`Part 1: ${Part1()}`)


function Part2() {
    function calcNode(nodeName, node2Name, timeLeft, opened) {
        //console.log(nodeName, node2Name, timeLeft)
        let vals = [];
        let outNum = 0

        if (timeLeft > 0) {
            let newOpened = opened.map(el => el);
            if (!opened.includes(nodeName) && items[nodeName].rate > 0) {
                newOpened.push(nodeName);
                vals.push((items[nodeName].rate * (timeLeft - 2)) + calcNode(nodeName, node2Name, timeLeft - 1, newOpened));
            }

            items[nodeName].leading.forEach(leadingItem => {
                vals.push(calcNode(leadingItem, node2Name, timeLeft - 1, opened));
            })


            if (!opened.includes(node2Name) && items[node2Name].rate > 0) {
                newOpened.push(node2Name);
                vals.push((items[node2Name].rate * (timeLeft - 2)) + calcNode(nodeName, node2Name, timeLeft - 1, newOpened));
            }


            items[node2Name].leading.forEach(leadingItem => {
                vals.push(calcNode(nodeName, leadingItem, timeLeft - 1, opened));
            })

        } else {
            return 0;
        }

        outNum = vals.reduce((prev, next) => (prev < next) ? next : prev, 0);
        return outNum;
    }


    console.log(calcNode('DD', 'II', 30, []));
}

console.log(`Part 2: ${Part1()}`)