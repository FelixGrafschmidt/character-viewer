<template>
	<b-modal custom-class="modal" @close="$emit('close')" :active.sync="isActive" scroll="keep">
		<section class="section modal-section has-text-centered">
			<textarea
				v-model="rawCharacters"
				placeholder="Paste your exported characters here"
				cols="30"
				rows="10"
			></textarea>
			<div class="section">
				<button @click="importCharacters" class="button is-link is-outlined">Import</button>
			</div>
		</section>
	</b-modal>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop, Watch } from "vue-property-decorator";
	// Tmodels
	import { Character } from "@/models/Character";

	// services
	import { decodeLocalCharacterList } from "@/services/CharacterListDecoderService";

	@Component({
		components: {}
	})
	export default class MoeImporter extends Vue {
		@Prop({ required: true, type: Boolean })
		active!: boolean;

		private isActive: boolean = false;

		@Watch("active")
		onPropertyChanged(value: boolean, oldValue: boolean) {
			this.isActive = value;
		}

		private rawCharacters: string = "";

		private importCharacters(): void {
			decodeLocalCharacterList(this.rawCharacters)
				.then(result => {
					this.$emit("import", result);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .modal-background {
		background-color: rgba(8, 8, 8, 0.86) !important;
	}
	.modal-textarea {
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0) !important;
		color: #bebebe;
	}
</style>
