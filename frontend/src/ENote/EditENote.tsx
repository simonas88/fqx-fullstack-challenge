import { FC, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router";
import { EnoteSavedModel } from "contracts";
import { getEnote, putEnote } from "./api/api";
import { ENoteCoreModel } from "./contracts";
import ENoteForm from "./ENoteForm/ENoteForm";
import { mapToENoteCoreModel, mapToEnoteModel } from "./ENoteForm/ENoteModelUtils";

const EditENote: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { mutateAsync } = useMutation("update", putEnote);
	const { data, status } = useQuery("fetch", () => getEnote(id!), { retry: false });
	const handleSave = useCallback((model: ENoteCoreModel) => mutateAsync({ id: Number(id), model: mapToEnoteModel(model, Number(id)) as EnoteSavedModel }), [id, mutateAsync]);

	useEffect(() => {
		if (status === "error") {
			navigate("/");
		}
	}, [status, navigate]);

	if (status !== "success") {
		return <div>Loading</div>;
	}

	return (
		<ENoteForm
			title="Edit eNote"
			initModel={mapToENoteCoreModel(data!)}
			onSave={handleSave} />
	);
};

export default EditENote;
