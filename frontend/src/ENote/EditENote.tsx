import { FC, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router";
import debounce from "lodash/debounce";
import { getEnote, putEnote } from "./api/api";
import ENoteForm from "./ENoteForm/ENoteForm";
import { EnoteCoreModelSaved } from "../../../contracts";

const EditENote: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { mutateAsync } = useMutation("update", putEnote);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { data, status } = useQuery("fetch", () => getEnote(id!), { retry: false });

	const debouncedSave = useMemo(() => debounce((model: EnoteCoreModelSaved) => {
		mutateAsync({
			id: Number(id),
			model,
		});
	}, 500), [mutateAsync, id]);

	useEffect(() => {
		if (status === "error") {
			navigate("/");
		}
	}, [status, navigate]);

	if (status !== "success" && !data) {
		return <div>Loading</div>;
	}

	return (
		<ENoteForm
			title="Edit eNote"
			initModel={data}
			onChange={debouncedSave} />
	);
};

export default EditENote;
