<template>
	<div>
		<div class="columns section wrapper">
			<b-table class="column is-half is-offset-3" ref="table" :data="collection">
				<template slot-scope="props">
					<b-table-column field="id" label="ID" width="150">
						<div class="text-column">
							{{ props.row.id }}
						</div>
					</b-table-column>
					<b-table-column field="name" label="Name" width="300">
						<b-field>
							<b-input
								placeholder="List name"
								:value="props.row.name"
								type="text"
								icon-right="content-save"
								icon-right-clickable
								@icon-right-click="rename(props.row, $event)"
							>
							</b-input>
						</b-field>
					</b-table-column>
					<b-table-column width="20">
						<b-button @click="deleteList(props.row)" size="medium" icon-left="delete" type="is-text">
						</b-button>
					</b-table-column>
				</template>
			</b-table>
		</div>
		<div class="columns">
			<b-button
				class="column is-half is-offset-3"
				expanded
				@click="addNewList"
				size="is-large"
				icon-left="plus-circle-outline"
				type="is-text"
			>
			</b-button>
		</div>
	</div>
</template>

<script lang="ts">
	// Vue basics
	import { Component, Vue, Prop, Watch } from "vue-property-decorator";
	import { List } from "../../models/List";
	import { v4 as uuidv4 } from "uuid";
	@Component({
		components: {}
	})
	export default class MoeListManager extends Vue {
		@Prop({ required: true })
		collection!: Array<List>;

		private rename(list: List, event: MouseEvent): void {
			list.name = ((event.target as HTMLElement).parentElement!.previousElementSibling as HTMLInputElement).value;
			this.$buefy.toast.open({ message: "Name saved!", type: "is-link" });
		}
		private deleteList(list: List) {
			this.$buefy.dialog.confirm({
				title: "Delete list",
				message: "This will permanently delete your list. Are you sure?",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				confirmText: "Delete",
				onConfirm: () => {
					this.collection.splice(this.collection.indexOf(list), 1);
				}
			});
		}
		private addNewList() {
			this.$buefy.dialog.prompt({
				title: "New list",
				message: "Please enter a name for your list.",
				inputAttrs: {
					placeholder: "name"
				},
				confirmText: "Save",
				type: "is-link",
				ariaRole: "alertdialog",
				ariaModal: true,
				trapFocus: true,
				onConfirm: value => {
					this.collection.push({ id: uuidv4(), name: value, editing: false });
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.mdi {
		color: #00ffff;
	}
	.text-column {
		padding-top: 0.4rem;
	}
	.wrapper {
		padding-bottom: unset;
	}
</style>
