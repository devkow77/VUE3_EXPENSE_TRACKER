<template>
	<div class="rleative w-full min-h-[100vh] bg-gradient-to-tl from-pink-950 to-blue-950 p-4 py-8 flex items-center justify-center">
		<main class="relative w-full max-w-4xl p-4 bg-white/10 rounded-lg space-y-6 border-2 border-white/10">
			<Header
				:transactions="transactions"
				:currency="currency"
				:total="total"
				:expenses="expenses"
				:revenues="revenues"
				:revenuesInPercentage="revenuesInPercentage"
				:expensesInPercentage="expensesInPercentage"
				:numberOfTransactions="numberOfTransactions"
			/>
			<AddTransaction :categories="categories" @addTransaction="addTransaction" />
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<FilterTransaction :categories="categories" @sort="sortTransactions" @filter="filterTransactions" @search="searchTransactions" />
				<Balance :transactions="transactions" @deleteTransaction="deleteTransaction" />
			</div>
			<Footer />
		</main>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Header, AddTransaction, FilterTransaction, Balance, Footer } from '@/components/index';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import type { Transaction } from '@/utilities/interface';
import { db } from '@/firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const transactions = ref<Transaction[]>([]);
let copyOfTransactions: Transaction[] = [];
const transactionsCollectionQuery = query(collection(db, 'transactions'), where('authorId', '==', auth.currentUser?.uid));
const transactionsCollection = collection(db, 'transactions');

onMounted(() => {
	onSnapshot(transactionsCollectionQuery, (querySnapshot) => {
		const firebaseTransactions: Transaction[] = [];
		querySnapshot.forEach((doc) => {
			const transaction: Transaction = {
				id: doc.id,
				title: doc.data().title,
				amount: doc.data().amount,
				category: doc.data().category,
				createdAt: doc.data().createdAt,
				authorId: doc.data().authorId,
			};
			firebaseTransactions.push(transaction);
		});
		transactions.value = firebaseTransactions;
		copyOfTransactions = firebaseTransactions;
	});
});

const currency = ref<string>('€');
const categories = ref<string[]>(['Food', 'Shopping', 'Entertainment', 'Travel', 'Health', 'Sports', 'Category From Title', 'Other']);

const total = computed(() => {
	return transactions.value.reduce((acc: number, t: Transaction) => acc + t.amount, 0);
});
const expenses = computed(() => {
	return transactions.value.filter((t: Transaction) => t.amount < 0).reduce((acc: number, t: Transaction) => (acc += t.amount), 0);
});
const revenues = computed(() => {
	return transactions.value.filter((t: Transaction) => t.amount > 0).reduce((acc: number, t: Transaction) => (acc += t.amount), 0);
});
const revenuesInPercentage = computed(() => {
	if (revenues.value === 0) return 0;
	return (revenues.value / (revenues.value + Math.abs(expenses.value))) * 100;
});
const expensesInPercentage = computed(() => {
	if (expenses.value === 0) return 0;
	return (expenses.value / (revenues.value + Math.abs(expenses.value))) * 100;
});
const numberOfTransactions = computed(() => {
	return transactions.value.length;
});

const addTransaction = (newTransaction: Transaction) => {
	let category = newTransaction.category;
	let title = newTransaction.title;

	if (newTransaction.title.includes('#')) {
		const categoryFromTitle = newTransaction.title.split('#')[1];
		title = newTransaction.title.split('#')[0];
		if (categoryFromTitle) {
			const categoryExist = categories.value.find((c) => c === categoryFromTitle);
			if (!categoryExist) categories.value.push(categoryFromTitle);
			category = categoryFromTitle;
		}
	}

	const createdTransaction = {
		title: title,
		amount: newTransaction.amount,
		category: category,
		createdAt: newTransaction.createdAt,
		authorId: newTransaction.authorId,
	};

	addDoc(transactionsCollection, createdTransaction);
};

const deleteTransaction = (id: string) => {
	deleteDoc(doc(transactionsCollection, id));
};

const sortTransactions = (sort: string) => {
	switch (sort) {
		case 'alphabet_asc': {
			transactions.value.sort((a, b) => (a.title < b.title ? -1 : 1));
			break;
		}
		case 'alphabet_desc': {
			transactions.value.sort((a, b) => (a.title < b.title ? 1 : -1));
			break;
		}
		case 'price_asc': {
			transactions.value.sort((a, b) => (a.amount < b.amount ? -1 : 1));
			break;
		}
		case 'price_desc': {
			transactions.value.sort((a, b) => (a.amount < b.amount ? 1 : -1));
			break;
		}
		default: {
			transactions.value.filter((t) => t.category === sort);
			break;
		}
	}
};

const filterTransactions = (filter: string) => {
	transactions.value = copyOfTransactions;
	if (!filter) return;
	transactions.value = transactions.value.filter((t) => t.category === filter);
};

const searchTransactions = (search: string) => {
	transactions.value = copyOfTransactions;
	transactions.value = transactions.value.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
};
</script>
