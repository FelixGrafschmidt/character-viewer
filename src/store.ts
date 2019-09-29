import Vue from "vue";
import Vuex from "vuex";

import Character from "./models/Character";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentCharacter: Character,
		characterToEdit: Character
	},
	mutations: {

	},
	actions: {

	}
})
