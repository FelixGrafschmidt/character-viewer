<template>
	<moe-edit-character-element :initial-character="character"></moe-edit-character-element>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";

	import MoeEditCharacterElement from "@/components/editor/MoeEditCharacterElement.vue";
	import { Character } from "@/models/Character";

	@Component({
		components: {
			MoeEditCharacterElement
		}
	})
	export default class MoeEditor extends Vue {
		@Prop({ required: true, type: Object })
		private initialCharacter!: Character;

		private character: Character = this.initialCharacter;
	}
</script>

<style lang="scss" scoped>
</style>
