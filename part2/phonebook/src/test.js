//

function comp2Objs(obj1, obj2) {
        if ((!obj1) instanceof Object || (!obj2) instanceof Object) return false;

        const keys1 = Object.keys(obj1),
                keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
                if (!keys2.includes(key)) return false;

                if (obj1[key] instanceof Object || obj2[key] instanceof Object) {
                        if (!comp2Objs(obj1[key], obj2[key])) return false;
                        else continue;
                }

                if (obj1[key] !== obj2[key]) return false;
        }
        return true;
}

let obj1 = { at1: 1, at2: { subAt1: 1, subAt2: { subAt2subAt1: "a7a" } } };
let obj2 = { at2: { subAt1: 1, subAt2: { subAt2subAt1: "a7a" } }, at1: 1 };

let obj3 = { at1: 1, at2: 2 };
let obj4 = { at1: 1, at2: 2 };

console.log(comp2Objs(obj1, obj2));
console.log(comp2Objs(obj1, obj3));
console.log(comp2Objs(obj4, obj3));
