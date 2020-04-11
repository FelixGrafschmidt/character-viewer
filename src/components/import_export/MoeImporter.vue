<template>
	<b-modal custom-class="modal" @close="$emit('close')" :active.sync="isActive" scroll="keep">
		<section
			@click="
				isActive = false;
				$emit('close');
			"
			class="section modal-section has-text-centered"
		>
			<textarea
				@click.stop
				v-model="rawCharacters"
				placeholder="Paste your exported characters here"
				cols="30"
				rows="10"
			></textarea>
			<div class="section modal-button-container has-text-centered">
				<button @click.stop="importCharacters" class="button is-link is-outlined">Import</button>
			</div>
		</section>
	</b-modal>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop, Watch } from "vue-property-decorator";
	// Tmodels
	import { Character } from "@/models/Character";

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
			this.$emit("import", JSON.parse(this.rawCharacters) as Array<Character>);
			this.isActive = false;
		}
	}
</script>

<style lang="scss" scoped>
	.modal-textarea {
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0) !important;
		color: #bebebe;
	}
	.modal-section {
		padding: unset;
	}
	.modal-button-container {
		padding-left: unset;
		padding-right: unset;
		padding-bottom: unset;
	}
</style>
