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
					<button class="button is-primary" @click="openImport">
						Import characters
					</button>
				</div>
				<div class="navbar-item">
					<button class="button is-primary" @click="openExport">
						Export Characters
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
	@Component({
		components: {}
	})
	export default class MoeNavigation extends Vue {
		@Prop()
		characters!: Array<Character>;
		@Prop()
		index!: number;

		menuVisible: boolean = false;
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
			const jsonToSave: string = JSON.stringify(this.characters);
			localStorage.setItem("characters", jsonToSave);
		}
		openImport(): void {
			this.menuVisible = !this.menuVisible;
			this.$emit("toggle-modal", "import");
		}
		openExport(): void {
			this.menuVisible = !this.menuVisible;
			this.$emit("toggle-modal", "export");
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
