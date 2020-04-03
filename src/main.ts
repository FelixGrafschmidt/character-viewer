import "@/legacy/registerServiceWorker";

import App from "@/App.vue";
import Buefy from "buefy";
import Vue from "vue";


Vue.config.productionTip = false;

Vue.use(Buefy)

new Vue({
	render: h => h(App)
}).$mount("#app");
