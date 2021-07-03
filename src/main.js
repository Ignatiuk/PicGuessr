import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from '@/plugins/axios'

import BaseButton from '@/components/BaseButton/BaseButton'
import BaseInput from '@/components/BaseInput/BaseInput'
import BaseLoader from '@/components/BaseLoader/BaseLoader'

Vue.component('BaseButton', BaseButton)
Vue.component('BaseInput', BaseInput)
Vue.component('BaseLoader', BaseLoader)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
