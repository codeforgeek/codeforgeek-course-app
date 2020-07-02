import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueAnalytics from 'vue-analytics';

require("./scss/index.scss");
require("./plugins/index.js");  

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-46847736-1',
  router,
  autoTracking: {
    pageviewTemplate (route) {
      return {
        page: route.path,
        location: window.location.href
      }
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')