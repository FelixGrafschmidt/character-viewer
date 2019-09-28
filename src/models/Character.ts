import Partner from "@/models/Partner";
import Variant from "@/models/Variant";

export default class Character {
	private _name?: string;
	private _imageUrl?: string;
	private _partners?: Array<Partner> = [];
	private _variants?: Array<Variant> = [];
	private _origin?: string = "";

	constructor(name: string, imageUrl: string, partners?: Array<Partner>, variants?: Array<Variant>, origin?: string) {
		this._name = name;
		this._imageUrl = imageUrl;
		if (partners) {
			this._partners = partners;
		}
		if (variants) {
			this._variants = variants;
		}
		if (origin) {
			this._origin = origin;
		}
	}
	public get name(): string | undefined {
		return this._name;
	}
	public get imageUrl(): string | undefined {
		return this._imageUrl;
	}
	public get partners(): Array<Partner> | undefined {
		return this._partners;
	}
	public get variants(): Array<Variant> | undefined {
		return this._variants;
	}
	public get origin(): string | undefined {
		return this._origin;
	}


	public set name(name: string | undefined) {
		this._name = name;
	}
	public set imageUrl(imageUrl: string | undefined) {
		this._imageUrl = imageUrl;
	}
	public set partners(partners: Array<Partner> | undefined) {
		this._partners = partners;
	}
	public set variants(variants: Array<Variant> | undefined) {
		this._variants = variants;
	}
	public set origin(origin: string | undefined) {
		this._origin = origin;
	}
}
