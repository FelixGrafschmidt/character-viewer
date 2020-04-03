<template>
	<b-navbar>
		<template slot="start">
			<b-navbar-item @click="addCharacter" v-if="$route.name === 'view'">
				Add new Character
			</b-navbar-item>
			<b-navbar-item @click="editCharacter" v-if="$route.name === 'view'">
				Edit this Character
			</b-navbar-item>
			<b-navbar-item @click="deleteCharacter" v-if="$route.name === 'edit'">
				Delete this Character
			</b-navbar-item>
			<b-navbar-item @click="backToList" v-if="$route.name === 'edit'">
				Back to List
			</b-navbar-item>
		</template>

		<template slot="end">
			<b-navbar-item @click="saveCharacters">
				Save Characters
			</b-navbar-item>
			<b-navbar-item @click="openLoad">Load Characters</b-navbar-item>
		</template>
	</b-navbar>
</template>
<script lang="ts">
	// import { Component, Vue, Prop } from "vue-property-decorator";
	// // TS models
	// import { Character, Variant, Partner } from "@/models/Character";
	// import CharacterList from "@/models/CharacterList";

	// import axios from "axios";
	// @Component({
	// 	components: {}
	// })
	// export default class MoeNavigation extends Vue {
	// 	@Prop()
	// 	characters!: Array<Character>;
	// 	@Prop()
	// 	index!: number;

	// 	menuVisible: boolean = false;
	// 	key: number = 0;
	// 	// Viewer options
	// 	editCharacter(): void {
	// 		if (this.index === -1) {
	// 			this.$emit("index-change", 0);
	// 		}
	// 		this.$router.push("/edit");
	// 		this.toggleMenu();
	// 		this.$forceUpdate();
	// 	}
	// 	addCharacter(): void {
	// 		this.$emit("index-change", 0);
	// 		this.$router.push("/edit");
	// 		this.toggleMenu();
	// 		this.$forceUpdate();
	// 	}
	// 	// Editor options
	// 	deleteCharacter(): void {
	// 		this.characters.splice(this.index, 1);
	// 		this.$emit("index-change", 0);
	// 		this.$router.push("/");
	// 		this.toggleMenu();
	// 		this.$forceUpdate();
	// 	}
	// 	backToList(): void {
	// 		this.$router.push("/");
	// 		this.toggleMenu();
	// 		this.$forceUpdate();
	// 		this.characters.forEach(character => {
	// 			if (!character.name) {
	// 				this.characters.splice(this.characters.indexOf(character), 1);
	// 			}
	// 		});
	// 	}
	// 	// Common options
	// 	saveCharacters(): void {
	// 		const objectToSave = {
	// 			characters: this.characters,
	// 			_id: this.key
	// 		};

	// 		const jsonToSave: string = JSON.stringify(objectToSave);

	// 		axios
	// 			.post("http://localhost:8081/saveList", jsonToSave, {
	// 				headers: { "Content-Type": "application/json" }
	// 			})
	// 			.then(result => {
	// 				console.log("success");
	// 			})
	// 			.catch(error => {
	// 				console.log("error");
	// 			});
	// 	}
	// 	openLoad(): void {
	// 		this.menuVisible = !this.menuVisible;
	// 		this.$emit("toggle-modal", "load");
	// 	}
	// 	toggleMenu(): void {
	// 		this.menuVisible = !this.menuVisible;
	// 	}
	// }
</script>
<style lang="scss" scoped>
	.moe-navbar {
		position: fixed;
		width: 100%;
	}
</style>
