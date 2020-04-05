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
				v-if="mode === 'viewer' && displayMode === 'carousel' && characters.length > 0"
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
			<moe-navigation-option
				@click.native="openExport = true"
				slot="end"
				:text="'Export characters'"
			></moe-navigation-option>
			<moe-navigation-option
				@click.native="openImport = true"
				slot="end"
				:text="'Import characters'"
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
		<moe-table
			@edit-character="
				currentCharacter = $event;
				mode = 'editor';
			"
			:characters="charactersForTable"
			v-if="mode === 'viewer' && displayMode === 'table'"
		/>
		<moe-exporter @close="openExport = false" :active="openExport" :characters="characters"></moe-exporter>
		<moe-importer @import="characters = $event" @close="openImport = false" :active="openImport"></moe-importer>
		<moe-editor :initial-character="currentCharacter" v-if="mode === 'editor'" />
	</div>
</template>
<script lang="ts">
	// Vue basics
	import { Vue, Component } from "vue-property-decorator";
	// Vue components
	import MoeViewer from "@/components/viewer/MoeViewer.vue";
	import MoeTable from "@/components/viewer/MoeTable.vue";
	import MoeExporter from "@/components/import_export/MoeExporter.vue";
	import MoeImporter from "@/components/import_export/MoeImporter.vue";
	import MoeEditor from "@/components/editor/MoeEditor.vue";
	import MoeNavigation from "@/components/navigation/MoeNavigation.vue";
	import MoeNavigationOption from "@/components/navigation/MoeNavigationOption.vue";
	import { isMobile } from "mobile-device-detect";

	// models
	import { Character, Variant, Partner } from "@/models/Character";
	import { CharacterForTable } from "@/models/CharacterForTable";

	// services
	import { decodeLocalCharacterList } from "@/services/CharacterListDecoderService";

	@Component({
		components: {
			MoeNavigation,
			MoeNavigationOption,
			MoeViewer,
			MoeTable,
			MoeExporter,
			MoeImporter,
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
						result.forEach(character => {
							this.charactersForTable.push({
								name: character.name,
								origin: character.origin,
								imageUrl: character.imageUrl,
								variants: character.variants,
								partners: character.partners,
								detailsOpened: false,
								editing: false
							});
						});
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
		private charactersForTable: Array<CharacterForTable> = new Array<CharacterForTable>();

		private currentCharacter: Character = { name: "", variants: [], partners: [] };

		private displayMode: String = isMobile ? "carousel" : "table";

		private openExport: boolean = false;
		private openImport: boolean = false;

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
