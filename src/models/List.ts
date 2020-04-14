import { Character } from "./Character";

export interface List {
	id: string;
	name: string;
	characters: Array<Character>
}
