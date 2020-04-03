<template>
	<div class="modal">
		<div
			class="modal-background"
			@click="$emit('toggle-modal', 'load')"
		></div>
		<div class="modal-content">
			<div class="section modal-load has-text-centered">
				<div>
					Insert your key
					<input
						type="text"
						name="load"
						id="load"
						@change="key = $event.target.value"
					/>
				</div>
				<button class="button is-primary" @click="$emit('load', key)">
					Load
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";
	@Component({
		components: {}
	})
	export default class MoeLoad extends Vue {
		key: number = 0;

		loadList(): void {}
	}
</script>
<style lang="scss" scoped>
	.modal-load {
		background-color: black;
	}
</style>
