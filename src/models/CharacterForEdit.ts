import { Character, SubCharacter } from "./Character";

export interface CharacterForEdit extends Character {
	newVariants: Array<SubCharacter>;
	newPartners: Array<SubCharacter>;
	newName?: string;
	newOrigin?: string;
	newImageUrl?: string;
}
