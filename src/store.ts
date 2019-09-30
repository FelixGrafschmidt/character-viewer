import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentCharacter: ""
	},
	mutations: {
		SET_CURRENTCHARACTER(state, currentCharacter) {
			state.currentCharacter = currentCharacter;
		},

	},
	actions: {
		setCurrentCharacter: ({ commit, state }, newValue) => {
			commit('SET_CURRENTCHARACTER', newValue);
			return state.currentCharacter;
		}
	},
	getters: {
		currentCharacter: state => state.currentCharacter
	}
})
