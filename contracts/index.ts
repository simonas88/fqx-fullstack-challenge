export type FaceValueKey = "faceValue" | "agioPercentage" | "agioValue" | "aprPercentage";

export type EnoteCoreModel = {
	purchasePrice: number;
	paymentDate: Date;
	dueDate: Date;
	faceValueKey: FaceValueKey;
	faceValueValue: number;
}

export type EnoteCoreModelSaved = EnoteCoreModel & { id: number }