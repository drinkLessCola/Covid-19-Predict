import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import SvgIcon from './components/SvgIcon.vue'
import './assets/main.scss'

import 'virtual:svg-icons-register'
import debounce from './utils/debounce'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('svg-icon', SvgIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app');


(function(win:Window) {
  function refreshRem() {
    const designSize = 1920 // 设计图尺寸
    const fontSize = 18
    const windowWidth = document.documentElement.clientWidth// 窗口宽度
    let rem = windowWidth * fontSize / designSize; 
    document.documentElement.style.fontSize = rem + 'px';
    console.log(document.documentElement.style.fontSize)
  }
 
win.addEventListener('resize', debounce(refreshRem, 500), false);
win.addEventListener('pageshow', debounce(refreshRem, 500), false);

refreshRem();
})(window);

