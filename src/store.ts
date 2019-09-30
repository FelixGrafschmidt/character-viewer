import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentCharacter: "",
		characterToEdit: ""
	},
	mutations: {
		SET_CURRENTCHARACTER(state, currentCharacter) {
			state.currentCharacter = currentCharacter;
		},
		SET_CHARACTERTOEDIT(state, characterToEdit) {
			state.characterToEdit = characterToEdit;
		}

	},
	actions: {
		setCurrentCharacter: ({ commit, state }, newValue) => {
			commit('SET_CURRENTCHARACTER', newValue);
			return state.currentCharacter;
		},
		setCharacterToEdit: ({ commit, state }, newValue) => {
			commit('SET_CHARACTERTOEDIT', newValue);
			return state.characterToEdit;
		}
	},
	getters: {
		currentCharacter: state => state.currentCharacter,
		characterToEdit: state => state.characterToEdit
	}
})
