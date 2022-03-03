import { PostedCharType, PostedDataType } from "./type";

/**ゲームが終了したかどうかを判定する関数 */
export const isEnd = (currentTurn: number) => {
	// ターンが10ターン目になったらゲーム終了
	if (currentTurn >= 10) return true;
	// ゲームクリアしたとき
	/**ローカルストレージから取得したデータ */
	const postedData: PostedDataType = JSON.parse(<string>localStorage.getItem("endlessGameState"));
	/**前回のターンに送信した文字のデータ */
	const postedChar: PostedCharType[] = postedData.postedPokemon.slice(-1)[0];
	if (postedChar.filter((value) => value.color == "green").length == 5) return true;
	return false;
};
