import "@/registerServiceWorker";
import "buefy/dist/buefy.css";

import App from "@/App.vue";
import router from "@/router";
import Buefy from "buefy";
import Vue from "vue";


Vue.config.productionTip = false;

Vue.use(Buefy)

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
