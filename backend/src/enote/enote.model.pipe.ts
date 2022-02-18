// import { PipeTransform, Injectable, HttpException, HttpStatus } from "@nestjs/common";
// import { EnoteModel } from "contracts";

// const FACE_VALUE_KEYS = ["agioPercentage", "agioValue", "aprPercentage", "faceValue"];
// const CORE_KEYS = ["purchasePrice", "paymentDate", "dueDate"];

// @Injectable()
// export class EnoteModelPipe implements PipeTransform<EnoteModel, EnoteModel> {
// 	transform(value: EnoteModel): EnoteModel {
// 		const foundFaceValueKeys = FACE_VALUE_KEYS.reduce((count, key) => value[key] ? count + 1 : count, 0);
// 		const foundCoreKeys = CORE_KEYS.reduce((count, key) => value[key] ? count + 1 : count, 0);

// 		if (foundFaceValueKeys !== 1 || foundCoreKeys < 3) {
// 			throw new HttpException("invalid request object", HttpStatus.BAD_REQUEST);
// 		}

// 		return value;
// 	}
// }
