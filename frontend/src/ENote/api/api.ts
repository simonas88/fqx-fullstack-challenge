import { EnoteModel } from "contracts";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3001" });

export const postEnote = async (input: EnoteModel) => axiosInstance.post("/enote", input);
