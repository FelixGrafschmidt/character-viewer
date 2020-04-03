// 3rdParty
import { Character, Partner, Variant } from "@/models/Character";
import { JsonDecoder } from "ts.data.json";

// const characterListDecoder: Decoder<CharacterList> = object({
// 	_id: number(),
// 	characters: array<Character>(characterDecoder)
// });

const variantDecoder = JsonDecoder.object<Variant>({
	name: JsonDecoder.string,
	imageUrl: JsonDecoder.optional(JsonDecoder.string),
}, "VariantDecoder");

const partnerDecoder = JsonDecoder.object<Partner>({
	name: JsonDecoder.string,
	imageUrl: JsonDecoder.optional(JsonDecoder.string),
}, "PartnerDecoder");

const characterDecoder = JsonDecoder.object<Character>({
	name: JsonDecoder.string,
	origin: JsonDecoder.optional(JsonDecoder.string),
	imageUrl: JsonDecoder.optional(JsonDecoder.string),
	partners: JsonDecoder.optional(JsonDecoder.array<Partner>(
		partnerDecoder, "PartnerListDecoder"
	)),
	variants: JsonDecoder.optional(JsonDecoder.array<Variant>(
		variantDecoder, "VariantListDecoder"
	)),
}, "CharcaterDecoder");

const localCharacterListDecoder = JsonDecoder.array<Character>(
	characterDecoder, "LocalCharacterListDecoder"
);

export function decodeLocalCharacterList(list: any) {
	return localCharacterListDecoder.decodePromise(list);
}