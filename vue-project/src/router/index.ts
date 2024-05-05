import { createRouter, createWebHistory } from 'vue-router';
import { ExpenseTrackerView, RegisterView, SignInView, NotFoundView } from '@/views/index';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: RegisterView,
			redirect: {
				name: 'Register',
			},
			children: [],
		},
		{
			path: '/register',
			name: 'Register',
			component: RegisterView,
		},
		{
			path: '/sign-in',
			name: 'Sign In',
			component: SignInView,
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: ExpenseTrackerView,
			meta: {
				requiresAuth: true,
			},
		},
		{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
	],
});

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		);
	});
};

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			alert('You dont have permission to access this page');
			next('/sign-in');
		}
	} else {
		next();
	}
});

export default router;
