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
				<b-table-column
					field="imageurl"
					label="Image"
					width="40"
					@click.native="enlargeImage(props.row.imageUrl)"
				>
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
					<td class="has-text-centered">
						<img @click.native="enlargeImage(character.imageUrl)" :src="character.imageUrl" alt="" />
					</td>
					<td></td>
				</tr>
			</template>
		</b-table>
		<b-modal @close="$emit('close')" :active.sync="modalIsActive" scroll="keep">
			<section class="section modal-section has-text-centered">
				<img class="enlarged-image" :src="imageToEnlarge" alt="enlargedImage" />
			</section>
		</b-modal>
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

		private modalIsActive: boolean = false;

		private imageToEnlarge: string = "";

		private enlargeImage(url: string): void {
			this.imageToEnlarge = url;
			this.modalIsActive = true;
		}
	}
</script>

<style lang="scss" scoped>
	.sub-character-row {
		background-color: #202020;
	}
	/deep/ .modal-background {
		background-color: rgba(8, 8, 8, 0.86) !important;
	}
	.modal-textarea {
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0) !important;
		color: #bebebe;
	}
	.enlarged-image {
		max-height: 85vh;
	}
</style>
