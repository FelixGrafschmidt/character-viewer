<template>
	<div id="app">
		<div class="section" v-for="origin in origins" :key="origin.name">
			<h2 class="title is-2">{{ origin.name }}</h2>
			<CharacterElement
				v-for="character in origin.characters"
				:key="character.name"
				:character="character"
			></CharacterElement>
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	// Vue components
	import CharacterElement from "./components/CharacterElement.vue";
	// TS models
	import Origin from "./models/Origin";
	// static resources
	import Characters from "./resources/characters.json";

	@Component({
		components: {
			CharacterElement
		},
		created() {}
	})
	export default class App extends Vue {
		private origins: Origin[] = Characters;
	}
</script>

<style lang="scss">
</style>
