import {
	EnoteCoreModel as __EnoteCoreModel,
	EnoteCoreModelSaved as __EnoteCoreModelSaved,
	FaceValueKey as __FaceValueKey,
} from "contracts";

export type FaceValueKey = __FaceValueKey

export type EnoteCoreModel = __EnoteCoreModel
export type EnoteCoreModelSaved = __EnoteCoreModelSaved

export type EnoteDerivedModel = {
	maturity: number;
	faceValue: number;
	agioPercentage: number;
	agioValue: number;
	aprPercentage: number;
}

export type EnoteFormModel = Omit<EnoteCoreModel, "faceValueKey" | "faceValueValue"> & EnoteDerivedModel;
