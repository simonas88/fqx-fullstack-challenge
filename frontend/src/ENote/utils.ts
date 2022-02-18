import { EnoteCoreModel, EnoteCoreModelSaved } from "../contracts";

export const reviveDates = <T extends EnoteCoreModel | EnoteCoreModelSaved>(input: T): T => ({
	...input,
	paymentDate: new Date(input.paymentDate),
	dueDate: new Date(input.dueDate)
});
