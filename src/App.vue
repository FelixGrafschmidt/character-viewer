<template>
	<div>
		<moe-navigation>
			<b-navbar-dropdown slot="start" :label="currentList !== undefined ? currentList.name : 'Your lists'">
				<template v-if="collection.length > 0">
					<b-navbar-item @click.native="loadList(list)" v-for="list in collection" :key="list.id">
						{{ list.name }}
					</b-navbar-item>
					<hr class="navbar-divider" />
				</template>

				<b-navbar-item @click.native="newList()">
					Add new
				</b-navbar-item>
			</b-navbar-dropdown>
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
				v-if="collection.length > 0"
				slot="start"
				:text="'Rename list'"
				@click.native="changeListName"
			></moe-navigation-option>
			<moe-navigation-option
				v-if="collection.length > 0"
				slot="start"
				:text="'Delete list'"
				@click.native="deleteList"
			></moe-navigation-option>
			<moe-navigation-option
				v-if="collection.length > 0"
				slot="start"
				:text="'collection id: ' + collectionId"
				tag="div"
			></moe-navigation-option>
			<moe-navigation-option
				v-if="mode === 'viewer'"
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
				@click.native="importList"
				slot="end"
				:text="'Import characters'"
			></moe-navigation-option>
			<moe-navigation-option
				@click.native="alertLoadStart"
				slot="end"
				:text="'Load list'"
			></moe-navigation-option>
			<moe-navigation-option
				@click.native="loadCollection"
				slot="end"
				:text="'Load collection'"
			></moe-navigation-option>
		</moe-navigation>
		<moe-viewer
			:start-position="characters.indexOf(currentCharacter)"
			@change-character="updateCurrentCharacter"
			:characters="characters"
			v-if="mode === 'viewer' && displayMode === 'carousel'"
		/>
		<moe-table
			@save-changes="saveCharacterChanges"
			@delete-character="deleteCharacter"
			:characters="charactersForTable"
			v-if="mode === 'viewer' && displayMode === 'table'"
		/>
		<moe-exporter @close="openExport = false" :active="openExport" :characters="characters"></moe-exporter>
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

	import { v4 as uuidv4 } from "uuid";

	// models
	import { Character, SubCharacter } from "@/models/Character";
	import { CharacterForTable } from "@/models/CharacterForTable";
	import { List } from "@/models/List";

	// services
	import { saveCharacters, loadCharacters, saveCollection, loadCollection } from "@/services/AjaxService";

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
			const collectionFromLocalStorage = localStorage.getItem("collection");
			const collectionIdFromLocalStorage = localStorage.getItem("collectionId");
			if (collectionIdFromLocalStorage !== null) {
				this.collectionId = collectionIdFromLocalStorage;
			}
			if (collectionFromLocalStorage !== null) {
				this.collection = JSON.parse(collectionFromLocalStorage) as Array<List>;
			} else {
				loadCollection(this.collectionId)
					.then(response => {
						this.collection = response.data;
					})
					.catch(() => {
						this.collection = new Array<List>();
					});
			}
			this.currentList = this.collection[0];
			if (this.currentList !== undefined) {
				loadCharacters(this.currentList.id)
					.then(response => {
						this.characters = response.data;
						this.charactersForTable = [];
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
					})
					.catch(error => {
						console.error(error);
						this.$buefy.dialog.confirm({
							message: "The list could not be found. What do you want to do?",
							title: "List not found",
							confirmText: "Create new list",
							cancelText: "Try a different id",
							onConfirm: () => {
								this.newList();
							},
							onCancel: () => {
								this.alertLoadStart();
							}
						});
					});
			} else {
				this.$buefy.dialog.confirm({
					message: "What do you want to do?",
					confirmText: "Load a collection",
					cancelText: "Create new collection",
					title: "",
					onConfirm: () => {
						this.loadCollection();
					},
					onCancel: () => {
						this.newList();
					}
				});
			}
		}

		private mode: string = "viewer";

		private characters: Array<Character> = new Array<Character>();
		private charactersForTable: Array<CharacterForTable> = new Array<CharacterForTable>();
		private collection: Array<List> = new Array<List>();

		private currentCharacter: Character = { name: "", variants: [], partners: [] };
		private characterToEdit: Character = { name: "", variants: [], partners: [] };

		private displayMode: String = isMobile ? "carousel" : "table";

		private newCharacter: boolean = false;

		private openExport: boolean = false;
		private openImport: boolean = false;

		private currentList: List = { name: "My list", id: uuidv4() };

		private collectionId: string = "";

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
		private deleteCharacter(character: Character): void {
			this.characters.splice(this.characters.indexOf(character), 1);
			this.characterToEdit = { name: "", variants: [], partners: [] };
			this.currentCharacter = this.characters[0];
			this.mode = "viewer";
			this.saveCharacters();
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
			this.saveCharacters();
		}
		private saveNewCharacter(character: Character): void {
			this.mode = "viewer";
			this.characters.push(character);
			this.characterToEdit = { name: "", variants: [], partners: [] };
			this.currentCharacter = character;
			this.charactersForTable = [];
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
			this.saveCharacters();
		}

		private discardCharacterChanges(character: Character): void {
			this.mode = "viewer";
			this.characterToEdit = { name: "", variants: [], partners: [] };
		}

		private importList(): void {
			this.$buefy.dialog.prompt({
				message: "This will overwrite the characters in the current list with the characters you provide.",
				title: "Import list",
				inputAttrs: { placeholder: "list" },
				onConfirm: value => {
					this.refreshCharacters(JSON.parse(value) as Array<Character>);
				}
			});
		}
		private alertLoadStart(): void {
			this.$buefy.dialog.prompt({
				title: "Load characters",
				message: "This will add a new list to your collection.",
				inputAttrs: {
					placeholder: "id"
				},
				confirmText: "Load",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: value => this.loadCharacters(value)
			});
		}
		private loadCharacters(id: string) {
			loadCharacters(id)
				.then(response => {
					this.refreshCharacters(response.data);
					const newList = { id: id, name: "Imported list" };
					this.collection.push(newList);
					this.currentList = newList;
					this.saveCollection();
				})
				.catch(error => {
					console.error(error);
					this.refreshCharacters(new Array<Character>());
				});
		}
		private loadList(list: List) {
			this.currentList = list;
			loadCharacters(list.id)
				.then(response => {
					this.refreshCharacters(response.data);
				})
				.catch(error => {
					console.error(error);
					this.refreshCharacters(new Array<Character>());
				});
		}
		private refreshCharacters(characters: Array<Character>) {
			try {
				const currentCharacter = characters[0];
				this.characters = characters;
				this.currentCharacter = currentCharacter;
				this.charactersForTable = [];
				this.characters.forEach(character => {
					this.charactersForTable.push({
						name: character.name,
						origin: character.origin,
						imageUrl: character.imageUrl,
						variants: character.variants,
						partners: character.partners,
						editing: false,
						detailsOpened: false
					});
				});
				this.saveCharacters();
			} catch (error) {}
		}
		private newList() {
			this.$buefy.dialog.prompt({
				title: "New list",
				message: "Please enter a name.",
				inputAttrs: {
					placeholder: "name"
				},
				confirmText: "Save",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: value => {
					this.currentList = { name: value, id: uuidv4() };
					this.refreshCharacters(new Array<Character>());
					this.collection.push(this.currentList);
					this.saveCollection();
				}
			});
		}
		private changeListName() {
			this.$buefy.dialog.prompt({
				title: "Change list name",
				message: "Please enter a new name.",
				inputAttrs: {
					placeholder: "name",
					value: this.currentList.name
				},
				confirmText: "Save",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: value => {
					this.currentList.name = value;
					this.saveCollection();
				}
			});
		}
		private deleteList() {
			this.$buefy.dialog.confirm({
				title: "Delete list",
				message: "This will permanently delete your list. Are you sure?",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				confirmText: "Delete",
				onConfirm: () => {
					this.collection.splice(this.collection.indexOf(this.currentList), 1);
					localStorage.removeItem(this.currentList.id);
					this.currentList = this.collection[0];
					loadCharacters(this.currentList.id)
						.then(response => {
							this.refreshCharacters(response.data);
						})
						.catch(error => {
							this.refreshCharacters(new Array<Character>());
						});
					this.saveCollection();
				}
			});
		}
		private saveCharacters() {
			saveCharacters(this.characters, this.currentList.id)
				.then(response => {
					console.log(response);
					this.saveCollection();
				})
				.catch(error => {
					console.error(error);
				});
		}
		private saveCollection() {
			if (this.collectionId === "") {
				this.collectionId = uuidv4();
			}
			localStorage.setItem("collection", JSON.stringify(this.collection));
			localStorage.setItem("collectionId", this.collectionId);
			saveCollection(this.collection, this.collectionId)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.error(error);
				});
		}
		private loadCollection() {
			this.$buefy.dialog.prompt({
				message:
					"This will replace your collection, i.e. your lists with all characters with a new collection. Make sure you have written down you collection's id if you wish to use it in the future.",
				title: "load collection",
				inputAttrs: {
					placeholder: "new list id"
				},
				confirmText: "Load",
				onConfirm: value => {
					this.collectionId = value;
					loadCollection(this.collectionId)
						.then(response => {
							this.collection = response.data;
							this.currentList = this.collection[0];
							loadCharacters(this.currentList.id);
						})
						.catch();
				}
			});
		}
	}
</script>
<style lang="scss">
	@import "@/styles/styles.scss";
</style>
