import { Enote } from "../entities/enote.entity";

export type CreateEnoteDto = Omit<Enote, "id">
