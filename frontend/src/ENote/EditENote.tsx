import { FC, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router";
import { getEnote, putEnote } from "./api/api";
import { EnoteCoreModel } from "../contracts";
import ENoteForm from "./ENoteForm/ENoteForm";
import { EnoteCoreModelSaved } from "../../../contracts";

const EditENote: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { mutateAsync } = useMutation("update", putEnote);
	const { data, status } = useQuery("fetch", () => getEnote(id!), { retry: false });
	const handleSave = useCallback((model: EnoteCoreModel) => {
		mutateAsync({
			id: Number(id),
			model: model as EnoteCoreModelSaved
		});
	}, [id, mutateAsync]);

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
			initModel={data}
			onSave={handleSave} />
	);
};

export default EditENote;
