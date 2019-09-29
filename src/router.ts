import Editor from "@/views/Editor/Editor.vue";
import Json from "@/views/Json.vue";
import Viewer from "@/views/Viewer.vue";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'view',
			component: Viewer
		},
		{
			path: '/json',
			name: 'json',
			component: Json
		},
		{
			path: '/edit',
			name: 'edit',
			component: Editor
		}
	]
})
