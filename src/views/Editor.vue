<template>
	<form class="narrow-center container">
		<div
			v-if="index >= 0"
			class="container has-text-centered title is-2 padding-top-80"
		>
			Edit character
		</div>
		<div
			v-else
			class="container has-text-centered title is-2 padding-top-80"
		>
			Add a new character
		</div>
		<moe-edit-character-element
			:currentCharacter="currentCharacter"
			:isSubCharacter="false"
			style="width:100vw;"
		/>
	</form>
</template>
<script lang="ts">
	// Vue basics
	import { Character } from "../models/Character";
	import MoeEditCharacterElement from "../components/MoeEditCharacterElement.vue";
	import axios from "axios";
	import { Component, Vue, Prop } from "vue-property-decorator";
	@Component({
		components: {
			MoeEditCharacterElement
		}
	})
	export default class Editor extends Vue {
		@Prop()
		characters!: Array<Character>;
		@Prop()
		index!: number;

		currentCharacter!: Character;

		created(): void {
			if (this.index >= 0) {
				this.currentCharacter = this.characters[this.index];
			} else {
				this.currentCharacter = { name: "", imageUrl: "", origin: "" };
				this.characters.push(this.currentCharacter);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.narrow-center {
		padding-left: 10%;
		padding-right: 10%;
	}

	@media screen and (max-width: 768px) {
		.narrow-center {
			padding-left: 0px;
			padding-right: 0px;
		}
	}

	.padding-top-80 {
		padding-top: 80px;
	}
	.save-button {
		z-index: 100;
		position: fixed;
		top: 10px;
		right: 10px;
	}
	.is-disabled {
		pointer-events: none;
		background: #ff000020;
	}
</style>
