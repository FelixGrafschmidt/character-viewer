export default class Character {
	private _name: string;
	private _imageUrl: URL;
	private _partners: Array<Character>;
	private _variants: Array<Character>;
	private _origin: string;

	constructor(name: string, imageUrl: URL, partners: Array<Character>, variants: Array<Character>, origin: string) {
		this._name = name;
		this._imageUrl = imageUrl;
		this._partners = partners;
		this._variants = variants;
		this._origin = origin;
	}

	public get name(): string {
		return this._name;
	}
	public get imageUrl(): URL {
		return this._imageUrl;
	}
	public get partners(): Array<Character> {
		return this._partners;
	}
	public get variants(): Array<Character> {
		return this._variants;
	}
	public get origin(): string {
		return this._origin;
	}
}
