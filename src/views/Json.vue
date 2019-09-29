<template>
	<pre class="content"><code>{{ charactersJson }}</code></pre>
</template>
<script lang="ts">
	// Vue basics
	import { Component, Vue } from "vue-property-decorator";
	// static resources
	import CharactersJson from "@/resources/characters.json";

	@Component({})
	export default class Json extends Vue {
		charactersJson: any = CharactersJson;
	}
</script>
<style lang="scss" scoped>
	.content {
		padding-top: 80px;
		background-color: black;
		color: white;
	}
</style>
