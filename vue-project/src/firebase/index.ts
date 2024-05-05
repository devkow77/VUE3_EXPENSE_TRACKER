import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAxhAg5Y1_UPiz0afy6Qn55gVN27-86zr4',
	authDomain: 'expense-tracker-vue3.firebaseapp.com',
	projectId: 'expense-tracker-vue3',
	storageBucket: 'expense-tracker-vue3.appspot.com',
	messagingSenderId: '983709308914',
	appId: '1:983709308914:web:f72f30ca33a4203c5cfd6b',
	measurementId: 'G-LMBZGJ60KT',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
