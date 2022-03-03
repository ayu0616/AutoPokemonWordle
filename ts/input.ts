import { contains } from "./helper.js";

/**ある文字列が書かれたボタンの要素 */
const charButton = (char: string) => {
	const btnElem = contains("#endless button .char", char)[0];
	return btnElem;
};

/**ある文字列が書かれたボタンをクリック */
const clickCharButton = (char: string) => {
	charButton(char).click();
};

/**ポケモンの名前を入力 */
const inputName = (name: string) => {
	name.split("").forEach((value) => {
		clickCharButton(value);
	});
};

/**ENTERボタンをクリック */
const clickEnterButton = () => {
	const enterButton = contains("#endless span", "ENTER")[0];
	enterButton.click();
};

/**解答を入力=>送信 */
export const answer = (name: string) => {
	inputName(name);
	clickEnterButton();
};
