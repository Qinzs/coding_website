import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Avue from '@smallwei/avue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

import '@smallwei/avue/lib/index.css';

createApp(App).use(router).use(ElementPlus).use(Avue).mount('#app')




