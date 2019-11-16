<template>
	<div id="app">
		<moe-navigation
			@index-change="index = $event"
			@toggle-modal="toggleModal($event)"
			:characters="characters"
			:index="index"
		/>
		<moe-load
			v-if="loadIsActive"
			:class="{ 'is-active': loadIsActive }"
			@toggle-modal="toggleModal($event)"
			@load="loadCharacters(JSON.parse($event))"
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
	import MoeLoad from "./components/MoeLoad.vue";
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
	import axios, { AxiosPromise } from "axios";
	// TS models
	import { Character, Variant, Partner } from "./models/Character";
	import CharacterList from "./models/CharacterList";
	import Axios from "axios";

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
	const characterListDecoder: Decoder<CharacterList> = object({
		_id: number(),
		characters: array<Character>(characterDecoder)
	});

	@Component({
		components: {
			MoeNavigation,
			MoeLoad
		}
	})
	export default class App extends Vue {
		characters: Array<Character> = new Array<Character>();
		index: number = -1;

		loadIsActive: boolean = false;

		loadCharacters(key: number): void {
			let rawList = {
				characters: new Array<Character>(),
				_id: 0
			};
			this.getRawList(key)
				.then(result => {
					rawList = result.data;
					console.log(rawList);
					console.log("success");
					characterListDecoder
						.runPromise(rawList)
						.then(result => {
							this.characters = result.characters;
							this.loadIsActive = false;
							this.index = 0;
						})
						.catch(error => {
							this.characters = new Array<Character>();
							this.loadIsActive = false;
							console.log(error);
						});
				})
				.catch(error => {
					console.log(error);
				});
		}

		toggleModal(name: string): void {
			switch (name) {
				case "load":
					this.loadIsActive = !this.loadIsActive;
					break;
				default:
					break;
			}
		}

		getRawList(key: number): AxiosPromise {
			return axios.get("/getList", {
				params: {
					id: key
				}
			});
		}
	}
</script>
<style lang="scss">
</style>
