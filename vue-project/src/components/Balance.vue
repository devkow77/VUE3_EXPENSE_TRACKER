<template>
	<section class="p-4 rounded-md">
		<h2 class="font-bold">Transaction History</h2>
		<!-- no transactions communicate -->
		<div v-if="!transactions.length" class="py-4">
			<h4 class="font-semibold mb-2">No transactions yet 😢</h4>
			<p class="text-sm leading-6 opacity-80">To add a transaction, fill the form fields and click Create on the button above</p>
		</div>
		<!-- transactions list -->
		<div v-if="transactions.length" class="mt-4 w-full h-[350px] space-y-4 rounded-md overflow-y-auto">
			<div v-for="t in transactions" class="w-full py-2 px-4 rounded-md bg-black/10 text-sm flex items-center gap-4 justify-between">
				<div>
					<div class="mb-2">
						<h4 class="font-bold text-base">{{ t.title }}</h4>
						<p :class="t.amount < 0 ? 'text-pink-400' : 'text-violet-400'">{{ t.amount.toFixed(2) }}{{ t.currency }}</p>
					</div>
					<div class="text-xs opacity-60">
						<p>{{ t.createdAt }}</p>
						<p>{{ t.category }}</p>
					</div>
				</div>
				<button @click="emit('deleteTransaction', t.id)" class="h-full p-1 bg-violet-600 hover:bg-violet-400 duration-200 rounded-md">
					<v-icon name="md-deleteoutline" />
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const { transactions } = defineProps(['transactions']);
const emit = defineEmits(['deleteTransaction']);
</script>
