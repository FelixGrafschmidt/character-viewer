<template>
	<div>
		<moe-navigation>
			<moe-navigation-option
				slot="start"
				@click.native="addNewCharacter"
				:text="'Add new character'"
				v-if="mode === 'viewer'"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				@click.native="editThisCharacter"
				:text="'Edit this character'"
				v-if="mode === 'viewer' && characters.length > 0"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				@click.native="backToCharacterList"
				:text="'Back to character list'"
				v-if="mode === 'editor'"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				@click.native="saveNewCharacter"
				:text="'Save new character'"
				v-if="mode === 'editor'"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				@click.native="saveChangesToCharacter"
				:text="'Save changes to this character'"
				v-if="mode === 'editor'"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				@click.native="deleteThisCharacter"
				:text="'Delete this character'"
				v-if="mode === 'editor'"
			></moe-navigation-option>
			<moe-navigation-option slot="end" :text="'Save characters'"></moe-navigation-option>
			<moe-navigation-option slot="end" :text="'Load characters'"></moe-navigation-option>
		</moe-navigation>
		<moe-viewer @change-character="updateCurrentCharacter" :characters="characters" v-if="mode === 'viewer'" />
		<moe-editor :initial-character="currentCharacter" v-if="mode === 'editor'" />
	</div>
</template>
<script lang="ts">
	// Vue basics
	import { Vue, Component } from "vue-property-decorator";
	// Vue components
	import MoeViewer from "@/components/viewer/MoeViewer.vue";
	import MoeEditor from "@/components/editor/MoeEditor.vue";
	import MoeNavigation from "@/components/navigation/MoeNavigation.vue";
	import MoeNavigationOption from "@/components/navigation/MoeNavigationOption.vue";

	// models
	import { Character } from "@/models/Character";

	// services
	import { decodeLocalCharacterList } from "@/services/CharacterListDecoderService";

	@Component({
		components: {
			MoeNavigation,
			MoeNavigationOption,
			MoeViewer,
			MoeEditor
		}
	})
	export default class App extends Vue {
		private created(): void {
			const storageContent = localStorage.getItem("characters");
			if (storageContent !== null) {
				const rawList = JSON.parse(storageContent);
				decodeLocalCharacterList(rawList)
					.then(result => {
						this.characters = result;
						this.currentCharacter = this.characters[0];
					})
					.catch(error => {
						this.characters = new Array<Character>();
						console.log(error);
					});
			}
		}

		private mode: string = "viewer";

		private newCharacter: boolean = false;

		private characters: Array<Character> = new Array<Character>();

		private currentCharacter: Character = { name: "" };

		private addNewCharacter(): void {
			this.newCharacter = true;
			this.mode = "editor";
		}
		private editThisCharacter(): void {
			this.mode = "editor";
		}
		private backToCharacterList(): void {
			this.newCharacter = false;
			this.mode = "viewer";
		}
		private saveNewCharacter(): void {
			this.characters.push({ name: "" });
			this.newCharacter = false;
			this.mode = "viewer";
		}
		private saveChangesToCharacter(): void {
			this.mode = "viewer";
		}
		private deleteThisCharacter(): void {
			this.mode = "viewer";
		}
		private updateCurrentCharacter(index: number): void {
			this.currentCharacter = this.characters[index];
		}
	}
</script>
<style lang="scss">
	@import "@/styles/styles.scss";
</style>
