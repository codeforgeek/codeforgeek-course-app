import Vue from "vue";
import axios from "@/plugins/axios.js";
import VueCodeHighlight from 'vue-code-highlight';
Vue.use(VueCodeHighlight)
Vue.use(axios);
import 'prismjs/themes/prism-twilight.css'
import 'prism-es6/components/prism-markup-templating';
import 'prism-es6/components/prism-php';
import 'prism-es6/components/prism-git';
import 'prism-es6/components/prism-http';
import 'prism-es6/components/prism-java';
import 'prism-es6/components/prism-json';
import 'prism-es6/components/prism-powershell';
import 'prism-es6/components/prism-pug';
import 'prism-es6/components/prism-python';
import 'prism-es6/components/prism-regex';
import 'prism-es6/components/prism-ruby';
import 'prism-es6/components/prism-sql';
import 'prism-es6/components/prism-typescript';

import VuePlyr from 'vue-plyr'
 
// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true }
  },
  emit: ['ended']
})