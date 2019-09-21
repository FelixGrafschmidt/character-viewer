export default class Partner {
	private _name?: string;
	private _imageUrl?: string;

	constructor(name: string, imageUrl: string) {
		this._name = name;
		this._imageUrl = imageUrl;
	}
	public get name(): string | undefined {
		return this._name;
	}
	public get imageUrl(): string | undefined {
		return this._imageUrl;
	}


	public set name(name: string | undefined) {
		this._name = name;
	}
	public set imageUrl(imageUrl: string | undefined) {
		this._imageUrl = imageUrl;
	}
}
