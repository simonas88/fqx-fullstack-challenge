export type Enote = {
	id: number;
	purchasePrice: number;
	paymentDate: Date;
	dueDate: Date;
	faceValue?: number;
	agioPercentage?: number;
	agioValue?: number;
	aprPercentage?: number;
}
