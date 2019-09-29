<template>
	<form class="narrow-center container is-centered">
		<div class="container has-text-centered title is-2">
			Add a new character
		</div>
		<div class="field">
			<label class="label">Character Name</label>
			<div class="control">
				<input
					class="input name-input"
					type="text"
					placeholder="Text input"
					:value="currentCharacter.name"
				/>
			</div>
		</div>
		<div class="field">
			<label class="label">Origin</label>
			<div class="control">
				<input
					class="input name-input"
					type="text"
					placeholder="Text input"
					:value="currentCharacter.origin"
				/>
			</div>
		</div>

		<label class="label">Character Image Url</label>
		<div class="field has-addons">
			<div class="control">
				<input
					class="input image-url-input"
					type="text"
					placeholder="Text input"
					:value="currentCharacter.imageUrl"
					ref="mainCharacterImageInput"
				/>
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
				:src="
					currentCharacter.imageUrl
						? currentCharacter.imageUrl
						: mainImageUrl
				"
				v-show="mainImageUrl || currentCharacter.imageUrl"
			/>
		</div>
	</form>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop } from "vue-property-decorator";
	import axios from "axios";
	// TS models
	import Character from "@/models/Character";
	// static resources
	import CharactersJson from "@/resources/characters.json";

	@Component({
		components: {}
	})
	export default class Editor extends Vue {
		mainImageUrl: string = "";
		currentCharacter: Character = this.$store.state.currentCharacter;

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
	// .image-url-input {
	// 	width: 100%;
	// }
	// .name-input {
	// 	width: 80%;
	// }
	// .image-submit-button {
	// 	width: 20%;
	// }
	@media screen and (min-width: 1000px) {
		.narrow-center {
			padding-left: 10%;
			padding-right: 10%;
		}
	}
	@media screen and (max-width: 999px) {
		.narrow-center {
			padding-left: 10%;
			padding-right: 10%;
		}
	}
</style>
