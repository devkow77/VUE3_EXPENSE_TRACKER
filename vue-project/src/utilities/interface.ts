export interface Transaction {
	id: string;
	title: string;
	amount: number;
	category: string;
	createdAt: Date;
	authorId: number;
}

export interface Account {
	name: string;
	email: string;
	currency: string;
}
