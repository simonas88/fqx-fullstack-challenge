type EnoteCoreModel = {
	id?: number;
	purchasePrice: number;
	paymentDate: Date;
	dueDate: Date;
}

export type EnoteModel = 
	| EnoteCoreModel & { faceValue: number }
	| EnoteCoreModel & { agioPercentage: number }
	| EnoteCoreModel & { agioValue: number }
	| EnoteCoreModel & { aprPercentage: number }
