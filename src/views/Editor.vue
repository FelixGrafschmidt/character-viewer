<template>
	<form class="narrow-center container">
		<div class="container has-text-centered title is-2 padding-top-80">
			Add a new character
		</div>
		<moe-edit-character-element
			:currentCharacter="this.$store.getters.currentCharacter"
			:isSubCharacter="false"
		/>
	</form>
</template>
<script lang="ts">
	// Vue basics
	import { Character } from "../models/Character";
	import MoeEditCharacterElement from "../components/MoeEditCharacterElement.vue";
	import axios from "axios";
	import { Component, Vue } from "vue-property-decorator";
	@Component({
		components: {
			MoeEditCharacterElement
		}
	})
	export default class Editor extends Vue {}
</script>
<style lang="scss" scoped>
	.narrow-center {
		padding-left: 10%;
		padding-right: 10%;
	}

	.padding-top-80 {
		padding-top: 80px;
	}
</style>
