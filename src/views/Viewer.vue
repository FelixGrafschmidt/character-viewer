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
	import { Component, Vue, Prop } from "vue-property-decorator";
	// Vue components
	import MoeCharacterElement from "@/components/MoeCharacterElement.vue";
	// 3rd Party
	import { Carousel, Slide } from "vue-carousel";
	import { Character } from "../models/Character";

	@Component({
		components: {
			MoeCharacterElement,
			Carousel,
			Slide
		}
	})
	export default class Viewer extends Vue {
		@Prop()
		characters!: Array<Character>;
		@Prop()
		index!: number;

		currentCharacter: Character = this.characters[this.index];

		updateCurrentCharacter(page: number): void {
			this.currentCharacter = this.characters[page];
			this.$emit("index-change", page);
		}
	}
</script>

<style lang="scss" scoped>
</style>
