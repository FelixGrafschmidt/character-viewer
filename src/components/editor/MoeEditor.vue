<template>
	<div class="section">
		<section class="columns is-centered">
			<button @click="$emit('save', character)" class="button is-success">Save</button>
			<button @click="$emit('discard', character)" class="button is-danger">Discard</button>
		</section>
		<section class="columns is-centered">
			<div class="column is-half">
				<div class="has-text-centered is-centered columns">
					<b-field type="is-link" label="Name" class="field column is-7">
						<b-input v-model="character.name" size="is-medium"></b-input>
					</b-field>
				</div>
				<div class="has-text-centered is-centered columns">
					<b-field type="is-link" label="Origin" class="field column is-7">
						<b-input v-model="character.origin" size="is-medium"></b-input>
					</b-field>
				</div>
				<div class="has-text-centered is-centered columns">
					<b-field type="is-link" label="Image URL" class="field column is-7">
						<b-input v-model="character.imageUrl" size="is-medium"></b-input>
					</b-field>
				</div>
				<div class="card image-card" v-if="character.imageUrl">
					<div class="card-image" v-show="imageVisible">
						<figure class="character-image-container columns is-centered image is-4by7">
							<img
								@mouseover="imageHovered = true"
								@mouseleave="imageHovered = false"
								:src="character.imageUrl"
								:alt="character.name"
								class="character-image column is-7"
							/>
						</figure>
					</div>
					<div
						class="card-content is-overlay has-text-centered columns is-centered is-vcentered"
						:class="imageVisible && !imageHovered ? 'invisible-hover-element' : 'visible-hover-element'"
					>
						<div
							class="column hover-element-container"
							@mouseleave="imageHovered = false"
							@mouseover="imageHovered = true"
						>
							<b-button @click="toggleImage" class="image-toggler button tag is-link is-outlined is-3">
								{{ imageVisible ? "Hide image preview" : "Show image preview" }}
							</b-button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section>
			<section class="columns sub-characters-container is-centered">
				<div class="column has-text-centered is-one-third">
					<div class="field">
						<b-checkbox v-model="hasVariants" type="is-link">Variants</b-checkbox>
					</div>
					<div class="columns is-centered" v-if="hasVariants">
						<div class="column">
							<div class="column card">
								<button @click="character.variants.unshift({ name: '' })" class="button is-link">
									Add new Variant
								</button>
							</div>
							<moe-edit-sub-character-element
								class="is-centered"
								v-for="(variant, index) in character.variants"
								:key="index"
								:initial-character="variant"
								:is-sub-character="true"
								@delete-character="character.variants.splice(character.variants.indexOf($event), 1)"
							>
							</moe-edit-sub-character-element>
						</div>
					</div>
				</div>
				<div class="column has-text-centered is-one-third">
					<div class="field">
						<b-checkbox v-model="hasPartners" type="is-link">Partners</b-checkbox>
					</div>
					<div class="columns is-centered" v-if="hasPartners">
						<div class="column">
							<div class="column card">
								<button @click="character.partners.unshift({ name: '' })" class="button is-link">
									Add new Partner
								</button>
							</div>
							<moe-edit-sub-character-element
								@delete-character="character.partners.splice(character.partners.indexOf($event), 1)"
								class="is-centered"
								v-for="(partner, index) in character.partners"
								:key="index"
								:initial-character="partner"
								:is-sub-character="true"
							>
							</moe-edit-sub-character-element>
						</div>
					</div>
				</div>
			</section>
		</section>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";

	import MoeEditSubCharacterElement from "@/components/editor/MoeEditSubCharacterElement.vue";
	import { CharacterForEdit } from "../../models/CharacterForEdit";
	import { Character } from "../../models/Character";

	@Component({ components: { MoeEditSubCharacterElement } })
	export default class MoeEditor extends Vue {
		@Prop({ required: true, type: Object })
		private initialCharacter!: CharacterForEdit;
		@Prop({ required: true, type: Array })
		private characters!: Array<Character>;
		@Prop({ required: true, type: Array })
		private charactersForEdit!: Array<CharacterForEdit>;

		private character: CharacterForEdit = this.initialCharacter;
		private hasVariants: boolean = this.character.variants.length > 0;
		private hasPartners: boolean = this.character.partners.length > 0;
		private imageVisible: boolean = true;
		private imageHovered: boolean = false;

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
		padding: unset !important;
		width: 50%;
		margin-top: 0.6rem;
	}
	.image-card {
		border: 0px !important;
		box-shadow: unset !important;
		min-height: 100px;
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
	.card-content {
		height: 10%;
		padding-top: 0.7rem;
		padding-bottom: unset;
		min-height: 5rem;
	}
	.delete-sub-character-button {
		right: 10px;
		top: 10px;
		position: absolute;
	}
	.invisible-hover-element {
		opacity: 0;
	}
	.visible-hover-element {
		opacity: 0.5;
		background-color: #080808;
	}
	.hover-element-container {
		width: 59%;
		flex: none;
		height: 100%;
	}
	/deep/ .card {
		border-color: #00ffff;
	}
</style>
