<template>
	<div id="app">
		<carousel :perPage="1">
			<slide v-for="character in characters" :key="character.name">
				<CharacterElement :character="character"></CharacterElement>
			</slide>
		</carousel>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	// Vue components
	import CharacterElement from "./components/CharacterElement.vue";
	// 3rd Party
	import { Carousel, Slide } from "vue-carousel";
	// TS models
	import Character from "./models/Character";
	// import { Character } from "./models/CharacterInterface";
	// static resources
	import CharactersJson from "./resources/characters.json";

	@Component({
		components: {
			CharacterElement,
			Carousel,
			Slide
		},
		created() {}
	})
	export default class App extends Vue {
		private characters: Character[] = CharactersJson;
	}
</script>

<style lang="scss">
</style>
