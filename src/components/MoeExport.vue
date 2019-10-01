<template>
	<div class="modal">
		<div
			class="modal-background"
			@click="$emit('toggle-modal', 'export')"
		></div>
		<div class="modal-content"></div>
	</div>
</template>
<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";
	@Component({
		components: {}
	})
	export default class MoeExport extends Vue {}
</script>
<style lang="scss" scoped>
</style>
