import { Character, Partner, Variant } from "./Character";

export interface CharacterForEdit extends Character {
	newVariants: Array<Variant>;
	newPartners: Array<Partner>;
	newName?: string;
	newOrigin?: string;
	newImageUrl?: string;
}
