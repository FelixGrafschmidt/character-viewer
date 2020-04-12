export interface Character {
	name: string;
	imageUrl?: string;
	variants: Array<SubCharacter>;
	partners: Array<SubCharacter>;
	origin?: string;

	detailsOpened: boolean;
	editing: boolean;

	newVariants?: Array<SubCharacter>;
	newPartners?: Array<SubCharacter>;
	newName?: string;
	newOrigin?: string;
	newImageUrl?: string;
}

export interface SubCharacter {
	name: string;
	imageUrl?: string;
	newName?: string;
	newImageUrl?: string;
}
