<template>
	<b-modal custom-class="modal" @close="$emit('close')" :active.sync="isActive" scroll="keep">
		<section class="section modal-section has-text-centered">
			<pre ref="json-export"> {{ JSON.stringify(characters) }}</pre>
			<div class="section modal-button-container">
				<button @click="copyJson" class="button is-link is-outlined">Copy to clipboard</button>&nbsp;
				<button @click="downloadJson" class="button is-link is-outlined">Export to file</button>
			</div>
		</section>
	</b-modal>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop, Watch } from "vue-property-decorator";
	// models
	import { Character } from "@/models/Character";

	@Component({
		components: {}
	})
	export default class MoeExporter extends Vue {
		@Prop({ required: true, type: Array })
		characters!: Array<Character>;

		@Prop({ required: true, type: Boolean })
		active!: boolean;

		private isActive: boolean = false;

		@Watch("active")
		onPropertyChanged(value: boolean, oldValue: boolean) {
			this.isActive = value;
		}

		private copyJson(): void {
			const ref = this.$refs["json-export"] as Node;
			const range = document.createRange();
			range.selectNodeContents(ref);
			const sel = window.getSelection();
			if (sel !== null) {
				sel.removeAllRanges();
				sel.addRange(range);
			}
			document.execCommand("copy");
			navigator.clipboard.writeText(JSON.stringify(this.characters));
			this.isActive = false;
		}
		private downloadJson(): void {
			const blob = new Blob([JSON.stringify(this.characters, undefined, 4)], { type: "application/json" });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = "characters.json";
			link.click();
			URL.revokeObjectURL(link.href);
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
