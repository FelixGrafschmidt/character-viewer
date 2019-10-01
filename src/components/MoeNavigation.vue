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
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div class="navbar-menu">
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
				<button class="button is-primary" @click.prevent="backToList">
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
				<button
					class="button is-primary"
					@click="$emit('toggle-modal', 'import')"
				>
					Import characters
				</button>
			</div>
			<div class="navbar-item">
				<button
					class="button is-primary"
					@click="$emit('toggle-modal', 'export')"
				>
					Export Characters
				</button>
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
		// Viewer options
		editCharacter(): void {
			if (this.index === -1) {
				this.$emit("index-change", 0);
			}
			this.$router.push("/edit");
			this.$forceUpdate();
		}
		addCharacter(): void {
			this.$emit("index-change", -1);
			this.$router.push("/edit");
			this.$forceUpdate();
		}
		// Editor options
		deleteCharacter(): void {
			this.characters.splice(this.index, 1);
			this.$emit("index-change", 0);
			this.$router.push("/");
			this.$forceUpdate();
		}
		backToList(): void {
			this.$router.push("/");
			this.$forceUpdate();
		}
		// Common options
		saveCharacters(): void {
			const jsonToSave: string = JSON.stringify(this.characters);
			localStorage.setItem("characters", jsonToSave);
		}
	}
</script>
<style lang="scss" scoped>
	.moe-navbar {
		position: fixed;
		width: 100%;
	}
</style>
