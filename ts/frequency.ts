import { uniq } from "./helper.js";

// export const frequency = [
// 	{ char: "ー", count: 185 },
// 	{ char: "ン", count: 159 },
// 	{ char: "ル", count: 115 },
// 	{ char: "ラ", count: 99 },
// 	{ char: "ス", count: 94 },
// 	{ char: "リ", count: 77 },
// 	{ char: "ド", count: 77 },
// 	{ char: "ッ", count: 76 },
// 	{ char: "イ", count: 70 },
// 	{ char: "マ", count: 67 },
// 	{ char: "ト", count: 63 },
// 	{ char: "ク", count: 60 },
// 	{ char: "ロ", count: 59 },
// 	{ char: "シ", count: 57 },
// 	{ char: "オ", count: 50 },
// 	{ char: "ア", count: 49 },
// 	{ char: "キ", count: 45 },
// 	{ char: "バ", count: 42 },
// 	{ char: "カ", count: 41 },
// 	{ char: "ジ", count: 40 },
// 	{ char: "レ", count: 40 },
// 	{ char: "ガ", count: 40 },
// 	{ char: "グ", count: 39 },
// 	{ char: "コ", count: 37 },
// 	{ char: "チ", count: 36 },
// 	{ char: "タ", count: 35 },
// 	{ char: "ウ", count: 34 },
// 	{ char: "ニ", count: 33 },
// 	{ char: "フ", count: 32 },
// 	{ char: "ャ", count: 29 },
// 	{ char: "ブ", count: 29 },
// 	{ char: "ム", count: 28 },
// 	{ char: "ダ", count: 27 },
// 	{ char: "ゴ", count: 26 },
// 	{ char: "デ", count: 26 },
// 	{ char: "ノ", count: 25 },
// 	{ char: "メ", count: 23 },
// 	{ char: "ュ", count: 23 },
// 	{ char: "テ", count: 23 },
// 	{ char: "ナ", count: 22 },
// 	{ char: "ミ", count: 22 },
// 	{ char: "ギ", count: 21 },
// 	{ char: "サ", count: 21 },
// 	{ char: "ハ", count: 21 },
// 	{ char: "エ", count: 21 },
// 	{ char: "ヤ", count: 20 },
// 	{ char: "ボ", count: 19 },
// 	{ char: "パ", count: 19 },
// 	{ char: "ゲ", count: 17 },
// 	{ char: "モ", count: 16 },
// 	{ char: "ワ", count: 16 },
// 	{ char: "ザ", count: 15 },
// 	{ char: "ズ", count: 15 },
// 	{ char: "ィ", count: 15 },
// 	{ char: "ビ", count: 15 },
// 	{ char: "プ", count: 14 },
// 	{ char: "ケ", count: 14 },
// 	{ char: "ネ", count: 13 },
// 	{ char: "ポ", count: 13 },
// 	{ char: "ョ", count: 12 },
// 	{ char: "ツ", count: 12 },
// 	{ char: "ヒ", count: 12 },
// 	{ char: "ベ", count: 11 },
// 	{ char: "ペ", count: 7 },
// 	{ char: "ホ", count: 7 },
// 	{ char: "ヨ", count: 7 },
// 	{ char: "ゼ", count: 7 },
// 	{ char: "ソ", count: 6 },
// 	{ char: "セ", count: 6 },
// 	{ char: "ユ", count: 6 },
// 	{ char: "ピ", count: 5 },
// 	{ char: "ェ", count: 5 },
// 	{ char: "ヌ", count: 5 },
// 	{ char: "ォ", count: 3 },
// 	{ char: "ゾ", count: 2 },
// 	{ char: "ァ", count: 2 },
// 	{ char: "♀", count: 1 },
// 	{ char: "♂", count: 1 },
// 	{ char: "ヘ", count: 1 },
// 	{ char: "２", count: 1 },
// 	{ char: "Ｚ", count: 1 },
// 	{ char: "ヂ", count: 1 },
// ];

/**ホワイトリストから各文字の出現頻度を計算する */
export const calcFrequency = (whiteList: string[]) => {
	/**ポケモンの名前の1文字1文字が要素の配列 */
	const charList = whiteList
		.map((value) => value.split(""))
		.reduce((newArr, value) => {
			return newArr.concat(value);
		}, []);
	/**上記配列の重複なしバージョン */
	const charListUnique: string[] = uniq(charList);
	/**出現頻度リスト */
	const frequency = charListUnique.map((char) => {
		const count = charList.filter((value) => value == char).length;
		return { char: char, count: count };
	});
	return frequency;
};
