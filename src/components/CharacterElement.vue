<template>
	<div class="container">
		<div class="character-card">
			<h3 class="title is-3">{{ character.name }}</h3>
			<img
				:alt="character.name"
				class="character-image  image"
				:src="character.imageUrl"
			/>
		</div>
		<div class="" v-if="character.partner !== undefined">
			<div class="">May be paired with:</div>
			<h3 class="title is-3">{{ character.partner.name }}</h3>
			<img
				:alt="character.partner.name"
				class="character-image  image"
				:src="character.partner.imageUrl"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import Character from "./../models/Character";

	@Component
	export default class CharacterElement extends Vue {
		@Prop() private character!: Character;
	}
</script>

<style scoped lang="scss">
	.character-card {
		padding-bottom: 50px;
	}
	@media print {
		div {
			page-break-inside: avoid;
		}
	}
</style>
