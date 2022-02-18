import { FC, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postEnote } from "./api/api";
import ENoteForm from "./ENoteForm/ENoteForm";

const CreateENote: FC = () => {
	const nav = useNavigate();
	const { mutateAsync, isLoading, data } = useMutation("create", postEnote);

	useEffect(() => {
		if (data && data.id !== undefined) {
			nav(`/${data.id}`);
		}
	}, [nav, data]);

	return (
		<ENoteForm
			title="Create eNote"
			isWorking={isLoading}
			onSubmit={mutateAsync} />
	);
};

export default CreateENote;
