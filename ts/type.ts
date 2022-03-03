export type PostedCharType = { char: string; color: string };
export type PostedDataType = { clearCount: number; cleared: boolean; date: string; generation: number; postedPokemon: PostedCharType[][]; seed: string };
export type ArrayFiveValues<T> = [T, T, T, T, T];
export type PostedDataListType = {
	black: string[];
	yellow: {
		char: string;
		position: number;
	}[];
	green: ArrayFiveValues<string>;
};
