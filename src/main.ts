import "@/registerServiceWorker";
import "@/styles/styles.scss";

import App from "@/App.vue";
import router from "@/router";
import Vue from "vue";

import store from "./store";


Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
