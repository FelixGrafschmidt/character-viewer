<template>
	<div class="columns is-centered">
		<div class="column has-text-centered">
			<h2 class="title is-2">{{ character.origin }}</h2>
			<div class="character-card">
				<button
					class="button"
					@click="
						!(
							character.variants === undefined ||
							character.variants.length === 0
						)
							? (variantsVisible = !variantsVisible)
							: false
					"
					:class="
						!(
							character.variants === undefined ||
							character.variants.length === 0
						)
							? 'is-success'
							: 'is-danger'
					"
				>
					{{ variantsVisible ? "Hide variants" : "Show variants" }}
				</button>
				<button
					@click="
						!(
							character.partners === undefined ||
							character.partners.length === 0
						)
							? (partnersVisible = !partnersVisible)
							: false
					"
					:class="
						!(
							character.partners === undefined ||
							character.partners.length === 0
						)
							? 'is-success'
							: 'is-danger'
					"
					class="button"
				>
					{{ partnersVisible ? "Hide partners" : "Show partners" }}
				</button>
				<div v-if="!variantsVisible && !partnersVisible">
					<h3 class="title is-3">{{ character.name }}</h3>
					<img
						:alt="character.name"
						class="character-image"
						:src="character.imageUrl"
					/>
				</div>
				<div v-else-if="variantsVisible" class="columns">
					<div
						v-for="variant in character.variants"
						:key="variant.name"
						class="column"
					>
						<h3 class="title is-3">{{ variant.name }}</h3>
						<img
							:alt="variant.name"
							class="character-image"
							:src="variant.imageUrl"
						/>
					</div>
				</div>
				<div v-else class="columns">
					<div
						v-for="partner in character.partners"
						:key="partner.name"
						class="column"
					>
						<h3 class="title is-3">{{ partner.name }}</h3>
						<img
							:alt="partner.name"
							class="character-image"
							:src="partner.imageUrl"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import Character from "./../models/Character";

	@Component
	export default class CharacterElement extends Vue {
		@Prop() private character!: Character;

		variantsVisible: boolean = false;
		partnersVisible: boolean = false;

		private showVariants(): void {}
		private showPartners(): void {}
	}
</script>

<style scoped lang="scss">
</style>
