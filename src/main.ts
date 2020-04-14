import "@/registerServiceWorker";

import router from "@/routing/router";
import Wrapper from "@/Wrapper.vue";
import Buefy from "buefy";
import Vue from "vue";

Vue.config.productionTip = false;

Vue.use(Buefy)

new Vue({
	router,
	render: h => h(Wrapper)
}).$mount("#app");
