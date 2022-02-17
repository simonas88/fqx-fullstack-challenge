export type FaceValueKey = "faceValue" | "agioPercentage" | "agioValue" | "aprPercentage"

export type ENoteCoreModel = {
	purchasePrice: number;
	paymentDate: Date;
	dueDate: Date;
	faceValueKey: FaceValueKey
	faceValueValue: number;
}

export type ENoteDerivedModel = {
	maturity: number;
	faceValue: number;
	agioPercentage: number;
	agioValue: number;
	aprPercentage: number;
}

export type ENoteModel = Omit<ENoteCoreModel, "faceValueKey" | "faceValueValue"> & ENoteDerivedModel;
