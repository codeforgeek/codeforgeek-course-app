import Vue from "vue";
import axios from "@/plugins/axios.js";
import VueCodeHighlight from 'vue-code-highlight';
Vue.use(VueCodeHighlight)
Vue.use(axios);
import 'prismjs/themes/prism-twilight.css'

import VuePlyr from 'vue-plyr'
 
// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true }
  },
  emit: ['ended']
})