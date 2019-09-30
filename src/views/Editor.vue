<template>
	<form class="narrow-center container">
		<div class="navbar-item">
			<button
				class="button is-primary save-button"
				:class="{
					'is-disabled': currentCharacter.name === ''
				}"
				v-show="this.$router.currentRoute.path === '/edit'"
				@click.prevent="saveCharacter"
			>
				Save this character
			</button>
		</div>
		<div class="container has-text-centered title is-2 padding-top-80">
			Add a new character
		</div>
		<moe-edit-character-element
			:currentCharacter="currentCharacter"
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
	export default class Editor extends Vue {
		currentCharacter!: Character;
		created(): void {
			this.currentCharacter = this.$store.getters.currentCharacter;
		}
		saveCharacter(): void {
			const jsonToSave: string = JSON.stringify(this.currentCharacter);

			console.log(jsonToSave);
		}
	}
</script>
<style lang="scss" scoped>
	.narrow-center {
		padding-left: 10%;
		padding-right: 10%;
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
