<template>
	<header class="p-4 space-y-6 rounded-md">
		<!-- account details -->
		<div class="relative">
			<div class="flex items-center gap-4">
				<img :src="auth.currentUser?.photoURL || ''" alt="user image" width="50" height="50" class="rounded-full" />
				<div>
					<h1 class="font-bold">Account Balance</h1>
					<h2>@{{ auth.currentUser?.displayName }}</h2>
				</div>
			</div>
			<div class="mt-4 font-medium text-sm">
				<p>Email: {{ auth.currentUser?.email }}</p>
				<p>Currency: {{ currency }}</p>
				<p>The number of transactions: {{ numberOfTransactions }}</p>
			</div>
			<v-icon @click="logoutAccount" name="co-account-logout" class="absolute top-0 right-0 hover:text-pink-500 cursor-pointer" />
		</div>
		<!-- account state -->
		<div class="flex items-center gap-6">
			<div class="text-left">
				<p class="text-3xl font-bold">{{ total.toFixed(2) }}</p>
				<p class="text-violet-400">+{{ revenues.toFixed(2) }}</p>
				<p class="text-pink-500">{{ expenses.toFixed(2) }}</p>
			</div>
			<p class="text-4xl font-bold text-white">{{ currency }}</p>
		</div>
		<!-- chart bar -->
		<div class="w-full flex flex-col gap-4">
			<p class="font-medium text-sm">revenues / expenses</p>
			<div class="h-10 bg-violet-700 rounded-md px-4 leading-10" :style="{ width: `${revenuesInPercentage}%` }">+{{ revenuesInPercentage.toFixed(2) }}%</div>
			<div class="h-10 bg-pink-700 rounded-md px-4 leading-10" :style="{ width: `${Math.abs(expensesInPercentage)}%` }">{{ expensesInPercentage.toFixed(2) }}%</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

const { currency, total, expenses, revenues, revenuesInPercentage, expensesInPercentage, numberOfTransactions } = defineProps([
	'transactions',
	'currency',
	'total',
	'expenses',
	'revenues',
	'revenuesInPercentage',
	'expensesInPercentage',
	'numberOfTransactions',
]);

const auth = getAuth();
const router = useRouter();

const logoutAccount = () => {
	auth.signOut();
	router.push('/sign-in');
};

console.log(currency);
</script>
