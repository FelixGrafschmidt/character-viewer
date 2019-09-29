<template>
	<div id="app">
		<nav class="navbar" role="navigation" aria-label="main navigation">
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
					<router-link class="navbar-item" to="/edit">
						Editor
					</router-link>
				</div>
			</div>
			<div class="navbar-end">
				<div class="navbar-item">
					<button
						class="button is-primary"
						v-show="
							this.$router.currentRoute.path === '/' &&
								this.$store.state.currentCharacter !== undefined
						"
						@click="editCharacter"
					>
						Edit this character
					</button>
				</div>
			</div>
		</nav>
		<router-view></router-view>
	</div>
</template>
<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	import RouterLink from "vue-router";

	@Component({
		components: {},
		created() {}
	})
	export default class MoeNavigation extends Vue {
		editCharacter(): void {
			this.$router.push("/edit");
		}
	}
</script>
<style lang="scss">
	$text: white;
</style>
