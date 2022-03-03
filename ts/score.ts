import { calcFrequency } from "./frequency.js";
import { sort_by_value, uniq } from "./helper.js";
import { ArrayFiveValues, PostedCharType, PostedDataListType } from "./type.js";

/**
 * あるポケモンの名前の各文字について頻度を算出
 * その総和を出力
 */
const frequency_score_one_name = (name: string, whiteList: string[]) => {
	/**スコア */
	let score = 0;
	/**ホワイトリストから計算した頻度 */
	const frequency = calcFrequency(whiteList)
	/**スコア計算済みの文字（重複防止用） */
	const scored_char: string[] = [];
	name.split("").forEach((value: string) => {
		if (scored_char.includes(value)) return;
		score += frequency.filter((dict) => dict.char == value)[0].count;
		scored_char.push(value);
	});
	return score;
};

/**名前リストから頻度スコアリストを出力 */
export const frequency_score = (nameList: string[]) => {
	let scores: [string, number][] = [];
	nameList.forEach((value) => {
		const score = frequency_score_one_name(value, nameList);
		scores.push([value, score]);
	});
	return scores;
};

/**スコア最大のポケモンを出力 */
export const frequency_best_score = (nameList: string[]): string => {
	const scores = frequency_score(nameList);
	return sort_by_value(scores)[0][0];
};

// /**現在のターン数から入力行のセレクターを取得 */
// const currentRowSelector = (currentTurn: number) => {
// 	const colNum = Math.floor((currentTurn - 1) / 5) + 1;
//     const rowNum = ((currentTurn - 1) % 5) + 1;
//     const selector = `#endless div.words > div.row > div.col:nth-child(${colNum}) > div.row:nth-child(${rowNum})`;
//     return selector
// };

// /**解答に含まれない文字（灰色背景） */
// const blackCharElems = document.querySelectorAll(".words .grey > .char");
// /**解答には含まれるが、場所が違う文字 */
// const yellowCharElems = document.querySelectorAll(".words div[style*='background-color: rgb(201, 180, 88)'] > .char");
// /**解答と場所も一致している文字 */
// const greenCharElems = document.querySelectorAll(".words .green > .char");

/**答えに使われない文字を取得し、引数のリストに格納する */
const addBlackCharList = (blackCharList: string[], postedChar: PostedCharType[]) => {
	postedChar.forEach((value) => {
		if (value.color == "grey darken-1") {
			blackCharList.push(value.char);
		}
	});
};

/**答えに含まれるが場所が異なる文字を取得し、引数のリストに格納する */
const addYellowCharList = (yellowCharList: { char: string; position: number }[], postedChar: PostedCharType[]) => {
	postedChar.forEach((value, index) => {
		if (value.color == "#c9b458") {
			yellowCharList.push({ char: value.char, position: index });
		}
	});
};

/**場所も一致している文字を取得し、引数のリストに格納する */
const addGreenCharList = (greenCharList: ArrayFiveValues<string>, postedChar: PostedCharType[]) => {
	postedChar.forEach((value, index) => {
		if (value.color == "green") {
			greenCharList[index] = value.char;
		}
	});
};

/**文字の評価リストを作成 */
export const addCharList = (postedCharDataList: PostedDataListType, postedChar: PostedCharType[]) => {
	addBlackCharList(postedCharDataList.black, postedChar);
	addYellowCharList(postedCharDataList.yellow, postedChar);
	addGreenCharList(postedCharDataList.green, postedChar);
};

/**ホワイトリストを変更 */
export const changeWhiteList = (whiteList: string[], postedCharDataList: PostedDataListType) => {
	const greenList = postedCharDataList.green;
	const yellowList = postedCharDataList.yellow;
	const yellowCharUnique: string[] = uniq(yellowList.map((value) => value.char));
	// ブラックリストから黄色や緑にも含まれるものは削除する
	const blackList = postedCharDataList.black.filter((char) => !(greenList.includes(char) || yellowCharUnique.includes(char)));
	/**返すポケモンの名前リスト */
	let newList = new Array(...whiteList);
	// 場所も一致している文字を持つポケモンを抽出
	if (greenList.toString() != new Array(5).fill("").toString()) {
		/**検索用の正規表現 */
		let greenRe = "";
		greenList.forEach((char) => {
			if (char == "") {
				greenRe += ".";
			} else {
				greenRe += char;
			}
		});
		newList = newList.filter((pokemonName) => pokemonName.match(new RegExp(greenRe)));
	}
	// 場所は異なるが解答にある文字を持つポケモンを抽出
	if (yellowList.toString()) {
		newList = newList.filter((pokemonName) => yellowCharUnique.filter((char) => pokemonName.includes(char)).length == yellowCharUnique.length);
		const yellowReList: string[] = new Array(5).fill("");
		yellowList.forEach((value) => {
			yellowReList[value.position] += value.char;
		});
		const yellowRe = new RegExp(
			yellowReList
				.map((value) => "[^" + value + "]")
				.toString()
				.replaceAll(",", "")
		);
		newList = newList.filter((pokemonName) => pokemonName.match(yellowRe));
	}
	// 解答にない文字を含むポケモンを除外
	if (blackList.toString()) {
		newList = newList.filter((pokemonName) => !blackList.map((char) => pokemonName.includes(char)).includes(true));
	}
	return newList;
};
