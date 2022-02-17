import { FC } from "react";
import CurrencyInput from "./components/CurrencyInput";
import DatePicker from "./components/DatePicker";
import ScalarInput from "./components/ScalarInput";
import { useENoteReducer } from "./useENoteReducer";
import "./CreateENote.css";

const CreateENote: FC = () => {
	const { eNoteModel, actions } = useENoteReducer();

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
					value={eNoteModel.agioPercentage && eNoteModel.agioPercentage * 100}
					onChange={value => actions.changeAgioPercentage(value / 100)} />
				<CurrencyInput
					currency="CHF"
					label="Agio"
					value={eNoteModel.agioValue}
					onChange={actions.changeAgioValue} />
				<CurrencyInput
					currency="%"
					label="APR"
					value={eNoteModel.aprPercentage}
					onChange={actions.changeAprPercentage} />
				<CurrencyInput
					currency="CHF"
					label="Face value"
					value={eNoteModel.faceValue}
					onChange={actions.changeFaceValue} />
			</form>
		</div>
	);
};

export default CreateENote;
