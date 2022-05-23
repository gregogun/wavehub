import fs from "fs";
import ArLocal from "arlocal";
import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import path from "path";
import { addFunds, mineBlock } from "./_helpers";
import {
  PstContract,
  PstState,
  SmartWeave,
  SmartWeaveNodeFactory,
  LoggerFactory,
  InteractionResult,
  Contract,
} from "redstone-smartweave";
import { ContractResult, ContractState } from "../types";

describe("Testing the Profit Sharing Token", () => {
  let contractSrc: string;

  let wallet: JWKInterface;
  let walletAddress: string;

  let initialState: PstState;

  let arweave: Arweave;
  let arlocal: ArLocal;
  let smartweave: SmartWeave;
  let contract: Contract<ContractState>;

  beforeAll(async () => {
    arlocal = new ArLocal(1820, false);
    await arlocal.start();

    arweave = Arweave.init({
      host: "localhost",
      port: 1820,
      protocol: "http",
    });

    LoggerFactory.INST.logLevel("error");

    smartweave = SmartWeaveNodeFactory.forTesting(arweave);
    wallet = await arweave.wallets.generate();
    walletAddress = await arweave.wallets.jwkToAddress(wallet);
    
    await addFunds(arweave, wallet);

    contractSrc = fs.readFileSync(
      path.join(__dirname, "../../dist/contract.js"),
      "utf8"
    );
    const stateFromFile: PstState = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../../dist/contracts/initial-state.json"),
        "utf8"
      )
    );

    initialState = {
      ...stateFromFile,
      // ...{
      //   owner: walletAddress,
      // },
    };

    const contractTxId = await smartweave.createContract.deploy({
      wallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    });

    contract = smartweave.contract(contractTxId);
    contract.connect(wallet);

    await mineBlock(arweave);
  });

  afterAll(async () => {
    await arlocal.stop();
  });

  it("should have no owner after deployment", async () => {
    const { state } = await contract.readState();
    expect(state.owner).toEqual("")
  });

  it("should successfully update the ticker of the contract", async () => {
    await contract.writeInteraction({
      function: "mint",
      ticker: "WVHB"
    });
    await mineBlock(arweave);
    
    const { result: ticker } = await contract.viewState({
      function: 'getTicker'
    });
    expect(ticker).toEqual("WVHB");
  });
  
  it("should assign royalties to the owner", async () => {
    await contract.writeInteraction({
      function: "mint",
      ticker: "WVHB"
    });
    await mineBlock(arweave);
    
    const { result: isHolder } = await contract.viewState({
      function: 'isARoyaltyHolder'
    });
    const { result: royalties } = await contract.viewState({
      function: 'getRoyalties'
    });
    expect(royalties).toBe(1000000);
  })
})
