import Editor from "@/views/Editor.vue";
import Json from "@/views/Json.vue";
import Viewer from "@/views/Viewer.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const router = new VueRouter({
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


export default router;
