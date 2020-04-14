<template>
	<router-view></router-view>
</template>

<script lang="ts">
	import { Component, Vue, Prop, Watch } from "vue-property-decorator";
	@Component
	export default class Wrapper extends Vue {}
</script>
