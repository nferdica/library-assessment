import './assets/main.css'
import "primeicons/primeicons.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import { pt } from 'yup-locale-pt';
import { setLocale } from 'yup';
import ToastService from 'primevue/toastservice';
import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate'

import DataTable from 'primevue/datatable'
import Column    from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button    from 'primevue/button'
import Dialog    from 'primevue/dialog'

setLocale(pt);

window.log = console.log;

const app = createApp(App);

app.use(ToastService);
app.use(PrimeVue, {

    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark'
        }
    }
});

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Dialog', Dialog)

app.component('Form', VeeForm)
app.component('Field', VeeField)
app.component('ErrorMessage', ErrorMessage)

app.use(router);
app.mount('#app');
