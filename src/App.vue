<template>
	<div id="app">
		<carousel :perPage="1">
			<slide v-for="character in characters" :key="character.name">
				<CharacterElement :character="character"></CharacterElement>
			</slide>
		</carousel>
		<!-- <div class="section" v-for="origin in origins" :key="origin.name">
			<h2 class="title is-2">{{ origin.name }}</h2>
			<CharacterElement
				v-for="character in origin.characters"
				:key="character.name"
				:character="character"
			></CharacterElement>
		</div> -->
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
	// static resources
	import Characters from "./resources/characters.json";

	@Component({
		components: {
			CharacterElement,
			Carousel,
			Slide
		},
		created() {}
	})
	export default class App extends Vue {
		private characters: Character[] = Characters;
	}
</script>

<style lang="scss">
</style>
