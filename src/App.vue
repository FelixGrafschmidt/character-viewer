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
		<moe-viewer :characters="characters" v-if="mode === 'viewer'" />
		<moe-editor v-if="mode === 'editor'" />
	</div>
</template>
<script lang="ts">
	// Vue basics
	import { Vue, Component } from "vue-property-decorator";
	// Vue components
	import MoeViewer from "@/components/viewer/MoeViewer.vue";
	import MoeNavigation from "@/components/navigation/MoeNavigation.vue";
	import MoeNavigationOption from "@/components/navigation/MoeNavigationOption.vue";

	// models
	import NavigationOption from "@/models/NavigationOption";
	import { Character } from "./legacy/models/Character";

	// services
	import { decodeLocalCharacterList } from "@/services/CharacterListDecoderService";

	@Component({
		components: {
			MoeNavigation,
			MoeNavigationOption,
			MoeViewer
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

		private currentCharacter!: Character;

		private addNewCharacter() {
			this.newCharacter = true;
			this.mode = "editor";
		}
		private editThisCharacter() {
			this.mode = "editor";
		}
		private backToCharacterList() {
			this.newCharacter = false;
			this.mode = "viewer";
		}
		private saveNewCharacter() {
			this.characters.push({ name: "" });
			this.newCharacter = false;
			this.mode = "viewer";
		}
		private saveChangesToCharacter() {
			this.mode = "viewer";
		}
		private deleteThisCharacter() {
			this.mode = "viewer";
		}
	}
</script>
<style lang="scss">
	@import "@/styles/styles.scss";
</style>
