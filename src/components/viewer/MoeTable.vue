<template>
	<section>
		<b-table detail-key="name" custom-detail-row detailed :data="characters" ref="table" :show-detail-icon="false">
			<template slot-scope="props">
				<b-table-column field="expand" label="" width="100">
					<a @click="toggle(props.row)"> {{ getTextForCharacter(props.row) }}</a>
				</b-table-column>
				<b-table-column field="name" label="Name" width="700" sortable searchable>
					<input v-if="props.row.editing" class="text-input input" type="text" v-model="props.row.newName" />
					<div v-else>{{ props.row.name }}</div>
				</b-table-column>
				<b-table-column field="origin" label="Origin" width="700" sortable searchable>
					<input
						v-if="props.row.editing"
						class="text-input input"
						type="text"
						v-model="props.row.newOrigin"
					/>
					<div v-else>{{ props.row.origin }}</div>
				</b-table-column>
				<b-table-column
					v-if="props.row.editing"
					field="imageurl"
					label="Image"
					width="200"
					@click.native="enlargeImage(props.row.newImageUrl)"
				>
					<input @click.stop class="input" v-model="props.row.newImageUrl" type="text" />
					<img :alt="props.row.name" :src="props.row.newImageUrl" />
				</b-table-column>
				<b-table-column
					v-else
					field="imageurl"
					label="Image"
					width="200"
					@click.native="enlargeImage(props.row.imageUrl)"
				>
					<img :alt="props.row.name" :src="props.row.imageUrl" />
				</b-table-column>
				<b-table-column field="edit" label="" width="50">
					<a v-if="!props.row.editing" @click="editCharacter(props.row)">Edit</a>
					<div v-else>
						<div><a @click="saveChanges(props.row)">Save changes</a></div>
						<div><a @click="discardChanges(props.row)">Discard changes</a></div>
					</div>
				</b-table-column>
			</template>
			<template slot="detail" slot-scope="props">
				<tr class="sub-character-row" v-for="variant in props.row.variants" :key="variant.name">
					<td>Variant of {{ props.row.name }}</td>
					<td>
						<input v-if="props.row.editing" class="text-input input" type="text" :value="variant.newName" />
						<div v-else>{{ variant.name }}</div>
					</td>
					<td>{{ props.row.origin }}</td>
					<td v-if="props.row.editing">
						<input @click.stop class="input" v-model="variant.newImageUrl" type="text" />
						<img @click="enlargeImage(variant.newImageUrl)" :src="variant.newImageUrl" alt="" />
					</td>
					<td v-else>
						<img @click="enlargeImage(variant.imageUrl)" :src="variant.imageUrl" alt="" />
					</td>
					<td></td>
				</tr>
				<tr v-if="props.row.editing">
					<td>New Variant for {{ props.row.name }}</td>
					<td><input class="text-input input" type="text" v-model="props.row.newVariant.name" /></td>
					<td>{{ props.row.origin }}</td>
					<td>
						<input @click.stop class="input" type="text" v-model="props.row.newVariant.imageUrl" />
						<img
							@click="enlargeImage(props.row.newVariant.imageUrl)"
							:src="props.row.newVariant.imageUrl"
							alt=""
						/>
					</td>
					<td></td>
				</tr>
				<tr class="sub-character-row" v-for="variant in props.row.partners" :key="variant.name">
					<td>Partner of {{ props.row.name }}</td>
					<td>{{ variant.name }}</td>
					<td>{{ props.row.origin }}</td>
					<td>
						<img @click="enlargeImage(variant.imageUrl)" :src="variant.imageUrl" alt="" />
					</td>
					<td></td>
				</tr>
				<tr v-if="props.row.editing">
					<td>New Partner for {{ props.row.name }}</td>
					<td><input class="text-input input" type="text" v-model="props.row.newPartner.name" /></td>
					<td>{{ props.row.origin }}</td>
					<td>
						<input @click.stop class="input" type="text" v-model="props.row.newPartner.imageUrl" />
						<img
							@click="enlargeImage(props.row.newPartner.imageUrl)"
							:src="props.row.newPartner.imageUrl"
							alt=""
						/>
					</td>
					<td></td>
				</tr>
			</template>
		</b-table>
		<b-modal @close="imageToEnlarge = ''" :active.sync="modalIsActive" scroll="keep">
			<section @click="modalIsActive = false" class="section modal-section has-text-centered">
				<img @click.stop class="enlarged-image" :src="imageToEnlarge" alt="enlargedImage" />
			</section>
		</b-modal>
	</section>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop } from "vue-property-decorator";
	// models
	import { Character, Variant } from "@/models/Character";
	import { CharacterForTable } from "../../models/CharacterForTable";

	@Component({
		components: {}
	})
	export default class MoeTable extends Vue {
		@Prop({ required: true, default: [], type: Array })
		characters!: Array<Character>;

		private modalIsActive: boolean = false;

		private imageToEnlarge: string = "";

		private toggle(row: CharacterForTable): void {
			row.detailsOpened = !row.detailsOpened;
			(this.$refs.table as any).toggleDetails(row);
		}
		private enlargeImage(url: string): void {
			this.imageToEnlarge = url;
			this.modalIsActive = true;
		}
		private editCharacter(character: CharacterForTable): void {
			character.editing = true;
			character.newName = character.name;
			character.newOrigin = character.origin;
			character.newImageUrl = character.imageUrl;
			character.newVariant = { name: "", imageUrl: "" };
			character.newPartner = { name: "", imageUrl: "" };
			character.variants.forEach(variant => {
				variant.newName = variant.name;
				variant.newImageUrl = variant.imageUrl;
			});
			character.partners.forEach(partner => {
				partner.newName = partner.name;
				partner.newImageUrl = partner.imageUrl;
			});
		}
		private saveChanges(character: CharacterForTable): void {
			character.editing = false;
			character.name = character.newName ? character.newName : character.name;
			character.origin = character.newOrigin ? character.newOrigin : character.origin;
			character.imageUrl = character.newImageUrl ? character.newImageUrl : character.imageUrl;
			character.variants.forEach(variant => {
				variant.name = variant.newName ? variant.newName : variant.name;
				variant.imageUrl = variant.newImageUrl ? variant.newImageUrl : variant.imageUrl;
			});
			character.partners.forEach(partner => {
				partner.name = partner.newName ? partner.newName : partner.name;
				partner.imageUrl = partner.newImageUrl ? partner.newImageUrl : partner.imageUrl;
			});
			if (character.newVariant !== undefined && character.newVariant.name !== "") {
				character.variants.push(character.newVariant);
			}
			if (character.newPartner !== undefined && character.newPartner.name !== "") {
				character.partners.push(character.newPartner);
			}
			character.newVariant = undefined;
			character.newPartner = undefined;
		}
		private discardChanges(character: CharacterForTable): void {
			character.editing = false;
			character.newName = undefined;
			character.newOrigin = undefined;
			character.newImageUrl = undefined;
			character.newVariant = undefined;
			character.newPartner = undefined;
			character.variants.forEach(variant => {
				variant.newName = undefined;
				variant.newImageUrl = undefined;
			});
			character.partners.forEach(partner => {
				partner.newName = undefined;
				partner.newImageUrl = undefined;
			});
		}
		private getTextForCharacter(character: CharacterForTable): string {
			if (character.detailsOpened) {
				return "Close sub characters";
			} else {
				return "Open sub characters";
			}
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
	.enlarged-image {
		max-height: 85vh;
	}
	.text-input {
		width: fit-content;
	}
</style>
