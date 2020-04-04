<template>
	<section>
		<b-table detail-key="name" custom-detail-row detailed :hoverable="true" :data="characters" ref="table">
			<template slot-scope="props">
				<b-table-column field="name" label="Name" width="100" sortable>
					{{ props.row.name }}
				</b-table-column>
				<b-table-column field="origin" label="Origin" width="140" sortable>
					{{ props.row.origin }}
				</b-table-column>
				<b-table-column field="imageurl" label="Image URL" width="40">
					{{ props.row.imageUrl }}
				</b-table-column>
				<b-table-column field="imageurl" label="Image" width="40" centered>
					<img :src="props.row.imageUrl" alt="" />
				</b-table-column>
			</template>
			<template slot="detail" slot-scope="props">
				<tr v-for="character in props.row.variants.concat(props.row.partners)" :key="character.name">
					<td></td>
					<td>{{ character.name }}</td>
					<td>{{ props.row.origin }}</td>
					<td>{{ character.imageUrl }}</td>
					<td class="has-text-centered"><img :src="character.imageUrl" alt="" /></td>
				</tr>
			</template>
		</b-table>
	</section>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop } from "vue-property-decorator";
	// Tmodels
	import { Character } from "@/models/Character";

	import buefy from "buefy";

	@Component({
		components: {}
	})
	export default class MoeTable extends Vue {
		@Prop({ required: true, default: [], type: Array })
		characters!: Array<Character>;

		private columnsVisible: Object = {
			name: { title: "Name", display: true },
			sold: { title: "Origin", display: true },
			available: { title: "Image URL", display: true },
			cleared: { title: "Image", display: true }
		};
	}
</script>

<style lang="scss" scoped>
</style>
