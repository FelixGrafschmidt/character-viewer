import { Character, SubCharacter } from "./Character";

export interface CharacterForTable extends Character {
	detailsOpened: boolean;
	editing: boolean;

	newVariant?: SubCharacter;
	newPartner?: SubCharacter;
	newName?: string;
	newOrigin?: string;
	newImageUrl?: string;
}
