import { FC, useState } from "react";
import CurrencyInput from "./components/CurrencyInput";
import DatePicker from "./components/DatePicker";
import "./CreateENote.css";

const CreateENote: FC = () => {
	const [purchasePrice, setPurchasePrice] = useState(0);
	const [paymentDate, setPaymentDate] = useState<Date>(new Date());
	const [dueDate, setDueDate] = useState<Date>(new Date());

	return (
		<form className="create-e-note-container">
			<CurrencyInput
				currency="CHF"
				label="Purchase price"
				value={purchasePrice}
				onChange={setPurchasePrice} />
			<DatePicker
				label="Payment date"
				value={paymentDate}
				onChange={setPaymentDate} />
			<DatePicker
				label="Due date"
				value={dueDate}
				onChange={setDueDate} />
			<pre>
				• purchasePrice
				• paymentDate
				• dueDate
				• maturity
				• agioPercentage
				• agioValue
				• aprPercentage
				• faceValue
			</pre>
		</form>
	);
};

export default CreateENote;
