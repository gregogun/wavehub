// import { balance } from "./actions/read/balance";
// import { mintTokens } from "./actions/write/mintTokens";
// import { transferTokens } from "./actions/write/transferTokens";
import { ContractAction, ContractResult as Result, ContractState } from "../types";

declare const ContractError;

declare type ContractResult = { state: ContractState } | { result: Result };

export async function handle(
  state: ContractState,
  action: ContractAction
): Promise<ContractResult> {
  const input = action.input;
  const caller = action.caller;

  switch (input.function) {
    case "mint": {
      if (!input.ticker) {
        throw new ContractError("no name given for Profit Sharing Token")
      }

      if (state.owner) {
        throw new ContractError("already minted")
      }

      state.ticker = input.ticker;
      state.owner = caller;
      state.royalties[state.owner] = 1000000
      return { state }
    }

    case "getTicker": {
      const ticker = state.ticker;
      return { result: ticker } as any
    }

    case "isARoyaltyHolder": {
      const isHolder = Object.keys(state.royalties).includes(caller);
      return { result: isHolder } as any 
    }

    case "getRoyalties": {
      const royalties = state.royalties[action.caller]
      return { result: royalties } as any;
    }
    // case "transfer":
    //   return await transferTokens(state, action);
    // case "balance":
    //   return await balance(state, action);
    default:
      throw new ContractError(
        `No function supplied or function not recognised: "${input.function}"`
      );
  }
}
