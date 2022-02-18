import { EnoteCoreModel, EnoteDerivedModel, EnoteFormModel } from "../../contracts";
import { getDerivedModel } from "./ENoteModelUtils";

type ChangeAction<FieldKey extends keyof EnoteFormModel> = {
	type: "change";
	key: FieldKey;
	value: EnoteFormModel[FieldKey];
}

// https://github.com/microsoft/TypeScript/issues/18758
export type AnyChangeAction =
	| ChangeAction<"purchasePrice">
	| ChangeAction<"paymentDate">
	| ChangeAction<"dueDate">
	| ChangeAction<"maturity">
	| ChangeAction<"agioPercentage">
	| ChangeAction<"agioValue">
	| ChangeAction<"aprPercentage">
	| ChangeAction<"faceValue">

export type ENoteModelReducerState = {
	coreModel: Partial<EnoteCoreModel>;
	derivedModel: Partial<EnoteDerivedModel>;
	pristine: boolean;
}

type ResetAction = {
	type: "reset";
	payload?: ENoteModelReducerState
}

export const getENoteModel = (state: ENoteModelReducerState): Partial<EnoteFormModel> => ({
	...state.derivedModel,
	purchasePrice: state.coreModel.purchasePrice,
	dueDate: state.coreModel.dueDate,
	paymentDate: state.coreModel.paymentDate,
});

export const defaultState: ENoteModelReducerState = Object.freeze({
	coreModel: Object.freeze({}),
	derivedModel: Object.freeze({}),
	pristine: true,
});

const reducer = (
	state: ENoteModelReducerState,
	action: AnyChangeAction | ResetAction
): ENoteModelReducerState => {
	if (action.type === "reset") {
		return { ...(action.payload || defaultState) };
	}

	switch(action.key) {
		case "purchasePrice":
		case "paymentDate":
		case "dueDate": {
			const nextCoreState = {
				...state.coreModel,
				[action.key]: action.value
			};

			return {
				coreModel: nextCoreState,
				derivedModel: getDerivedModel(nextCoreState),
				pristine: false,
			};
		}

		case "faceValue":
		case "agioPercentage":
		case "agioValue":
		case "aprPercentage": {
			const nextCoreState = {
				...state.coreModel,
				faceValueKey: action.key,
				faceValueValue: action.value
			};

			return {
				coreModel: nextCoreState,
				derivedModel: getDerivedModel(nextCoreState),
				pristine: false
			};
		}

		default: {
			return state;
		}
	}
};

export default reducer;
