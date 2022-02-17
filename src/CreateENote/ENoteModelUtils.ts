import { ENoteCoreModel, ENoteDerivedModel } from "./contracts";
import { getAprPercentage, getMaturity } from "./financeUtils";

const isValueSet = <T extends number | Date | string>(value?: number | Date | string): value is T => value !== undefined && value !== null;
const isCoreFullySet = (input: Partial<ENoteCoreModel>): input is ENoteCoreModel => true
	&& isValueSet(input.purchasePrice)
	&& isValueSet(input.paymentDate)
	&& isValueSet(input.dueDate)
	&& isValueSet(input.faceValueKey)
	&& isValueSet(input.faceValueValue);

type DeriveFrom = (coreModel: ENoteCoreModel, maturity: number) => ENoteDerivedModel

const deriveFromFaceValue: DeriveFrom = (coreModel, maturity) => {
	const faceValue = coreModel.faceValueValue;
	const agioValue = coreModel.faceValueValue - coreModel.purchasePrice;
	const agioPercentage = agioValue / faceValue;
	const aprPercentage = getAprPercentage(agioPercentage, maturity);

	return {
		maturity,
		faceValue,
		agioValue,
		agioPercentage,
		aprPercentage
	};
};

const deriveFromAgioPercentage: DeriveFrom = (coreModel, maturity) => {
	const agioPercentage = coreModel.faceValueValue;
	const faceValue = coreModel.purchasePrice / (1 - agioPercentage);
	const agioValue = faceValue - coreModel.purchasePrice;
	const aprPercentage = getAprPercentage(agioPercentage, maturity);

	return {
		maturity,
		faceValue,
		agioValue,
		agioPercentage,
		aprPercentage
	};
};

const deriveFromAgioValue: DeriveFrom = (coreModel, maturity) => {
	const agioValue = coreModel.faceValueValue;
	const faceValue = coreModel.purchasePrice + agioValue;
	const agioPercentage = agioValue / faceValue;
	const aprPercentage = getAprPercentage(agioPercentage, maturity);

	return {
		maturity,
		faceValue,
		agioValue,
		agioPercentage,
		aprPercentage
	};
};

const deriveFromAprPercentage: DeriveFrom = (coreModel, maturity) => {
	const aprPercentage = coreModel.faceValueValue;
	const agioPercentage = aprPercentage * (maturity / 360);
	const faceValue = coreModel.purchasePrice / (1 - agioPercentage);
	const agioValue = faceValue - coreModel.purchasePrice;

	return {
		maturity,
		faceValue,
		agioValue,
		agioPercentage,
		aprPercentage
	};
};

export const getDerivedModel = (coreModel: Partial<ENoteCoreModel>): Partial<ENoteDerivedModel> => {
	const { paymentDate, dueDate } = coreModel;
	const maturity = isValueSet(paymentDate) && isValueSet(dueDate)
		? getMaturity(paymentDate, dueDate)
		: undefined;

	if(!isCoreFullySet(coreModel) || !maturity) {
		return { ...isValueSet(maturity) ? { maturity } : {} };
	}

	switch(coreModel.faceValueKey) {
		case "faceValue":{
			return deriveFromFaceValue(coreModel, maturity);
		}
		case "agioPercentage":{
			return deriveFromAgioPercentage(coreModel, maturity);
		}
		case "agioValue":{
			return deriveFromAgioValue(coreModel, maturity);
		}
		case "aprPercentage":{
			return deriveFromAprPercentage(coreModel, maturity);
		}
	}
};
