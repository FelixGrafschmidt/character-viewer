<template>
	<div id="app">
		<moe-navigation
			@index-change="index = $event"
			:characters="characters"
			:index="index"
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
			MoeNavigation
		}
	})
	export default class App extends Vue {
		characters: Array<Character> = new Array<Character>();
		index: number = -1;
		private created(): void {
			const incomingCharacters = JSON.parse(
				localStorage.getItem("characters") || "[]"
			);
			characterListDecoder
				.runPromise(incomingCharacters)
				.then(result => {
					this.characters = result;
				})
				.catch(error => {
					this.characters = new Array<Character>();
				});
		}
	}
</script>
<style lang="scss">
</style>
