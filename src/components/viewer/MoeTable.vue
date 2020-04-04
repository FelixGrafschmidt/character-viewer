<template>
	<section>
		<b-table detail-key="name" custom-detail-row detailed :data="characters" ref="table">
			<template slot-scope="props">
				<b-table-column field="name" label="Name" width="700" sortable searchable>
					{{ props.row.name }}
				</b-table-column>
				<b-table-column field="origin" label="Origin" width="700" sortable searchable>
					{{ props.row.origin }}
				</b-table-column>
				<b-table-column field="imageurl" label="Image" width="40">
					<img :alt="props.row.name" :src="props.row.imageUrl" />
				</b-table-column>
				<b-table-column field="edit" label="" width="40">
					<a @click="$emit('edit-character', props.row)">Edit</a>
				</b-table-column>
			</template>
			<template slot="detail" slot-scope="props">
				<tr
					class="sub-character-row"
					v-for="character in props.row.variants.concat(props.row.partners)"
					:key="character.name"
				>
					<td></td>
					<td>{{ character.name }}</td>
					<td>{{ props.row.origin }}</td>
					<td class="has-text-centered"><img :src="character.imageUrl" alt="" /></td>
					<td></td>
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
	}
</script>

<style lang="scss" scoped>
	.sub-character-row {
		background-color: #202020;
	}
</style>
