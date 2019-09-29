// Vue basics
import Character from "@/models/Character";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

// TS models
// static resources
@Component({
	components: {}
})
export default class Editor extends Vue {
	currentCharacter: Character = this.$store.state.characterToEdit;
	mainImageUrl: string = "";
	variantImageUrl: Array<string> = new Array<string>();
	partnerImageUrl: Array<string> = new Array<string>();
	mainImageErrorMessage: string = "";
	variantImageErrorMessage: Array<string> = new Array<string>();
	partnerImageErrorMessage: Array<string> = new Array<string>();
	variantsVisible: boolean = true;
	partnersVisible: boolean = true;

	loadMainCharacterImage(): void {
		const element: HTMLFormElement = this.$refs
			.mainCharacterImageInput as HTMLFormElement;
		const url: string = element.value;
		axios
			.get(url)
			.then(response => {
				if (response.status === 200) {
					this.mainImageErrorMessage = "";
					this.mainImageUrl = url;
				}
			})
			.catch(error => {
				this.mainImageErrorMessage = error.message;
			});
	}
	loadVariantImage(index: number): void {
		const elements: Array<HTMLFormElement> = this.$refs
			.variantImageInput as Array<HTMLFormElement>;
		const url: string = elements[index].value;

		axios
			.get(url)
			.then(response => {
				if (response.status === 200) {
					this.variantImageErrorMessage[index] = "";
					this.variantImageUrl[index] = url;
					this.$forceUpdate();
				}
			})
			.catch(error => {
				this.variantImageErrorMessage[index] = error.message;
				this.$forceUpdate();
			});
	}
	loadPartnerImage(index: number): void {
		const elements: Array<HTMLFormElement> = this.$refs
			.partnerImageInput as Array<HTMLFormElement>;
		const url: string = elements[index].value;
		axios
			.get(url)
			.then(response => {
				if (response.status === 200) {
					this.variantImageErrorMessage[index] = "";
					this.variantImageUrl[index] = url;
					this.$forceUpdate();
				}
			})
			.catch(error => {
				this.variantImageErrorMessage[index] = error.message;
				this.$forceUpdate();
			});
	}
	showVariants(event: MouseEvent): void {
		const target = event.target as HTMLInputElement;
		this.variantsVisible = target.checked;
	}
	showPartners(event: MouseEvent): void {
		const target = event.target as HTMLInputElement;
		this.partnersVisible = target.checked;
	}
}
