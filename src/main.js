// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Select, Message, Collapse, CollapseItem, } from 'element-ui';

Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.use(Collapse);
Vue.use(CollapseItem);

import less from 'less'
Vue.use(less)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
