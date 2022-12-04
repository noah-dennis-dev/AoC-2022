const fs = require('fs');
let lines = fs.readFileSync('./input.txt', 'utf8').split('\n');


function Part1() {
    let count = 0;
    lines.forEach(line => {
        let elements = line.split(',');
        elArr1 = Array(parseInt(elements[1]) - parseInt(elements[0]) + 1).fill().map((_, idx) => parseInt(elements[0]) + idx)
        elArr2 = Array(parseInt(elements[3]) - parseInt(elements[2]) + 1).fill().map((_, idx) => parseInt(elements[2]) + idx)
        let el1IsWrapper = true;
        let el2IsWrapper = true;
        for (let i = 0; i < elArr1.length; i++) {
            if (!elArr2.includes(elArr1[i])) {
                el2IsWrapper = false;
            }
        }

        for (let i = 0; i < elArr2.length; i++) {
            if (!elArr1.includes(elArr2[i])) {
                el1IsWrapper = false;
            }
        }

        if (el1IsWrapper || el2IsWrapper) count++;
    })
    console.log(count);


}

Part1();



function Part2() {

    let count = 0;
    lines.forEach(line => {
        let elements = line.split(',');
        elArr1 = Array(parseInt(elements[1]) - parseInt(elements[0]) + 1).fill().map((_, idx) => parseInt(elements[0]) + idx)
        elArr2 = Array(parseInt(elements[3]) - parseInt(elements[2]) + 1).fill().map((_, idx) => parseInt(elements[2]) + idx)
        let el1IncludesAny = false;
        let el2IncludesAny = false;
        for (let i = 0; i < elArr1.length; i++) {
            if (elArr2.includes(elArr1[i])) {
                el1IncludesAny = true;
            }
        }

        for (let i = 0; i < elArr2.length; i++) {
            if (elArr1.includes(elArr2[i])) {
                el2IncludesAny = true;
            }
        }

        if (el1IncludesAny || el2IncludesAny) count++;
    })
    console.log(count);


}

Part2();
