<template>
	<div class="modal">
		<div
			class="modal-background"
			@click="$emit('toggle-modal', 'import')"
		></div>
		<div class="modal-content">
			<div class="section modal-import has-text-centered">
				<div>
					Select a file to import from. Its content has to start with
					"[" and end with "]".
					<label for="import" class="button is-primary is-outlined">
						Select file
					</label>
					<input
						type="file"
						name="import"
						id="import"
						class="is-hidden"
						@change="displayImport"
					/>
				</div>
				<div class="section">
					<div>
						Or paste the content here:
					</div>
					<textarea v-text="importContent" class="import-text-area" />
				</div>
				<button
					@click="$emit('import', importContent)"
					class="button is-primary"
				>
					Import
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";
	@Component({
		components: {}
	})
	export default class MoeImport extends Vue {
		importContent: string = "";

		displayImport(event: Event): void {
			const target = event.target as HTMLInputElement;
			if (target.files && target.files.length >= 0) {
				const file: File = target.files[0];
				const reader: FileReader = new FileReader();

				reader.readAsText(file);

				reader.onload = e => {
					this.importContent =
						typeof reader.result === "string" ? reader.result : "";
				};
			}
		}
	}
</script>
<style lang="scss" scoped>
	.modal-import {
		background-color: black;
	}
	.import-text-area {
		height: 200px;
		width: 100%;
		background-color: black;
		color: white;
	}
</style>
