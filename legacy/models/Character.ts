export interface Character {
	name: string;
	imageUrl?: string;
	variants?: Array<Variant>;
	partners?: Array<Partner>;
	origin?: string;
}

export interface Variant {
	name: string;
	imageUrl?: string;
}
export interface Partner {
	name: string;
	imageUrl?: string;
}
