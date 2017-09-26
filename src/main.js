// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
// import store from './store'
import './common/stylus/index.styl'
// import vConsole from 'vconsole'
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('./common/image/loading.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
