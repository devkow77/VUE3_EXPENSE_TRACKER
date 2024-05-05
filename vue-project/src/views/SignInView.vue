<template>
	<div class="w-full h-[100vh] bg-gradient-to-tl from-pink-950 to-blue-950 flex items-center justify-center">
		<section class="w-full max-w-sm px-6">
			<h1 class="text-xl font-bold text-center">Log in to your account</h1>
			<div class="my-4 space-y-2">
				<p><input type="text" placeholder="Email" v-model="email" class="w-full px-4 py-2 bg-white/10" /></p>
				<p><input type="password" placeholder="Password" v-model="password" class="w-full px-4 py-2 bg-white/10" /></p>
				<p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
			</div>
			<div>
				<button @click="signIn" class="w-full py-2 font-medium bg-green-600 hover:bg-green-400 duration-200">Sign In</button>
				<button @click="signInWithGoogle" class="w-full py-2 font-medium bg-white/10 hover:bg-white/30 duration-200">Sign In By <v-icon name="fc-google" /></button>
			</div>
			<div class="my-4 space-y-2">
				<p class="font-semibold text-center">or</p>
				<RouterLink to="/register" class="w-full py-2 font-medium bg-pink-600 hover:bg-pink-400 duration-200 block text-center rounded-2xl">Don't have account</RouterLink>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const router = useRouter();

const signIn = () => {
	signInWithEmailAndPassword(getAuth(), email.value, password.value)
		.then(() => {
			console.log('successfully signed in!');
			router.push('/dashboard');
		})
		.catch((error) => {
			console.log(error.code);
			switch (error.code) {
				case 'auth/invalid-email': {
					errorMsg.value = 'Invalid email';
					break;
				}
				case 'auth/user-not-found': {
					errorMsg.value = 'No account with that email was found';
					break;
				}
				case 'auth/wrong-password': {
					errorMsg.value = 'Incorrect password';
					break;
				}
				default: {
					errorMsg.value = 'Email or password was incorrect';
					break;
				}
			}
		});
};

const signInWithGoogle = () => {
	let auth = getAuth();

	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			console.log(result.user);
			router.push('/dashboard');
		})
		.catch((error) => {
			console.log(error.code);
		});
};
</script>
