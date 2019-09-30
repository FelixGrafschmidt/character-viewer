<template>
	<section class="section is-relative">
		<button
			class="button is-danger delete-sub-character"
			v-if="isSubCharacter"
			@click.prevent="$emit('delete')"
		>
			X
		</button>
		<div class="field">
			<label class="label">Character Name</label>
			<div class="control">
				<input
					class="input name-input"
					type="text"
					placeholder="Text input"
					v-model="currentCharacter.name"
				/>
			</div>
		</div>
		<div class="field" v-if="!isSubCharacter">
			<label class="label">Origin</label>
			<div class="control">
				<input
					class="input name-input"
					type="text"
					placeholder="Text input"
					v-model="currentCharacter.origin"
				/>
			</div>
		</div>

		<label class="label">Character Image Url</label>
		<div class="field has-addons">
			<div class="control image-url-input">
				<input
					class="input"
					type="text"
					placeholder="Text input"
					v-model="currentCharacter.imageUrl"
				/>
			</div>
		</div>
		<div>
			<div v-show="currentCharacter.imageUrl" class="label">
				Image Preview
			</div>
			<img
				class="image container"
				alt="mainCharacter"
				:src="currentCharacter.imageUrl"
				v-show="currentCharacter.imageUrl"
			/>
		</div>
		<section class="columns section" v-if="!isSubCharacter">
			<div class="column">
				<div class="field">
					<input
						id="variantsSwitch"
						type="checkbox"
						name="variantsSwitch"
						class="switch is-rounded"
						:checked="currentCharacter.variants"
						@click="showVariants"
					/>
					<label for="variantsSwitch"
						>Does this character have variants?</label
					>
				</div>
				<div
					class="solid-primary-border section has-text-centered"
					v-show="variantsVisible"
				>
					<button
						@click.prevent="addNewVariant"
						class="button is-primary is-inverted is-outlined"
					>
						Add new Variant
					</button>
				</div>
				<div v-if="variantsVisible">
					<moe-edit-character-element
						@delete="deleteVariant(index)"
						class="solid-primary-border"
						v-for="(variant, index) in currentCharacter.variants"
						:key="index"
						:currentCharacter="variant"
						:isSubCharacter="true"
					/>
				</div>
			</div>
			<div class="column">
				<div class="field">
					<input
						id="partnersSwitch"
						type="checkbox"
						name="partnersSwitch"
						class="switch is-rounded"
						:checked="currentCharacter.partners"
						@click="showPartners"
					/>
					<label for="partnersSwitch"
						>Does this character have partners?</label
					>
				</div>
				<div
					class="solid-primary-border section has-text-centered"
					v-show="partnersVisible"
				>
					<button
						@click.prevent="addNewPartner"
						class="button is-primary is-inverted is-outlined"
					>
						Add new partner
					</button>
				</div>

				<div v-if="partnersVisible">
					<moe-edit-character-element
						@delete="deletePartner(index)"
						class="solid-primary-border"
						v-for="(partner, index) in currentCharacter.partners"
						:key="index"
						:currentCharacter="partner"
						:isSubCharacter="true"
					/>
				</div>
			</div>
		</section>
	</section>
</template>
<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop } from "vue-property-decorator";
	import { Character, Variant, Partner } from "../models/Character";
	import axios from "axios";

	@Component({
		components: {}
	})
	export default class MoeEditCharacterElement extends Vue {
		@Prop()
		currentCharacter!: Character;
		@Prop()
		isSubCharacter!: boolean;

		variantsVisible: boolean = false;
		partnersVisible: boolean = false;

		private created(): void {
			this.variantsVisible = this.currentCharacter.variants !== undefined;
			this.partnersVisible = this.currentCharacter.partners !== undefined;
		}
		showVariants(event: MouseEvent): void {
			const target = event.target as HTMLInputElement;
			this.variantsVisible = target.checked;
		}
		showPartners(event: MouseEvent): void {
			const target = event.target as HTMLInputElement;
			this.partnersVisible = target.checked;
		}
		deleteVariant(index: number): void {
			if (this.currentCharacter.variants) {
				this.currentCharacter.variants.splice(index, 1);
			}
			this.$forceUpdate();
		}
		deletePartner(index: number): void {
			if (this.currentCharacter.partners) {
				this.currentCharacter.partners.splice(index, 1);
			}
			this.$forceUpdate();
		}
		addNewVariant(): void {
			if (!this.currentCharacter.variants) {
				this.currentCharacter.variants = new Array<Variant>();
			}
			this.currentCharacter.variants.unshift({ name: "", imageUrl: "" });
			this.$forceUpdate();
		}
		addNewPartner(): void {
			if (!this.currentCharacter.partners) {
				this.currentCharacter.partners = new Array<Partner>();
			}
			this.currentCharacter.partners.unshift({ name: "", imageUrl: "" });
			this.$forceUpdate();
		}
	}
</script>
<style lang="scss" scoped>
	.image-url-input {
		width: 100%;
	}
	.solid-primary-border {
		border-style: solid;
		border-color: #00b59a;
	}
	.delete-sub-character {
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>
