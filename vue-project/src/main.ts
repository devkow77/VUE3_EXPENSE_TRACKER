import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
	CoAccountLogout,
	MdAccountcircleOutlined,
	FaPaintBrush,
	BiCurrencyExchange,
	MdDeleteforever,
	ViFileTypeVue,
	ViFileTypeTypescriptOfficial,
	ViFileTypeTailwind,
	MdSearchoff,
	FcGoogle,
	IoCloseSharp,
	MdDeleteoutline,
	BiListOl,
} from 'oh-vue-icons/icons';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { app as firebaseAuth } from '@/firebase/index';

addIcons(ViFileTypeVue, ViFileTypeTypescriptOfficial, ViFileTypeTailwind, MdDeleteforever, BiCurrencyExchange, MdAccountcircleOutlined, CoAccountLogout, FaPaintBrush, OhVueIcon, MdSearchoff, FcGoogle, IoCloseSharp, MdDeleteoutline, BiListOl);

const toastOptions = {
	transition: 'Vue-Toastification__bounce',
	maxToasts: 1,
	newestOnTop: true,
	timeout: 2000,
};

const app = createApp(App);
app.use(firebaseAuth as any);
app.use(router);
app.use(Toast, toastOptions);
app.component('v-icon', OhVueIcon);
app.mount('#app');
