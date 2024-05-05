<template>
	<section class="p-4 rounded-md">
		<h2 class="font-bold">Transaction Creator</h2>
		<form class="mt-4 space-y-4 text-sm">
			<div>
				<label for="name">Name*</label><br />
				<input v-model="title" v-bind="titleAttrs" type="text" placeholder="Title or Title#NewCategory" class="w-full px-4 py-2 bg-black/10 rounded-md" />
				<span class="block mt-2 ml-1 text-pink-600">{{ errors.title }}</span>
			</div>
			<div>
				<label for="amount">Amount*</label><br />
				<input v-model="amount" v-bind="amountAttrs" type="number" placeholder="E.G 300 or -300" class="w-full px-4 py-2 bg-black/10 rounded-md" />
				<span class="block mt-2 ml-1 text-pink-600">{{ errors.amount }}</span>
			</div>
			<div>
				<label for="category">Category*</label><br />
				<select v-model="category" v-bind="categoryAttrs" name="category" class="w-full px-4 py-2 bg-black/10 rounded-md">
					<option value="" class="bg-violet-600">Choose a category</option>
					<option v-for="c in categories" :value="c" class="bg-pink-600">{{ c }}</option>
				</select>
				<span class="block mt-2 ml-1 text-pink-600">{{ errors.category }}</span>
			</div>
			<div class="flex items-center gap-2">
				<button @click.prevent="onSubmit" class="w-full p-2 bg-pink-600 hover:bg-pink-400 rounded-md duration-200">Create</button>
				<button type="reset" class="w-full p-2 bg-violet-600 hover:bg-violet-400 rounded-md duration-200">Reset</button>
			</div>
		</form>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuth } from 'firebase/auth';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const auth = getAuth();
const { categories } = defineProps(['categories']);
const emit = defineEmits(['addTransaction']);

const schema = yup.object({
	title: yup.string().min(3, 'Title must be at least 3 characters').max(20, 'Title must be at most 20 characters').required('Title is required!'),
	amount: yup.number().required('Amount is required!'),
	category: yup.string().required(),
	createdAt: yup
		.date()
		.default(() => new Date())
		.required(),
	authorId: yup
		.string()
		.default(() => auth.currentUser?.uid)
		.required(),
});

const { handleSubmit, errors, resetForm, defineField } = useForm({
	validationSchema: schema,
});

const [title, titleAttrs] = defineField('title');
const [amount, amountAttrs] = defineField('amount');
const [category, categoryAttrs] = defineField('category');

const newTransaction = ref({
	title: title,
	amount: amount,
	category: category,
	createdAt: new Date().toDateString(),
	authorId: auth.currentUser?.uid,
});

const onSubmit = handleSubmit(() => {
	emit('addTransaction', newTransaction.value);
	resetForm();
});
</script>
