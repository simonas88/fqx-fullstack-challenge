import { FC, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router";
import debounce from "lodash/debounce";
import { getEnote, putEnote } from "./api/api";
import ENoteForm from "./ENoteForm/ENoteForm";
import { EnoteCoreModelSaved } from "../../../contracts";
import LoadingIndicator from "./components/LoadingIndicator";

const EditENote: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const mutation = useMutation("update", putEnote);
	const { mutateAsync } = mutation;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const query = useQuery("fetch", () => getEnote(id!), { retry: false });

	const debouncedSave = useMemo(() => debounce((model: EnoteCoreModelSaved) => {
		mutateAsync({
			id: Number(id),
			model,
		});
	}, 500), [mutateAsync, id]);

	useEffect(() => {
		if (query.status === "error") {
			navigate("/");
		}
	}, [query.status, navigate]);

	if (!query.data && query.status === "loading") {
		return <LoadingIndicator>Fetching eNote...</LoadingIndicator>;
	}

	return (
		<ENoteForm
			title="Edit eNote"
			isWorking={mutation.isLoading || query.isFetching}
			isSaved={mutation.isSuccess && !query.isFetching}
			initModel={query.data}
			onChange={debouncedSave} />
	);
};

export default EditENote;
