<template>
	<div id="app">
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
				<div class="navbar-start">
					<router-link class="navbar-item" to="/">
						Viewer
					</router-link>
					<a
						@click="emptyCurrentCharacter"
						class="navbar-item"
						:class="{
							'router-link-exact-active':
								this.$router.currentRoute.path === '/edit'
						}"
					>
						Editor
					</a>
					<router-link class="navbar-item" to="/json">
						View raw json
					</router-link>
				</div>
			</div>
			<div class="navbar-end">
				<div class="navbar-item">
					<button
						class="button is-primary"
						v-show="this.$router.currentRoute.path === '/'"
						@click="editCharacter"
					>
						Edit this character
					</button>
				</div>
			</div>
		</nav>
		<router-view
			@index-change="index = $event"
			:characters="characters"
			:index="index"
		></router-view>
	</div>
</template>
<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	import RouterLink from "vue-router";

	import {
		Decoder,
		string,
		optional,
		array,
		number,
		object
	} from "@mojotech/json-type-validation";
	// TS models
	import { Character, Variant, Partner } from "./models/Character";
	// static resources
	import CharactersJson from "@/resources/characters.json";

	const variantDecoder: Decoder<Variant> = object({
		name: string(),
		imageUrl: optional(string())
	});
	const partnerDecoder: Decoder<Partner> = object({
		name: string(),
		imageUrl: optional(string())
	});
	const characterDecoder: Decoder<Character> = object({
		name: string(),
		imageUrl: optional(string()),
		partners: optional(array<Variant>(variantDecoder)),
		variants: optional(array<Partner>(partnerDecoder)),
		origin: optional(string())
	});
	const characterListDecoder: Decoder<Array<Character>> = array<Character>(
		characterDecoder
	);

	@Component({
		components: {}
	})
	export default class MoeNavigation extends Vue {
		characters: Array<Character> = new Array<Character>();
		index: number = -1;
		private created(): void {
			characterListDecoder
				.runPromise(CharactersJson)
				.then(result => {
					this.characters = result;
				})
				.catch(error => {
					this.characters = new Array<Character>();
				});
		}
		editCharacter(): void {
			this.$router.push("/edit");
		}
		emptyCurrentCharacter(): void {
			this.index = -1;
			this.$router.push("/edit");
		}
	}
</script>
<style lang="scss">
	.moe-navbar {
		position: fixed;
		width: 100%;
	}
	.router-link-exact-active {
		background-color: #00aa91c0;
	}
</style>
