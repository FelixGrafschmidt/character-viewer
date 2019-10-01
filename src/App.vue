<template>
	<div id="app">
		<moe-navigation
			@index-change="index = $event"
			@toggle-modal="toggleModal($event)"
			:characters="characters"
			:index="index"
		/>
		<moe-import
			:class="{ 'is-active': importIsActive }"
			@toggle-modal="toggleModal($event)"
			@import="readCharactersFromJson(JSON.parse($event))"
		/>
		<moe-export
			:class="{ 'is-active': exportIsActive }"
			@toggle-modal="toggleModal($event)"
		/>
		<router-view
			@index-change="index = $event"
			:characters="characters"
			:index="index"
		></router-view>
	</div>
</template>
<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	import RouterLink from "vue-router";

	// Vue components
	import MoeNavigation from "./components/MoeNavigation.vue";
	import MoeImport from "./components/MoeImport.vue";
	import MoeExport from "./components/MoeExport.vue";

	// 3rdParty
	import {
		Decoder,
		string,
		optional,
		array,
		number,
		object
	} from "@mojotech/json-type-validation";
	// TS models
	import { Character, Variant, Partner } from "./models/Character";

	const variantDecoder: Decoder<Variant> = object({
		name: string(),
		imageUrl: optional(string())
	});
	const partnerDecoder: Decoder<Partner> = object({
		name: string(),
		imageUrl: optional(string())
	});
	const characterDecoder: Decoder<Character> = object({
		name: string(),
		imageUrl: optional(string()),
		partners: optional(array<Variant>(variantDecoder)),
		variants: optional(array<Partner>(partnerDecoder)),
		origin: optional(string())
	});
	const characterListDecoder: Decoder<Array<Character>> = array<Character>(
		characterDecoder
	);

	@Component({
		components: {
			MoeNavigation,
			MoeImport,
			MoeExport
		}
	})
	export default class App extends Vue {
		characters: Array<Character> = new Array<Character>();
		index: number = -1;

		importIsActive: boolean = false;
		exportIsActive: boolean = false;

		private created(): void {
			const incomingCharacters = JSON.parse(
				localStorage.getItem("characters") || "[]"
			);
			this.readCharactersFromJson(incomingCharacters);
		}

		readCharactersFromJson(json: string): void {
			characterListDecoder
				.runPromise(json)
				.then(result => {
					this.characters = result;
					this.importIsActive = false;
				})
				.catch(error => {
					this.characters = new Array<Character>();
					this.importIsActive = false;
				});
		}

		toggleModal(name: string): void {
			switch (name) {
				case "import":
					this.importIsActive = !this.importIsActive;
					break;
				case "export":
					this.exportIsActive = !this.exportIsActive;
					break;
				default:
					break;
			}
		}
	}
</script>
<style lang="scss">
</style>
