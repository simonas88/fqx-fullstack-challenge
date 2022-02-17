import reducer, { AnyChangeAction, ENoteModelReducerState } from "./createENoteReducer";

const EMPTY_STATE = {
	coreModel: {},
	derivedModel: {}
};

describe("createENoteReducer", () => {
	it("returns default state on reset action", () => {
		expect(reducer({} as ENoteModelReducerState, { type: "reset" })).toEqual(EMPTY_STATE);
	});

	test.each`
		key                | value                     | state
		${"purchasePrice"} | ${100}                    | ${{ ...EMPTY_STATE, coreModel: { purchasePrice: 100 } }}
		${"paymentDate"}   | ${new Date("2020-01-01")} | ${{ ...EMPTY_STATE, coreModel: { paymentDate: new Date("2020-01-01") } }}
		${"dueDate"}       | ${new Date("2020-01-01")} | ${{ ...EMPTY_STATE, coreModel: { dueDate: new Date("2020-01-01") } }}
	`("updates $key in coreModel", ({ key, value, state }) => {
		expect(reducer(EMPTY_STATE, { key, value, type: "change" })).toEqual(state);
	});

	it("udpates maturity when both dates purchaseDate and dueDate is available", () => {
		const inputState = {
			coreModel: { paymentDate: new Date("2020-01-01") },
			derivedModel: {}
		};
		const action = { type: "change", key: "dueDate", value: new Date("2020-02-01") } as AnyChangeAction;
		const outputState = {
			coreModel: {
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-02-01")
			},
			derivedModel: { maturity: 30 }
		};
		expect(reducer(inputState, action)).toEqual(outputState);
	});

	test.each([
		["faceValue", 100],
		["agioPercentage", 0.1],
		["agioValue", 100],
		["aprPercentage", 0.2]
	])("updates core %s", (key, value) => {
		const action = { type: "change", key, value } as AnyChangeAction;
		const outputState = {
			coreModel: { faceValueKey: key, faceValueValue: value },
			derivedModel: {}
		};
		expect(reducer(EMPTY_STATE, action)).toEqual(outputState);
	});

	test.each([
		[
			100,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 100,
				agioValue: 10,
				agioPercentage: 0.1,
				aprPercentage: 0.2
			}
		],
		[
			90,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 90,
				agioValue: 0,
				agioPercentage: 0,
				aprPercentage: 0
			}
		],
		[
			1000,
			{
				purchasePrice: 1100,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 1000,
				agioValue: -100,
				agioPercentage: -0.1,
				aprPercentage: -0.2
			}
		]
	])("updates derived model according to faceValue (%s)", (value, coreModel, derivedModel) => {
		const inputState = { coreModel, derivedModel: {} };
		const action = { type: "change", key: "faceValue", value } as AnyChangeAction;
		const outputState = { coreModel: { ...coreModel, faceValueKey: "faceValue", faceValueValue: value }, derivedModel };
		expect(reducer(inputState, action)).toEqual(outputState);
	});

	test.each([
		[
			0.1,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 100,
				agioValue: 10,
				agioPercentage: 0.1,
				aprPercentage: 0.2
			}
		],
		[
			0,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 90,
				agioValue: 0,
				agioPercentage: 0,
				aprPercentage: 0
			}
		],
		[
			-0.1,
			{
				purchasePrice: 110,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 99.99999999999999,
				agioValue: -10.000000000000014,
				agioPercentage: -0.1,
				aprPercentage: -0.2
			}
		],
	])("updates derived model according to agioPercentage (%s)", (value, coreModel, derivedModel) => {
		const inputState = { coreModel, derivedModel: {} };
		const action = { type: "change", key: "agioPercentage", value } as AnyChangeAction;
		const outputState = { coreModel: { ...coreModel, faceValueKey: "agioPercentage", faceValueValue: value }, derivedModel };
		expect(reducer(inputState, action)).toEqual(outputState);
	});

	test.each([
		[
			10,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 100,
				agioValue: 10,
				agioPercentage: 0.1,
				aprPercentage: 0.2
			}
		],
		[
			0,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 90,
				agioValue: 0,
				agioPercentage: 0,
				aprPercentage: 0
			}
		],
		[
			-10,
			{
				purchasePrice: 110,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 100,
				agioValue: -10,
				agioPercentage: -0.1,
				aprPercentage: -0.2
			}
		],
	])("updates derived model according to agioValue (%s)", (value, coreModel, derivedModel) => {
		const inputState = { coreModel, derivedModel: {} };
		const action = { type: "change", key: "agioValue", value } as AnyChangeAction;
		const outputState = { coreModel: { ...coreModel, faceValueKey: "agioValue", faceValueValue: value }, derivedModel };
		expect(reducer(inputState, action)).toEqual(outputState);
	});

	test.each([
		[
			0.2,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 100,
				agioValue: 10,
				agioPercentage: 0.1,
				aprPercentage: 0.2
			}
		],
		[
			0,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 90,
				agioValue: 0,
				agioPercentage: 0,
				aprPercentage: 0
			}
		],
		[
			-0.2,
			{
				purchasePrice: 110,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2020-07-01")
			},
			{
				maturity: 180,
				faceValue: 99.99999999999999,
				agioValue: -10.000000000000014,
				agioPercentage: -0.1,
				aprPercentage: -0.2
			}
		],
		[
			0.2 / 3,
			{
				purchasePrice: 90,
				paymentDate: new Date("2020-01-01"),
				dueDate: new Date("2021-07-01")
			},
			{
				maturity: 540,
				faceValue: 100,
				agioValue: 10,
				agioPercentage: 0.1,
				aprPercentage: 0.2 / 3
			}
		],
	])("updates derived model according to aprPercentage (%s)", (value, coreModel, derivedModel) => {
		const inputState = { coreModel, derivedModel: {} };
		const action = { type: "change", key: "aprPercentage", value } as AnyChangeAction;
		const outputState = { coreModel: { ...coreModel, faceValueKey: "aprPercentage", faceValueValue: value }, derivedModel };
		expect(reducer(inputState, action)).toEqual(outputState);
	});
});
