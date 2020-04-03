<template>
	<div>
		<b-carousel
			v-model="index"
			:autoplay="false"
			:arrow-both="false"
			:jcon-pack="'fa'"
			icon-size="is-medium"
			@change="updateCurrentCharacter"
		>
			<b-carousel-item v-for="character in characters" :key="character.name">
				<section :class="`hero is-medium is-blue`">
					<div class="hero-body has-text-centered">
						<moe-character-element :character="character"></moe-character-element>
					</div>
				</section>
			</b-carousel-item>
		</b-carousel>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop } from "vue-property-decorator";
	// Vue components
	import MoeCharacterElement from "@/components/viewer/MoeCharacterElement.vue";
	// TS-models
	import { Character } from "../models/Character";

	import buefy from "buefy";

	@Component({
		components: {
			MoeCharacterElement
		}
	})
	export default class MoeViewer extends Vue {
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
	.hero-body {
		padding-top: unset !important;
		padding-bottom: 5vh !important;
	}
</style>
