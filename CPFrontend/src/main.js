import './assets/tailwind.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import primeVue from "primevue/config";
import aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(primeVue, {
    theme : {
        preset : aura
    }
})


app.mount('#app')
