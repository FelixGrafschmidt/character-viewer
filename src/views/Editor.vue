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
			<div class="control image-url-input">
				<input
					class="input"
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
			<div v-show="imageErrorMessage" class="has-text-danger">
				Error! Could not load image!
				<div>{{ imageErrorMessage }}</div>
			</div>
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
		<div class="columns">
			<div class="column">
				Variants?
				<div class="field">
					<input
						id="switchRoundedDefault"
						type="checkbox"
						name="switchRoundedDefault"
						class="switch is-rounded"
						checked="checked"
					/>
					<label for="switchRoundedDefault"
						>Does this character have variants?</label
					>
				</div>
			</div>
			<div class="column">
				Partners?
				<div class="field">
					<input
						id="switchRoundedDefault"
						type="checkbox"
						name="switchRoundedDefault"
						class="switch is-rounded"
						checked="checked"
					/>
					<label for="switchRoundedDefault"
						>Does this character have partners?</label
					>
				</div>
			</div>
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
		imageErrorMessage: string = "";

		loadMainCharacterImage(): void {
			const element: HTMLFormElement = this.$refs
				.mainCharacterImageInput as HTMLFormElement;
			const url: string = element.value;
			axios
				.get(url)
				.then(response => {
					if (response.status === 200) {
						this.imageErrorMessage = "";
						this.mainImageUrl = url;
					}
				})
				.catch(error => {
					this.imageErrorMessage = error.message;
				});
		}
	}
</script>

<style lang="scss">
	.narrow-center {
		padding-left: 10%;
		padding-right: 10%;
	}
	.image-url-input {
		width: 100%;
	}
</style>
