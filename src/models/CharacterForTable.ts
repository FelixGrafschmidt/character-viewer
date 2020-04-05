import { Character, Partner, Variant } from "./Character";

export interface CharacterForTable extends Character {
	detailsOpened: boolean;
	editing: boolean;

	newVariant?: Variant;
	newPartner?: Partner;
	newName?: string;
	newOrigin?: string;
	newImageUrl?: string;
}
