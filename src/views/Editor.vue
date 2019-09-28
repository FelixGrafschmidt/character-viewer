<template>
	<form class="narrow-center container is-centered">
		<div class="container has-text-centered title is-2">Add a new character</div>
		<div class="field">
			<label class="label">Character Name</label>
			<div class="control">
				<input
					class="input name-input"
					type="text"
					placeholder="Text input"
				>
			</div>
		</div>

		<label class="label">Character Image Url</label>
		<div class="field has-addons">
			<div class="control">
				<input
					class="input image-url-input"
					type="text"
					placeholder="Text input"
					ref="mainCharacterImageInput"
				>
			</div>
			<div class="control">
				<a
					class="image-submit-button button is-primary"
					@click="loadMainCharacterImage"
				>
					Submit
				</a>
			</div>
		</div>
		<div>
			<div class="label">Image Preview</div>
			<img
				class="image"
				alt="mainCharacter"
				:src="mainImageUrl"
				v-show="mainImageUrl"
			/>
		</div>
	</form>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	import axios from "axios";
	// TS models
	import Character from "@/models/Character";
	// static resources
	import CharactersJson from "@/resources/characters.json";

	@Component({
		components: {},
		created() {}
	})
	export default class Editor extends Vue {
		mainImageUrl: string = "";

		public loadMainCharacterImage(): void {
			const element: HTMLFormElement = this.$refs
				.mainCharacterImageInput as HTMLFormElement;
			const url: string = element.value;
			axios
				.get(url)
				.then(response => {
					if (response.status === 200) {
						this.mainImageUrl = url;
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
</script>

<style lang="scss">
	.narrow-center {
		padding-left: 300px;
		padding-right: 300px;
	}
	.image-url-input {
		width: 500px;
	}
	.name-input {
		width: 600px;
	}
	.image-submit-button {
		width: 100px;
	}
</style>
