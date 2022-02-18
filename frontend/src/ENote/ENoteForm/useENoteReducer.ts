import { useMemo, useReducer } from "react";
import { EnoteCoreModel } from "../../contracts";
import reducer, { defaultState, ENoteModelReducerState, getENoteModel } from "./createENoteReducer";
import { getDerivedModel, isValueSet } from "./ENoteModelUtils";

const getInitState = (initModel?: EnoteCoreModel): ENoteModelReducerState => {
	if (!initModel) return defaultState;
	return {
		coreModel: initModel,
		derivedModel: getDerivedModel(initModel),
		pristine: true,
	};
};

export const useENoteReducer = (initModel?: EnoteCoreModel) => {
	const [reducerState, dispatch] = useReducer(reducer, initModel, getInitState);
	const eNoteModel = useMemo(() => getENoteModel(reducerState), [reducerState]);

	const actions = useMemo(() => ({
		changePurchasePrice: (value: number) => dispatch({ type: "change", key: "purchasePrice", value }),
		changePaymentDate: (value: Date) => dispatch({ type: "change", key: "paymentDate", value }),
		changeDueDate: (value: Date) => dispatch({ type: "change", key: "dueDate", value }),
		changeFaceValue: (value: number) => dispatch({ type: "change", key: "faceValue", value }),
		changeAgioPercentage: (value: number) => dispatch({ type: "change", key: "agioPercentage", value }),
		changeAgioValue: (value: number) => dispatch({ type: "change", key: "agioValue", value }),
		changeAprPercentage: (value: number) => dispatch({ type: "change", key: "aprPercentage", value }),
		reset: (payload: EnoteCoreModel) => dispatch({ type: "reset", payload: getInitState(payload) })
	}), [dispatch]);

	return {
		eNoteCoreModel: reducerState.coreModel,
		eNoteModel,
		actions,
		controlledFaceValueKey: reducerState.coreModel.faceValueKey,
		pristine: reducerState.pristine,
		isCoreModelSet: true
			&& isValueSet(reducerState.coreModel.purchasePrice)
			&& isValueSet(reducerState.coreModel.paymentDate)
			&& isValueSet(reducerState.coreModel.dueDate)
	};
};
