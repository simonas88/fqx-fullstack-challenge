import { FC, useCallback } from "react";
import { useMutation } from "react-query";
import { postEnote } from "./api/api";
import { ENoteCoreModel } from "./contracts";
import ENoteForm from "./ENoteForm/ENoteForm";
import { mapToEnoteModel } from "./ENoteForm/ENoteModelUtils";

const CreateENote: FC = () => {
	const { mutateAsync } = useMutation("create", postEnote);
	const handleSave= useCallback((model: ENoteCoreModel) => mutateAsync(mapToEnoteModel(model)), [mutateAsync]);

	return (
		<ENoteForm
			title="Create eNote"
			onSave={handleSave} />
	);
};

export default CreateENote;
