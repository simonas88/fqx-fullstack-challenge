import { FC } from "react";
import { useMutation } from "react-query";
import { postEnote } from "./api/api";
import ENoteForm from "./ENoteForm/ENoteForm";

const CreateENote: FC = () => {
	const { mutateAsync } = useMutation("create", postEnote);

	return (
		<ENoteForm
			title="Create eNote"
			onChange={(model) => console.log(model)}
			onSubmit={mutateAsync} />
	);
};

export default CreateENote;
