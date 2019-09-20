import Character from "./Character";

export default class Origin {
	private _name: string;
	private _characters: Array<Character>;

	constructor(name: string, characters: Array<Character>) {
		this._name = name;
		this._characters = characters;
	}

	public get name() {
		return this._name;
	}
	public get characters() {
		return this._characters;
	}
}
