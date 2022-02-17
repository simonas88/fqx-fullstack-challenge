import days360 from "days360";

export const getAprPercentage = (agioPercentage: number, maturity: number): number => agioPercentage / (maturity / 360);
export const getMaturity = (dateFrom: Date, dateTo: Date) => days360(dateFrom, dateTo, 1);
