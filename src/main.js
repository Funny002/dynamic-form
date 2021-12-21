import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import DynamicForm from "./components/DynamicForm";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(DynamicForm)
Vue.use(ElementUi, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

new Vue({render: h => h(App)}).$mount('#app')
