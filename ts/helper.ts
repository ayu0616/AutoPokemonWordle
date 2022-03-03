export const contains = (selector: string, text: string) => {
	const elements = document.querySelectorAll<HTMLElement>(selector);
	return Array.from(elements).filter((element) => {
		return RegExp(text).test(<string>element.textContent);
	});
};

export const sort_by_value = (arr: any[][]) => {
	arr.sort(function (p1, p2) {
		const p1Val = p1[1];
		const p2Val = p2[1];
		return p2Val - p1Val;
	});
	return arr;
};

export const sleep = (msec: number) => {
	return new Promise<void>(function (resolve) {
		setTimeout(function () {
			resolve();
		}, msec);
	});
};

export const uniq = (array: any[]) => {
	return array.filter((elem, index, self) => self.indexOf(elem) === index);
};
