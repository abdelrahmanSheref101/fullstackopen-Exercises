/* @brief: deep comparison function
 *  @obj1 : first object (left side)
 *  @obj2 : second object (right side)
 *  @exceptions : keys that won't be compared
 */

export default function comp2Objs(obj1, obj2, exceptions = []) {
        if (obj1 === obj2) return true; // shortcut

        if (
                typeof obj1 !== "object" ||
                obj1 === null ||
                typeof obj2 !== "object" ||
                obj2 === null
        ) {
                return false;
        }

        if (Array.isArray(obj1) && Array.isArray(obj2)) {
                if (obj1.length !== obj2.length) return false;
                return obj1.every((val, i) => comp2Objs(val, obj2[i], exceptions));
        }

        const keys1 = Object.keys(obj1).filter((k) => !exceptions.includes(k));
        const keys2 = Object.keys(obj2).filter((k) => !exceptions.includes(k));

        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
                if (!keys2.includes(key)) return false;
                if (!comp2Objs(obj1[key], obj2[key], exceptions)) return false;
        }

        return true;
}
