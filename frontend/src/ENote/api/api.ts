import { EnoteModel, EnoteSavedModel } from "contracts";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3001" });

export const postEnote = (input: EnoteModel): Promise<EnoteSavedModel> =>
	axiosInstance
		.post("/enote", input)
		.then(response => response.data);

type EnoteUpdatePayload = {
	id: number,
	model: EnoteSavedModel
}
export const putEnote = ({ id, model }: EnoteUpdatePayload): Promise<EnoteSavedModel> =>
	axiosInstance
		.put(`/enote/${id}`, model)
		.then(response => response.data);

export const getEnote = (id: string): Promise<EnoteSavedModel | undefined> =>
	axiosInstance
		.get(`/enote/${id}`)
		.then(response => response.data);
