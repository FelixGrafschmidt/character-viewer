export default class Character {
	private _name: string;
	private _imageUrl: URL;
	private _partner: Character;

	constructor(name: string, imageUrl: URL, partner: Character) {
		this._name = name;
		this._imageUrl = imageUrl;
		this._partner = partner;
	}

	public get name(): string {
		return this._name;
	}
	public get imageUrl(): URL {
		return this._imageUrl;
	}
	public get partner(): Character {
		return this._partner;
	}
}
