import { useMemo, useReducer } from "react";
import { ENoteCoreModel } from "../contracts";
import reducer, { defaultState, ENoteModelReducerState, getENoteModel } from "./createENoteReducer";
import { getDerivedModel, isValueSet } from "./ENoteModelUtils";

const getInitState = (initModel?: ENoteCoreModel): ENoteModelReducerState => {
	if (!initModel) return defaultState;
	return {
		coreModel: initModel,
		derivedModel: getDerivedModel(initModel)
	};
};

export const useENoteReducer = (initModel?: ENoteCoreModel) => {
	const [reducerState, dispatch] = useReducer(reducer, getInitState(initModel));
	const eNoteModel = useMemo(() => getENoteModel(reducerState), [reducerState]);

	const actions = useMemo(() => ({
		changePurchasePrice: (value: number) => dispatch({ type: "change", key: "purchasePrice", value }),
		changePaymentDate: (value: Date) => dispatch({ type: "change", key: "paymentDate", value }),
		changeDueDate: (value: Date) => dispatch({ type: "change", key: "dueDate", value }),
		changeFaceValue: (value: number) => dispatch({ type: "change", key: "faceValue", value }),
		changeAgioPercentage: (value: number) => dispatch({ type: "change", key: "agioPercentage", value }),
		changeAgioValue: (value: number) => dispatch({ type: "change", key: "agioValue", value }),
		changeAprPercentage: (value: number) => dispatch({ type: "change", key: "aprPercentage", value }),
	}), [dispatch]);

	return {
		eNoteCoreModel: reducerState.coreModel,
		eNoteModel,
		actions,
		controlledFaceValueKey: reducerState.coreModel.faceValueKey,
		isCoreModelSet: true
			&& isValueSet(reducerState.coreModel.purchasePrice)
			&& isValueSet(reducerState.coreModel.paymentDate)
			&& isValueSet(reducerState.coreModel.dueDate)
	};
};
