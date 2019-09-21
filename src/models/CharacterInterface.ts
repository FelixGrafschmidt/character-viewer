export interface Variant {
	name: string;
	imageUrl: string;
}

export interface Partner {
	name: string;
	imageUrl: string;
}

export interface Character {
	name: string;
	origin: string;
	imageUrl: string;
	variants: Variant[];
	partners: Partner[];
}
