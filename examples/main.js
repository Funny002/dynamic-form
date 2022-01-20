import Vue from 'vue';
import App from './App.vue';
import ElementUi from 'element-ui';
import DynamicForm from '../index';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/button-group.css';

Vue.use(ElementUi);
Vue.use(DynamicForm);
Vue.config.productionTip = false;

new Vue({render: h => h(App)}).$mount('#app');
