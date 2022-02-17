import { FC, useCallback } from "react";
import CurrencyInput from "./components/CurrencyInput";
import DatePicker from "./components/DatePicker";
import ScalarInput from "./components/ScalarInput";
import { useENoteReducer } from "./useENoteReducer";
import "./CreateENote.css";

const toPercentPoints = (input?: number): number | undefined => input && input * 100;

const CreateENote: FC = () => {
	const { eNoteModel, actions, controlledFaceValueKey, isCoreModelSet } = useENoteReducer();
	const { changeAgioPercentage, changeAprPercentage } = actions;
	const handleAgioPercentage = useCallback(input => changeAgioPercentage(input / 100), [changeAgioPercentage]);
	const handleAprPercentage = useCallback(input => changeAprPercentage(input / 100), [changeAprPercentage]);

	return (
		<div className="create-e-note-container">
			<h2>Create eNote</h2>
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
			</form>
		</div>
	);
};

export default CreateENote;
