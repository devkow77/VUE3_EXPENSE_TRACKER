<template>
	<section class="p-4 rounded-md">
		<form class="space-y-4 text-sm">
			<div>
				<label for="alphabet">Sort by alphabet</label><br />
				<p><input v-model="sort" type="radio" name="sort" value="alphabet_asc" /> A-Z</p>
				<p><input v-model="sort" type="radio" name="sort" value="alphabet_desc" /> Z-A</p>
			</div>
			<div>
				<label for="price">Sort by price</label><br />
				<p><input v-model="sort" type="radio" name="sort" value="price_asc" /> Lowest - Highest</p>
				<p><input v-model="sort" type="radio" name="sort" value="price_desc" /> Highest - Lowest</p>
			</div>
			<div>
				<label for="category">Find by category</label><br />
				<select v-model="filter" class="w-full px-4 py-2 bg-black/10 rounded-md">
					<option value="" class="bg-violet-600">Choose a category</option>
					<option v-for="c in categories" :value="c" class="bg-pink-600">{{ c }}</option>
				</select>
			</div>
			<div>
				<label for="category">Search by title</label><br />
				<input v-model="search" type="text" placeholder="First letter of transaction..." class="w-full px-4 py-2 bg-black/10 rounded-md" />
			</div>
			<button type="reset" class="w-full p-2 bg-violet-600 hover:bg-violet-400 rounded-md duration-200">Reset filters</button>
		</form>
	</section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const { categories } = defineProps(['categories']);

const sort = ref('alphabet_asc');
const filter = ref('');
const search = ref('');
const emit = defineEmits(['sort', 'filter', 'search']);

watch(sort, () => {
	emit('sort', sort.value);
});
watch(filter, () => {
	emit('filter', filter.value);
});
watch(search, () => {
	emit('search', search.value);
});
</script>
