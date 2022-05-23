import { ContractAction, ContractState } from "../../../types";

declare const ContractError: any;

export const mint = async (
    state: ContractState,
    { caller, input }: ContractAction
) => {
    const name = input.name;
    const ticker = input.ticker;

    if (!state.owner) {
        state.owner = caller;
    }

    if (typeof name !== 'string') {
        throw new ContractError('Invalid value for "name". Must be a string value.')
    }

    if (typeof ticker !== 'string') {
        throw new ContractError('Invalid value for "name". Must be a string value.')
    }

    state.name = name;
    state.ticker = ticker;
    return { state };
}