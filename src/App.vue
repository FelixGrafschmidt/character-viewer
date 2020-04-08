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
			<moe-navigation-option
				@click.native="saveCharacters"
				slot="end"
				:text="'Save characters'"
			></moe-navigation-option>
			<moe-navigation-option
				@click.native="alertLoadStart"
				slot="end"
				:text="'Load characters'"
			></moe-navigation-option>
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
		<moe-importer
			@import="refreshCharacters($event)"
			@close="openImport = false"
			:active="openImport"
		></moe-importer>
		<moe-editor
			:initial-character="characterToEdit"
			:is-new-character="newCharacter"
			v-if="mode === 'editor'"
			@back-to-list="mode = 'viewer'"
			@save="saveCharacterChanges($event)"
			@save-new="saveNewCharacter($event)"
			@delete="deleteCharacter($event)"
			@discard="discardCharacterChanges($event)"
		/>
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
	import { CharacterForEdit } from "@/models/CharacterForEdit";

	// services
	import { decodeLocalCharacterList } from "@/services/CharacterListDecoderService";
	import { saveCharacters, loadCharacters } from "@/services/AjaxService";

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
						this.refreshCharacters(result);
					})
					.catch(error => {
						this.characters = new Array<Character>();
						console.log(error);
					});
			}
		}

		private mode: string = "viewer";

		private characters: Array<Character> = new Array<Character>();
		private charactersForTable: Array<CharacterForTable> = new Array<CharacterForTable>();

		private currentCharacter: Character = { name: "", variants: [], partners: [] };
		private characterToEdit: Character = { name: "", variants: [], partners: [] };

		private displayMode: String = isMobile ? "carousel" : "table";

		private newCharacter: boolean = false;

		private openExport: boolean = false;
		private openImport: boolean = false;

		private addNewCharacter(): void {
			this.newCharacter = true;
			this.characterToEdit = { name: "", variants: [], partners: [] };
			this.mode = "editor";
		}
		private editThisCharacter(): void {
			this.newCharacter = false;
			this.characterToEdit = {
				name: this.currentCharacter.name,
				origin: this.currentCharacter.origin,
				imageUrl: this.currentCharacter.imageUrl,
				variants: this.currentCharacter.variants,
				partners: this.currentCharacter.partners
			};
			this.mode = "editor";
		}
		private backToCharacterList(): void {
			this.mode = "viewer";
		}
		private deleteCharacter(character: Character): void {
			this.characters.splice(this.characters.indexOf(character), 1);
			this.characterToEdit = { name: "", variants: [], partners: [] };
			localStorage.setItem("characters", JSON.stringify(this.characters));
			this.currentCharacter = this.characters[0];
			this.mode = "viewer";
		}
		private updateCurrentCharacter(index: number): void {
			this.currentCharacter = this.characters[index];
		}
		private changeDisplayMode(): void {
			this.charactersForTable = [];
			if (this.displayMode === "carousel") {
				this.characters.forEach(character => {
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
				this.displayMode = "table";
			} else {
				this.displayMode = "carousel";
			}
		}
		private saveCharacterChanges(character: Character): void {
			this.mode = "viewer";
			this.characters[this.characters.indexOf(this.currentCharacter)] = character;
			this.currentCharacter = character;
			this.characterToEdit = { name: "", variants: [], partners: [] };
			localStorage.setItem("characters", JSON.stringify(this.characters));
		}
		private saveNewCharacter(character: Character): void {
			this.mode = "viewer";
			this.characters.push(character);
			this.characterToEdit = { name: "", variants: [], partners: [] };
			this.currentCharacter = character;
			localStorage.setItem("characters", JSON.stringify(this.characters));
		}

		private discardCharacterChanges(character: Character): void {
			this.mode = "viewer";
			this.characterToEdit = { name: "", variants: [], partners: [] };
		}

		private refreshCharacters(characters: Array<Character>): void {
			this.characters = characters;
			this.characters.forEach(character => {
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
		}
		private saveCharacters(): void {
			const contentStorage = localStorage.getItem("characterListId");
			let savePromise;
			if (contentStorage !== null) {
				savePromise = saveCharacters(this.characters, contentStorage);
			} else {
				savePromise = saveCharacters(this.characters);
			}
			savePromise
				.then(response => {
					localStorage.setItem("characterListId", response.data);
					this.alertSaveSuccess(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		}
		private loadCharacters(id: string): void {
			loadCharacters(id)
				.then(response => {
					this.refreshCharacters(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		}
		private alertSaveSuccess(id: string): void {
			this.$buefy.dialog.alert({
				title: "Success",
				message:
					"<p>Your characters have been saved.</p><p> Please make sure to hold on to this id, you will need it to load your characters in the future: </p><p><strong> " +
					id +
					"</strong></p>",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true
			});
		}
		private alertLoadStart(): void {
			this.$buefy.dialog.prompt({
				title: "Load characters",
				message: "Please enter your list's id.",
				inputAttrs: {
					placeholder: "your id"
				},
				confirmText: "Load",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: value => this.loadCharacters(value)
			});
		}
	}
</script>
<style lang="scss">
	@import "@/styles/styles.scss";
</style>
