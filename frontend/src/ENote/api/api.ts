import axios from "axios";
import { EnoteCoreModel, EnoteCoreModelSaved } from "../../contracts";

const axiosInstance = axios.create({ baseURL: "http://localhost:3001" });

export const postEnote = (input: EnoteCoreModel): Promise<EnoteCoreModelSaved> =>
	axiosInstance
		.post("/enote", input)
		.then(response => response.data);

type EnoteUpdatePayload = {
	id: number,
	model: EnoteCoreModelSaved
}
export const putEnote = ({ id, model }: EnoteUpdatePayload): Promise<EnoteCoreModelSaved> =>
	axiosInstance
		.put(`/enote/${id}`, model)
		.then(response => response.data);

export const getEnote = (id: string): Promise<EnoteCoreModelSaved | undefined> =>
	axiosInstance
		.get(`/enote/${id}`)
		.then(response => response.data);
