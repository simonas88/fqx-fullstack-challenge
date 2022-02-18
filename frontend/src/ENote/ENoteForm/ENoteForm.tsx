import { ReactElement, useCallback, useEffect } from "react";
import CurrencyInput from "../components/CurrencyInput";
import DatePicker from "../components/DatePicker";
import ScalarInput from "../components/ScalarInput";
import SaveButton from "../components/SaveButton";
import { useENoteReducer } from "./useENoteReducer";
import { EnoteCoreModel, EnoteCoreModelSaved } from "../../contracts";
import "./ENoteForm.css";

const toPercentPoints = (input?: number): number | undefined => input && input * 100;

type ENoteFormProps<T extends EnoteCoreModel | EnoteCoreModelSaved> = {
	onSubmit?: (model: T) => void;
	onChange: (model: T) => void;
	title: string;
	initModel?: EnoteCoreModel;
}

const ENoteForm = <T extends EnoteCoreModel | EnoteCoreModelSaved>({
	onSubmit,
	onChange,
	title,
	initModel
}: ENoteFormProps<T>): ReactElement => {
	const { eNoteModel, actions, controlledFaceValueKey, isCoreModelSet, eNoteCoreModel } = useENoteReducer(initModel);
	const { changeAgioPercentage, changeAprPercentage } = actions;
	const handleAgioPercentage = useCallback(input => changeAgioPercentage(input / 100), [changeAgioPercentage]);
	const handleAprPercentage = useCallback(input => changeAprPercentage(input / 100), [changeAprPercentage]);
	const handleSave = () => onSubmit?.(eNoteCoreModel as T);

	useEffect(() => {
		onChange(eNoteCoreModel as T);
	}, [eNoteCoreModel, onChange]);

	return (
		<div className="create-e-note-container">
			<h2>{title}</h2>
			<form className="create-e-note-form">
				<CurrencyInput
					currency="CHF"
					label="Purchase price"
					value={eNoteModel.purchasePrice}
					onChange={actions.changePurchasePrice} />
				<DatePicker
					label="Payment date"
					minDate={new Date()}
					value={eNoteModel.paymentDate}
					onChange={actions.changePaymentDate} />
				<DatePicker
					label="Due date"
					minDate={eNoteModel.paymentDate}
					value={eNoteModel.dueDate}
					onChange={actions.changeDueDate} />
				<ScalarInput
					label="Maturity (days 360)"
					isReadOnly
					value={eNoteModel.maturity} />
				<CurrencyInput
					currency="%"
					label="Agio"
					disabled={!isCoreModelSet}
					helperText={isCoreModelSet ? undefined : "Please fill out purchase price, payment date, and due date first"}
					limitPrecision={controlledFaceValueKey !== "agioPercentage"}
					value={toPercentPoints(eNoteModel.agioPercentage)}
					onChange={handleAgioPercentage} />
				<CurrencyInput
					currency="CHF"
					label="Agio"
					disabled={!isCoreModelSet}
					helperText={isCoreModelSet ? undefined : "Please fill out purchase price, payment date, and due date first"}
					limitPrecision={controlledFaceValueKey !== "agioValue"}
					value={eNoteModel.agioValue}
					onChange={actions.changeAgioValue} />
				<CurrencyInput
					currency="%"
					label="APR"
					disabled={!isCoreModelSet}
					helperText={isCoreModelSet ? undefined : "Please fill out purchase price, payment date, and due date first"}
					limitPrecision={controlledFaceValueKey !== "aprPercentage"}
					value={toPercentPoints(eNoteModel.aprPercentage)}
					onChange={handleAprPercentage} />
				<CurrencyInput
					currency="CHF"
					label="Face value"
					disabled={!isCoreModelSet}
					helperText={isCoreModelSet ? undefined : "Please fill out purchase price, payment date, and due date first"}
					limitPrecision={controlledFaceValueKey !== "faceValue"}
					value={eNoteModel.faceValue}
					onChange={actions.changeFaceValue} />
				{onSubmit && (
					<SaveButton onClick={handleSave} disabled={!isCoreModelSet && !controlledFaceValueKey}>Submit</SaveButton>
				)}
			</form>
		</div>
	);
};

export default ENoteForm;
