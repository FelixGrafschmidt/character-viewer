<template>
	<div class="modal">
		<div
			class="modal-background"
			@click="$emit('toggle-modal', 'export')"
		></div>
		<div class="modal-content">
			<div class="section modal-import has-text-centered">
				<a
					class="button is-primary"
					download="characters.json"
					:href="file"
				>
					Download characters
				</a>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";
	@Component({
		components: {}
	})
	export default class MoeExport extends Vue {
		@Prop()
		characters!: string;

		file: string = "";

		private created(): void {
			console.log("created");

			console.log(this.characters);

			this.file = "data:" + "text/json" + ";base64," + btoa(this.characters);
		}
	}
</script>
<style lang="scss" scoped>
	.modal-import {
		background-color: black;
	}
</style>
