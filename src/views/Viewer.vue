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
	// TS models
	import Character from "@/models/Character";
	// static resources
	import CharactersJson from "@/resources/characters.json";

	@Component({
		components: {
			MoeCharacterElement,
			Carousel,
			Slide
		}
	})
	export default class Viewer extends Vue {
		characters: Character[] = CharactersJson;

		updateCurrentCharacter(page: number): void {
			this.$store.state.currentCharacter = this.characters[page];
		}

		private created(): void {
			if (this.characters.length > 0) {
				this.$store.state.currentCharacter = this.characters[0];
			}
		}
	}
</script>

<style lang="scss">
</style>
