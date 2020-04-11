export interface Character {
	name: string;
	imageUrl?: string;
	variants: Array<SubCharacter>;
	partners: Array<SubCharacter>;
	origin?: string;
}

export interface SubCharacter {
	name: string;
	imageUrl?: string;
	newName?: string;
	newImageUrl?: string;
}
