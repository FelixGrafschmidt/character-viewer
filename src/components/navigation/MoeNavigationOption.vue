<template>
	<b-navbar-item>
		{{ text }}
	</b-navbar-item>
</template>

<script lang="ts">
	// Vue basics
	import { Vue, Component, Prop } from "vue-property-decorator";
	@Component({
		components: {}
	})
	export default class App extends Vue {
		@Prop({ required: true, default: "", type: String })
		text!: String;
	}
</script>

<style lang="scss" scoped>
</style>
