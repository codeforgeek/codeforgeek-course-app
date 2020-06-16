import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

require("./scss/index.scss");
require("./plugins/index.js");  


import VueAnalytics from 'vue-analytics';
Vue.use(VueAnalytics, {
  id: 'UA-46847736-1',
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')