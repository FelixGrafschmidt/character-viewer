<template>
	<nav
		class="navbar moe-navbar"
		role="navigation"
		aria-label="main navigation"
	>
		<div class="navbar-brand">
			<a
				role="button"
				class="navbar-burger burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample"
				@click="toggleMenu"
				:class="{ 'is-active': menuVisible }"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div class="navbar-menu" :class="{ 'is-active': menuVisible }">
			<div class="navbar-start">
				<div
					v-if="this.$router.currentRoute.path === '/'"
					class="navbar-item"
				>
					<button
						class="button is-primary"
						v-if="this.$router.currentRoute.path === '/'"
						@click="addCharacter"
					>
						Add new character
					</button>
				</div>
				<div
					v-if="this.$router.currentRoute.path === '/'"
					class="navbar-item"
				>
					<button class="button is-primary" @click="editCharacter">
						Edit this character
					</button>
				</div>
				<div
					v-if="this.$router.currentRoute.path === '/edit'"
					class="navbar-item"
				>
					<button
						class="button is-primary"
						@click.prevent="deleteCharacter"
					>
						Delete this character
					</button>
				</div>
				<div
					v-if="this.$router.currentRoute.path === '/edit'"
					class="navbar-item"
				>
					<button
						class="button is-primary"
						@click.prevent="backToList"
					>
						Back to Character List
					</button>
				</div>
			</div>
			<div class="navbar-end">
				<div class="navbar-item">
					<button
						class="button is-primary"
						@click.prevent="saveCharacters"
					>
						Save characters
					</button>
				</div>
				<div class="navbar-item">
					<button class="button is-primary" @click="openLoad">
						Load characters
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>
<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";
	// TS models
	import { Character, Variant, Partner } from "../models/Character";
	import CharacterList from "../models/CharacterList";

	import axios from "axios";
	@Component({
		components: {}
	})
	export default class MoeNavigation extends Vue {
		@Prop()
		characters!: Array<Character>;
		@Prop()
		index!: number;

		menuVisible: boolean = false;
		key: number = 0;
		// Viewer options
		editCharacter(): void {
			if (this.index === -1) {
				this.$emit("index-change", 0);
			}
			this.$router.push("/edit");
			this.toggleMenu();
			this.$forceUpdate();
		}
		addCharacter(): void {
			this.$emit("index-change", -1);
			this.$router.push("/edit");
			this.toggleMenu();
			this.$forceUpdate();
		}
		// Editor options
		deleteCharacter(): void {
			this.characters.splice(this.index, 1);
			this.$emit("index-change", 0);
			this.$router.push("/");
			this.toggleMenu();
			this.$forceUpdate();
		}
		backToList(): void {
			this.$router.push("/");
			this.toggleMenu();
			this.$forceUpdate();
		}
		// Common options
		saveCharacters(): void {
			const objectToSave = {
				characters: this.characters,
				_id: this.key
			};

			const jsonToSave: string = JSON.stringify(objectToSave);

			axios
				.post("/saveList", jsonToSave, {
					headers: { "Content-Type": "application/json" }
				})
				.then(result => {
					console.log("success");
				})
				.catch(error => {
					console.log("error");
				});
		}
		openLoad(): void {
			this.menuVisible = !this.menuVisible;
			this.$emit("toggle-modal", "load");
		}
		toggleMenu(): void {
			this.menuVisible = !this.menuVisible;
		}
	}
</script>
<style lang="scss" scoped>
	.moe-navbar {
		position: fixed;
		width: 100%;
	}
</style>
