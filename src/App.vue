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
				@click.native="deleteThisCharacter"
				:text="'Delete this character'"
				v-if="mode === 'editor'"
			></moe-navigation-option>
			<moe-navigation-option
				slot="end"
				:text="'Change display mode'"
				@click.native="changeDisplayMode"
			></moe-navigation-option>
			<moe-navigation-option slot="end" :text="'Save characters'"></moe-navigation-option>
			<moe-navigation-option slot="end" :text="'Load characters'"></moe-navigation-option>
		</moe-navigation>
		<moe-viewer
			:start-position="characters.indexOf(currentCharacter)"
			@change-character="updateCurrentCharacter"
			:characters="characters"
			v-if="mode === 'viewer' && displayMode === 'carousel'"
		/>
		<moe-table :characters="characters" v-if="mode === 'viewer' && displayMode === 'table'" />
		<moe-editor :initial-character="currentCharacter" v-if="mode === 'editor'" />
	</div>
</template>
<script lang="ts">
	// Vue basics
	import { Vue, Component } from "vue-property-decorator";
	// Vue components
	import MoeViewer from "@/components/viewer/MoeViewer.vue";
	import MoeTable from "@/components/viewer/MoeTable.vue";
	import MoeEditor from "@/components/editor/MoeEditor.vue";
	import MoeNavigation from "@/components/navigation/MoeNavigation.vue";
	import MoeNavigationOption from "@/components/navigation/MoeNavigationOption.vue";

	// models
	import { Character, Variant, Partner } from "@/models/Character";

	// services
	import { decodeLocalCharacterList } from "@/services/CharacterListDecoderService";

	@Component({
		components: {
			MoeNavigation,
			MoeNavigationOption,
			MoeViewer,
			MoeTable,
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

		private currentCharacter: Character = { name: "", variants: [], partners: [] };

		private displayMode: String = "carousel";

		private addNewCharacter(): void {
			this.characters.push({ name: "", variants: [], partners: [] });
			this.currentCharacter = this.characters[this.characters.length - 1];
			this.newCharacter = true;
			this.mode = "editor";
		}
		private editThisCharacter(): void {
			this.mode = "editor";
		}
		private backToCharacterList(): void {
			this.mode = "viewer";
		}
		private deleteThisCharacter(): void {
			this.characters.splice(this.characters.indexOf(this.currentCharacter), 1);
			this.mode = "viewer";
		}
		private updateCurrentCharacter(index: number): void {
			this.currentCharacter = this.characters[index];
		}
		private changeDisplayMode(): void {
			if (this.displayMode === "carousel") {
				this.displayMode = "table";
			} else {
				this.displayMode = "carousel";
			}
		}
	}
</script>
<style lang="scss">
	@import "@/styles/styles.scss";
</style>
