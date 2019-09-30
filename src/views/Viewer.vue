<template>
	<carousel
		:perPage="1"
		:navigationEnabled="true"
		@page-change="updateCurrentCharacter"
	>
		<slide v-for="character in characters" :key="character.name">
			<moe-character-element
				:character="character"
			></moe-character-element>
		</slide>
	</carousel>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	// Vue components
	import MoeCharacterElement from "@/components/MoeCharacterElement.vue";
	// 3rd Party
	import { Carousel, Slide } from "vue-carousel";
	import {
		Decoder,
		string,
		optional,
		array,
		object
	} from "@mojotech/json-type-validation";
	// TS models
	import { Character, Variant, Partner } from "../models/Character";
	// static resources
	import CharactersJson from "@/resources/characters.json";

	const variantDecoder: Decoder<Variant> = object({
		name: string(),
		imageUrl: optional(string())
	});
	const partnerDecoder: Decoder<Partner> = object({
		name: string(),
		imageUrl: optional(string())
	});
	const characterDecoder: Decoder<Character> = object({
		name: string(),
		imageUrl: optional(string()),
		partners: optional(array<Variant>(variantDecoder)),
		variants: optional(array<Partner>(partnerDecoder)),
		origin: optional(string())
	});
	const characterListDecoder: Decoder<Array<Character>> = array<Character>(
		characterDecoder
	);

	@Component({
		components: {
			MoeCharacterElement,
			Carousel,
			Slide
		}
	})
	export default class Viewer extends Vue {
		characters: Character[] = new Array<Character>();
		updateCurrentCharacter(page: number): void {
			this.$store.commit("SET_CURRENTCHARACTER", this.characters[page]);
		}

		private created(): void {
			characterListDecoder
				.runPromise(CharactersJson)
				.then(result => {
					this.characters = result;
					if (this.characters.length > 0) {
						this.$store.commit(
							"SET_CURRENTCHARACTER",
							this.characters[0]
						);
					}
				})
				.catch(error => {
					this.characters = new Array<Character>();
				});
		}
	}
</script>

<style lang="scss" scoped>
</style>
