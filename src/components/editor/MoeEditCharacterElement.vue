<template>
	<section>
		<div class="has-text-centered is-centered columns">
			<b-field type="is-link" label="Name" class="field column is-half">
				<b-input v-model="character.name" size="is-medium"></b-input>
			</b-field>
		</div>
		<div class="has-text-centered is-centered columns">
			<b-field type="is-link" label="Origin" class="field column is-half">
				<b-input v-model="character.origin" size="is-medium"></b-input>
			</b-field>
		</div>
		<div class="has-text-centered is-centered columns">
			<b-field type="is-link" label="Image URL" class="field column is-half">
				<b-input v-model="character.imageUrl" size="is-medium"></b-input>
			</b-field>
		</div>
		<div class="image-toggler-container columns is-centered">
			<b-button @click="toggleImage" class="image-toggler column is-half button">
				{{ imageVisible ? "Hide" : "Show" }}
			</b-button>
		</div>
		<figure v-show="imageVisible" class="character-image-container columns is-centered image is-4by7">
			<img :src="character.imageUrl" :alt="character.name" class="character-image column is-half" />
		</figure>
		<section class="columns sub-characters-container">
			<div class="column has-text-centered is-half">
				<div class="field">
					<b-checkbox v-model="hasVariants" type="is-link">Variants</b-checkbox>
				</div>
				<div v-if="hasVariants">
					<section
						class="column card"
						v-for="variant in character.variants ? character.variants : []"
						:key="variant.name"
					>
						<div class="has-text-centered is-centered columns">
							<b-field type="is-link" label="Name" class="field column is-half">
								<b-input v-model="variant.name" size="is-medium"></b-input>
							</b-field>
						</div>
						<div class="has-text-centered is-centered columns">
							<b-field type="is-link" label="Image URL" class="field column is-half">
								<b-input v-model="variant.imageUrl" size="is-medium"></b-input>
							</b-field>
						</div>
						<div class="image-toggler-container columns is-centered">
							<b-button @click="toggleImage" class="image-toggler column is-half button">
								{{ imageVisible ? "Hide" : "Show" }}
							</b-button>
						</div>
						<figure
							v-show="imageVisible"
							class="character-image-container columns is-centered image is-4by7"
						>
							<img :src="variant.imageUrl" :alt="variant.name" class="character-image column is-half" />
						</figure>
					</section>
				</div>
			</div>
			<div class="column has-text-centered is-half">
				<div class="field">
					<b-checkbox v-model="hasPartners" type="is-link">Partners</b-checkbox>
				</div>
			</div>
		</section>
	</section>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import { Character } from "@/models/Character";

	@Component
	export default class MoeEditCharacterElement extends Vue {
		@Prop({ required: true, type: Object })
		private initialCharacter!: Character;

		private character: Character = this.initialCharacter;
		private hasVariants: boolean = this.character.variants !== undefined;
		private hasPartners: boolean = this.character.partners !== undefined;
		private imageVisible: boolean = true;

		private toggleImage(): void {
			this.imageVisible = !this.imageVisible;
		}
	}
</script>


<style lang="scss" scoped>
	.image-toggler-container {
		margin-bottom: unset !important;
	}
	.image-toggler {
		width: 49% !important;
	}
	.character-image {
		padding-top: unset !important;
	}
	.character-image-container {
		margin-top: unset !important;
	}
	.sub-characters-container {
		padding-top: 20px;
	}
</style>
