<template>
	<div>
		<moe-navigation v-if="mode === 'manager'">
			<moe-navigation-option
				slot="start"
				@click.native="mode = determineViewMode()"
				:text="'Close list manager'"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				:text="'Collection id: ' + collectionId"
				tag="div"
			></moe-navigation-option>
			<moe-navigation-option @click.native="importList" slot="end" :text="'Import list'"></moe-navigation-option>
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
		<moe-navigation v-else-if="mode === 'editor'">
			<moe-navigation-option
				slot="start"
				@click.native="mode = 'manager'"
				:text="'Open list manager'"
			></moe-navigation-option>
		</moe-navigation>
		<moe-navigation v-else-if="mode === 'carousel'">
			<b-navbar-dropdown slot="start" :label="currentList !== undefined ? currentList.name : 'Your lists'">
				<template v-if="collection.length > 0">
					<b-navbar-item @click.native="loadList(list)" v-for="list in collection" :key="list.id">
						{{ (currentList.id === list.id ? "> " : "") + list.name }}
					</b-navbar-item>
				</template>
			</b-navbar-dropdown>
			<moe-navigation-option
				slot="start"
				@click.native="addNewCharacter"
				:text="'Add new character'"
				v-if="currentList !== undefined"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				@click.native="editThisCharacter"
				:text="'Edit this character'"
				v-if="characters.length > 0"
			></moe-navigation-option>
			<moe-navigation-option
				slot="start"
				@click.native="mode = 'manager'"
				:text="'Open list manager'"
			></moe-navigation-option>
			<b-navbar-dropdown slot="end" label="Display mode">
				<b-navbar-item>
					{{ "> Carousel" }}
				</b-navbar-item>
				<b-navbar-item @click.native="mode = 'table'">
					{{ "Table" }}
				</b-navbar-item>
			</b-navbar-dropdown>
		</moe-navigation>
		<moe-navigation v-else-if="mode === 'table'">
			<b-navbar-dropdown slot="start" :label="currentList !== undefined ? currentList.name : 'Your lists'">
				<template v-if="collection.length > 0">
					<b-navbar-item @click.native="loadList(list)" v-for="list in collection" :key="list.id">
						{{ (currentList.id === list.id ? "> " : "") + list.name }}
					</b-navbar-item>
				</template>
			</b-navbar-dropdown>
			<moe-navigation-option
				slot="start"
				@click.native="mode = 'manager'"
				:text="'Open list manager'"
			></moe-navigation-option>
			<b-navbar-dropdown slot="end" label="Display mode">
				<b-navbar-item @click.native="mode = 'carousel'">
					{{ "Carousel" }}
				</b-navbar-item>
				<b-navbar-item>
					{{ "> Table" }}
				</b-navbar-item>
			</b-navbar-dropdown>
		</moe-navigation>
		<moe-viewer
			:start-position="characters.indexOf(currentCharacter)"
			@change-character="updateCurrentCharacter"
			:characters="characters"
			v-if="mode === 'carousel'"
		/>
		<moe-table @changed="saveCharacters" :characters="characters" v-if="mode === 'table'" />
		<moe-exporter @close="openExport = false" :active="openExport" :characters="characters"></moe-exporter>
		<moe-editor
			@changed="saveCharacters"
			@close="mode = 'carousel'"
			:is-new-character="isNewCharacter"
			:character-to-edit="characterToEdit"
			:characters="characters"
			v-if="mode === 'editor'"
		/>
		<moe-list-manager v-if="mode === 'manager'" :collection="collection"> </moe-list-manager>
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
	import MoeListManager from "@/components/manager/MoeListManager.vue";
	// 3rdParty
	import { isMobile } from "mobile-device-detect";
	import { v4 as uuidv4 } from "uuid";
	// models
	import { Character, SubCharacter } from "@/models/Character";
	import { List } from "@/models/List";
	// services
	import { saveCharacters, loadCharacters, saveCollection, loadCollection } from "@/services/AjaxService";
	import { AxiosError } from "axios";

	@Component({
		components: {
			MoeNavigation,
			MoeNavigationOption,
			MoeViewer,
			MoeTable,
			MoeExporter,
			MoeImporter,
			MoeEditor,
			MoeListManager
		}
	})
	export default class App extends Vue {
		private created(): void {
			const collectionIdFromUrl = window.location.pathname.substr(1);
			const collectionIdFromLocalStorage = localStorage.getItem("collectionId");
			if (
				collectionIdFromUrl !== "" &&
				collectionIdFromUrl.match(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/)
			) {
				this.collectionId = collectionIdFromUrl;
			} else {
				if (collectionIdFromLocalStorage !== null) {
					this.collectionId = collectionIdFromLocalStorage;
				}
			}
			if (this.collectionId !== "") {
				this.loadInitialCollection();
			} else {
				this.$buefy.dialog.confirm({
					message: "What do you want to do?",
					confirmText: "Load collection",
					cancelText: "New collection",
					title: "",
					canCancel: ["button"],
					onConfirm: () => {
						this.loadCollection("Please enter the id of the collection you wish to load.");
					},
					onCancel: () => {
						this.newList();
					}
				});
			}
		}

		private mode: string = isMobile ? "carousel" : "table";

		private characters: Array<Character> = new Array<Character>();
		private collection: Array<List> = new Array<List>();

		private currentCharacter: Character = {
			name: "",
			variants: [],
			partners: [],
			detailsOpened: false,
			editing: false
		};

		private characterToEdit: Character = {
			name: "",
			variants: [],
			partners: [],
			detailsOpened: false,
			editing: false
		};

		private isNewCharacter: boolean = false;

		private openExport: boolean = false;
		private openImport: boolean = false;

		private currentList: List = { name: "My list", id: uuidv4(), editing: false };

		private collectionId: string = "";

		private addNewCharacter(): void {
			this.characterToEdit = {
				name: "",
				variants: [],
				partners: [],
				detailsOpened: false,
				editing: false
			};
			this.isNewCharacter = true;
			this.mode = "editor";
		}
		private editThisCharacter(): void {
			this.characterToEdit = this.currentCharacter;
			this.isNewCharacter = false;
			this.mode = "editor";
		}
		private updateCurrentCharacter(index: number): void {
			this.currentCharacter = this.characters[index];
		}
		private importList(): void {
			this.$buefy.dialog.prompt({
				message: "This will overwrite the characters in the current list with the characters you provide.",
				title: "Import list",
				inputAttrs: { placeholder: "list" },
				onConfirm: value => {
					this.refreshCharacters(JSON.parse(value) as Array<Character>);
					this.characters.forEach(character => {
						character.variants = character.variants ? character.variants : [];
						character.partners = character.partners ? character.partners : [];
					});
				}
			});
		}
		private alertLoadStart(message: string = "This will add a new list to your collection."): void {
			this.$buefy.dialog.prompt({
				title: "Load characters",
				message: message,
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
					const newList = { id: id, name: "Imported list", editing: false };
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
				this.saveCharacters();
			} catch (error) {}
		}
		private newList() {
			this.$buefy.dialog.prompt({
				title: "New list",
				message: "Please enter a name for your list.",
				inputAttrs: {
					placeholder: "name"
				},
				confirmText: "Save",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: value => {
					this.currentList = { name: value, id: uuidv4(), editing: false };
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
		private saveCharacters() {
			saveCharacters(this.characters, this.currentList.id)
				.then(response => {
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
			saveCollection(this.collection, this.collectionId).catch(error => {
				console.error(error);
			});
		}
		private loadInitialCollection() {
			loadCollection(this.collectionId)
				.then(response => {
					this.collection = response.data;
					this.currentList = this.collection[0];
					loadCharacters(this.currentList.id)
						.then(response => {
							this.characters = response.data;
							this.currentCharacter = this.characters[0];
						})
						.catch((error: AxiosError) => {
							if (error.code === "404") {
								this.$buefy.dialog.confirm({
									message: "The list could not be found. What do you want to do?",
									title: "List not found",
									confirmText: "Create new list",
									cancelText: "Try a different id",
									canCancel: ["button"],
									onConfirm: () => {
										this.newList();
									},
									onCancel: () => {
										this.alertLoadStart("Enter the id of the list you wish to load.");
									}
								});
							} else {
								this.$buefy.dialog.prompt({
									message:
										"An error occurred while trying to load your collection. Please try again later or try a different collection.",
									title: "Error while loading collection",
									confirmText: "Load collection",
									canCancel: false,
									onConfirm: () => {
										this.loadCollection();
									}
								});
							}
						});
				})
				.catch(() => {
					this.collection = new Array<List>();
					this.$buefy.dialog.confirm({
						message: "What do you want to do?",
						confirmText: "Load collection",
						cancelText: "New collection",
						title: "",
						canCancel: ["button"],
						onConfirm: () => {
							this.loadCollection("Enter the id of the collection you wish to load");
						},
						onCancel: () => {
							this.newList();
						}
					});
				});
		}
		private loadCollection(
			message: string = "This will replace your collection, i.e. your lists with all characters with a new collection. Make sure you have written down your collection's id if you wish to use it in the future."
		) {
			this.$buefy.dialog.prompt({
				message: message,
				title: "Load collection",
				inputAttrs: {
					placeholder: "Collection id"
				},
				confirmText: "Load",
				onConfirm: value => {
					this.collectionId = value;
					loadCollection(this.collectionId)
						.then(response => {
							this.collection = response.data;
							this.currentList = this.collection[0];
							this.loadCharacters(this.currentList.id);
						})
						.catch(() => {
							this.loadCollection("The collection could not be loaded. Please try a different id.");
						});
				}
			});
		}
		private determineViewMode(): string {
			if (isMobile) {
				return "carousel";
			} else {
				return "table";
			}
		}
	}
</script>
<style lang="scss">
	@import "@/styles/styles.scss";
	/deep/ .modal-card-foot > .button {
		font-size: smaller !important;
	}
</style>
