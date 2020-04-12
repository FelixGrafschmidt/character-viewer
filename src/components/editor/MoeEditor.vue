<template>
	<div class="section">
		<section class="columns is-centered">
			<button v-if="isNewCharacter" @click="saveNewCharacter" class="button is-success">Save</button>
			<button v-else @click="saveChanges" class="button is-success">Save</button>
			<button @click="discardChanges" class="button is-danger">Discard</button>
			<button v-if="!isNewCharacter" @click="deleteCharacter" class="button is-danger">Delete</button>
		</section>
		<section class="columns is-centered">
			<div class="column is-half">
				<div class="has-text-centered is-centered columns">
					<b-field type="is-link" label="Name" class="field column is-7">
						<b-input v-model="characterToEdit.newName" size="is-medium"></b-input>
					</b-field>
				</div>
				<div class="has-text-centered is-centered columns">
					<b-field type="is-link" label="Origin" class="field column is-7">
						<b-input v-model="characterToEdit.newOrigin" size="is-medium"></b-input>
					</b-field>
				</div>
				<div class="has-text-centered is-centered columns">
					<b-field type="is-link" label="Image URL" class="field column is-7">
						<b-input v-model="characterToEdit.newImageUrl" size="is-medium"></b-input>
					</b-field>
				</div>
				<div class="card image-card" v-if="characterToEdit.newImageUrl">
					<div class="card-image" v-show="imageVisible">
						<figure class="character-image-container columns is-centered image is-4by7">
							<img
								@mouseover="imageHovered = true"
								@mouseleave="imageHovered = false"
								:src="characterToEdit.newImageUrl"
								:alt="characterToEdit.newName"
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
					<div ref="variants" class="columns is-centered" v-if="hasVariants">
						<div class="column">
							<div class="column card">
								<button @click="addVariant" class="button is-link">
									Add new Variant
								</button>
							</div>
							<moe-edit-sub-character-element
								class="is-centered"
								v-for="(variant, index) in characterToEdit.newVariants
									? characterToEdit.newVariants
									: []"
								:key="index"
								:initial-character="variant"
								:is-sub-character="true"
								@delete-character="deleteVariant(variant)"
							>
							</moe-edit-sub-character-element>
						</div>
					</div>
				</div>
				<div class="column has-text-centered is-one-third">
					<div class="field">
						<b-checkbox v-model="hasPartners" type="is-link">Partners</b-checkbox>
					</div>
					<div ref="partners" class="columns is-centered" v-if="hasPartners">
						<div class="column">
							<div class="column card">
								<button @click="addPartner" class="button is-link">
									Add new Partner
								</button>
							</div>
							<moe-edit-sub-character-element
								class="is-centered"
								v-for="(partner, index) in characterToEdit.newPartners
									? characterToEdit.newPartners
									: []"
								:key="index"
								:initial-character="partner"
								:is-sub-character="true"
								@delete-character="deletePartner(partner)"
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
	import { Character, SubCharacter } from "../../models/Character";

	import scrollTo from "vue-scrollto";

	@Component({ components: { MoeEditSubCharacterElement } })
	export default class MoeEditor extends Vue {
		@Prop({ required: true, type: Object })
		private characterToEdit!: Character;
		@Prop({ required: true, type: Boolean })
		private isNewCharacter!: boolean;
		@Prop({ required: true, type: Array })
		private characters!: Array<Character>;

		private hasVariants: boolean = this.characterToEdit.newVariants
			? this.characterToEdit.newVariants.length > 0
			: false;
		private hasPartners: boolean = this.characterToEdit.newPartners
			? this.characterToEdit.newPartners.length > 0
			: false;
		private imageVisible: boolean = true;
		private imageHovered: boolean = false;

		private created(): void {
			this.characterToEdit.newName = this.characterToEdit.name;
			this.characterToEdit.newOrigin = this.characterToEdit.origin;
			this.characterToEdit.newImageUrl = this.characterToEdit.imageUrl;
			this.characterToEdit.newVariants = [];
			this.characterToEdit.newPartners = [];
			this.characterToEdit.variants.forEach(variant => {
				this.characterToEdit.newVariants!.push(variant);
			});
			this.characterToEdit.partners.forEach(partner => {
				this.characterToEdit.newPartners!.push(partner);
			});
			this.hasVariants = this.characterToEdit.newVariants ? this.characterToEdit.newVariants.length > 0 : false;
			this.hasPartners = this.characterToEdit.newPartners ? this.characterToEdit.newPartners.length > 0 : false;
		}

		private changed() {
			this.$emit("changed");
			this.close();
		}

		private close() {
			this.$emit("close");
		}

		private toggleImage(): void {
			this.imageVisible = !this.imageVisible;
		}

		private addVariant(): void {
			this.characterToEdit.newVariants!.push({ name: "" });
			this.$forceUpdate();
			const ref = this.$refs.variants as Element;
			scrollTo.scrollTo(ref, { offset: ref.clientHeight - 20 });
		}
		private addPartner(): void {
			this.characterToEdit.newPartners!.push({ name: "" });
			this.$forceUpdate();
			const ref = this.$refs.partners as Element;
			scrollTo.scrollTo(ref, { offset: ref.clientHeight - 20 });
		}

		private saveNewCharacter(): void {
			this.characters.push(this.characterToEdit);
			this.changed();
		}
		private saveChanges(): void {
			this.characterToEdit.name = this.characterToEdit.newName
				? this.characterToEdit.newName
				: this.characterToEdit.name;
			this.characterToEdit.origin = this.characterToEdit.newOrigin
				? this.characterToEdit.newOrigin
				: this.characterToEdit.origin;
			this.characterToEdit.imageUrl = this.characterToEdit.newImageUrl
				? this.characterToEdit.newImageUrl
				: this.characterToEdit.imageUrl;
			this.characterToEdit.variants = [];
			this.characterToEdit.partners = [];
			this.characterToEdit.variants.forEach((variant: SubCharacter) => {
				variant.name = variant.newName ? variant.newName : variant.name;
				variant.imageUrl = variant.newImageUrl ? variant.newImageUrl : variant.imageUrl;
			});
			this.characterToEdit.partners.forEach((partner: SubCharacter) => {
				partner.name = partner.newName ? partner.newName : partner.name;
				partner.imageUrl = partner.newImageUrl ? partner.newImageUrl : partner.imageUrl;
			});
			if (this.characterToEdit.newVariants !== undefined && this.characterToEdit.newVariants.length > 0) {
				this.characterToEdit.newVariants.forEach(newVariant => {
					if (newVariant.name !== "") {
						this.characterToEdit.variants.push(newVariant);
					}
				});
			}
			if (this.characterToEdit.newPartners !== undefined && this.characterToEdit.newPartners.length > 0) {
				this.characterToEdit.newPartners.forEach(newPartner => {
					if (newPartner.name !== "") {
						this.characterToEdit.partners.push(newPartner);
					}
				});
			}
			this.characterToEdit.newName = undefined;
			this.characterToEdit.newOrigin = undefined;
			this.characterToEdit.newImageUrl = undefined;
			this.characterToEdit.newVariants = undefined;
			this.characterToEdit.newPartners = undefined;
			this.changed();
		}
		private discardChanges(): void {
			this.close();
		}
		private deleteCharacter(): void {
			this.characters.splice(this.characters.indexOf(this.characterToEdit), 1);
			this.changed();
		}
		private deleteVariant(variant: SubCharacter) {
			if (this.characterToEdit.newVariants) {
				this.characterToEdit.newVariants.splice(this.characterToEdit.newVariants.indexOf(variant), 1);
			}
			this.$forceUpdate();
		}
		private deletePartner(partner: SubCharacter) {
			if (this.characterToEdit.newPartners) {
				this.characterToEdit.newPartners.splice(this.characterToEdit.newPartners.indexOf(partner), 1);
			}
			this.$forceUpdate();
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
