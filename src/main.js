import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store';

const vm = createApp(App);
vm.use(store);
vm.mount('#app');
