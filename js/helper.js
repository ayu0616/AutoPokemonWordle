export const contains = (selector, text) => {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter((element) => {
        return RegExp(text).test(element.textContent);
    });
};
export const sort_by_value = (arr) => {
    arr.sort(function (p1, p2) {
        const p1Val = p1[1];
        const p2Val = p2[1];
        return p2Val - p1Val;
    });
    return arr;
};
export const sleep = (msec) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, msec);
    });
};
export const uniq = (array) => {
    return array.filter((elem, index, self) => self.indexOf(elem) === index);
};
