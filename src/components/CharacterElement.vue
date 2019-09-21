<template>
	<div class="columns is-centered">
		<div class="column has-text-centered">
			<!-- <div
				class="modal"
				:class="{ 'is-active': variantsVisible }"
				style="width:100vw;"
			>
				<div
					class="modal-background"
					@click="variantsVisible = false"
				></div>
				<div class="modal-content columns">
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
			</div>
			<div
				class="modal"
				:class="{ 'is-active': partnersVisible }"
				style="width:100vw;"
			>
				<div
					class="modal-background"
					@click="partnersVisible = false"
				></div>
				<div class="modal-content columns">
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
			</div> -->
			<h2 class="title is-2">{{ character.origin }}</h2>
			<div class="character-card">
				<button
					class="button"
					@click="
						character.variants !== undefined
							? (variantsVisible = !variantsVisible)
							: false
					"
					:class="
						character.variants !== undefined
							? 'is-success'
							: 'is-danger'
					"
				>
					{{ variantsVisible ? "Hide variants" : "Show variants" }}
				</button>
				<button
					@click="
						character.partners !== undefined
							? (partnersVisible = !partnersVisible)
							: false
					"
					:class="
						character.partners !== undefined
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
	.content.is-vcentered {
		display: flex;
		flex-wrap: wrap;
		align-content: center; /* used this for multiple child */
		align-items: center; /* if an only child */
	}
</style>
