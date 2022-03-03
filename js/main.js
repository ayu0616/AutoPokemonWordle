import { contains, sleep } from "./helper.js";
import { addCharList, changeWhiteList, frequency_best_score } from "./score.js";
import { fiveChars } from "./fiveChars.js";
import { answer } from "./input.js";
import { isEnd } from "./isEnd.js";
/**１ゲーム */
const oneGame = async () => {
    // 以下変数を初期化
    /**今のターン数 */
    let currentTurn = 1;
    /**答えとなる可能性がある名前 */
    let whiteList = fiveChars;
    /**答えとなる可能性がない文字 */
    const blackCharList = [];
    /**答えに含まれるが場所が異なる文字 */
    const yellowCharList = [];
    /***場所も一致している文字 */
    const greenCharList = new Array(5).fill("");
    /**文字の評価リスト */
    const postedCharDataList = {
        black: blackCharList,
        yellow: yellowCharList,
        green: greenCharList,
    };
    // 初期化ここまで
    /**１ターン */
    const oneTurn = async () => {
        /**ローカルストレージから取得したデータ */
        const postedData = JSON.parse(localStorage.getItem("endlessGameState"));
        /**前回のターンに送信した文字のデータ */
        const postedChar = postedData.postedPokemon.slice(-1)[0];
        if (postedChar) {
            // 文字リストに追加
            addCharList(postedCharDataList, postedChar);
            // ホワイトリストを弄る
            whiteList = changeWhiteList(whiteList, postedCharDataList);
        }
        /**最もスコアが高いポケモンの名前 */
        const best_score_name = frequency_best_score(whiteList);
        // 解答を送信する
        console.log(whiteList);
        answer(best_score_name);
        // ホワイトリストから送信したデータを削除
        whiteList = whiteList.filter((item) => item.match(new RegExp(best_score_name)) == null);
        // 解答後、画面上に反映されるまで待機する
        await sleep(2000);
        // ゲームが終了したならループを抜ける
        if (isEnd(currentTurn)) {
            await sleep(1000);
            const nextButton = document.querySelector("#endless > div > div.keyboard.mx-auto.mt-4.pt-md-4.mb-6 > div.row.my-2.mx-1.align-content-end > button.ml-2.font-weight-bold.v-btn.v-btn--has-bg.theme--dark.elevation-0.v-size--default.green");
            nextButton.click();
            return oneGame();
        }
        // ターン終了
        currentTurn++;
        return oneTurn();
    };
    oneTurn();
};
// let whiteList = fiveChars;
const main = async () => {
    // テストここから
    // /**ローカルストレージから取得したデータ */
    // const postedData: PostedDataType = JSON.parse(<string>localStorage.getItem("endlessGameState"));
    // /**前回のターンに送信した文字のデータ */
    // const postedChar: PostedCharType[] = postedData.postedPokemon.slice(-1)[0];
    // console.log(postedChar);
    // テストここまで
    // 本番ここから
    // while (true) await oneGame();
    await oneGame();
    // 本番ここまで
};
(() => {
    const titleElem = contains("span", "POKEMON WORDLE")[0];
    titleElem.onclick = main;
})();
