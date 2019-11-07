<template>
	<carousel
		:perPage="1"
		:navigationEnabled="true"
		:navigateTo="index"
		:navigationClickTargetSize="20"
		:paginationActiveColor="'#00d1b2'"
		:paginationColor="'#ffffff50'"
		:touchDrag="true"
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
	// TS-models
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

		updateCurrentCharacter(page: number): void {
			this.$emit("index-change", page);
		}
	}
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
	/* Used to provide proper styling to carousel navigation */
	.VueCarousel-navigation-button {
		transform: unset !important;
		border-radius: 4px !important;
		border-color: transparent !important;
		color: #fff !important;
		transition: box-shadow 0.1s linear !important;
		background: #00d1b2 !important;
		box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3) inset !important,
			0 1px 15px 0 rgba(0, 0, 0, 0.6) inset !important;
		border-width: 0 !important;
	}
	@media screen and (min-width: 769px) {
		.VueCarousel-navigation-button {
			margin-left: 200px !important;
			margin-right: 200px !important;
		}
	}
	@media screen and (max-width: 768px) {
		.VueCarousel-navigation-button {
			display: none;
		}
	}
</style>
