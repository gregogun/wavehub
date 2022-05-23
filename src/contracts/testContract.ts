import fs from "fs";
import ArLocal from "arlocal";
import Arweave from "arweave";
import { addFunds } from "../tests/_helpers";
import {
    PstState,
    SmartWeaveNodeFactory,
    LoggerFactory,
    Contract,
  } from "redstone-smartweave";
import path from "path";

(async () => {

const arLocal = new ArLocal(1985, false);
await arLocal.start();

const arweave = Arweave.init({
    host: 'localhost',
    port: 1985,
    protocol: 'http',
  });

  LoggerFactory.INST.logLevel("error");
  const smartweave = SmartWeaveNodeFactory.memCached(arweave);

  const mine = () => arweave.api.get('mine');

  const wallet = await arweave.wallets.generate();
  await addFunds(arweave, wallet);
  const walletAddress = await arweave.wallets.jwkToAddress(wallet);

  const contractSrc = fs.readFileSync(
    path.join(__dirname, "../../dist/contract.js"),
    "utf8"
  );
  const initialState: PstState = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../../dist/contracts/initial-state.json"),
      "utf8"
    )
  );

  const contractTxId = await smartweave.createContract.deploy({
    wallet,
    initState: JSON.stringify(initialState),
    src: contractSrc,
  });
  await mine();

  const contract: Contract = smartweave.contract(contractTxId).connect(wallet);

  const state = await contract.readState();
  console.log('State before any interaction:');
  console.log(JSON.stringify(state, null, 2));
  
  console.log(`Sending 'mint' interaction...`);
  await contract.writeInteraction({ function: 'mint', ticker: 'WVHB' })
  await mine();
  console.log('mint interaction sent!');
  
  console.log('State after mint interaction:');
  const { result: isHolder } = await contract.viewState({
    function: 'isARoyaltyHolder'
  });
  console.log(isHolder);
  
  // console.log(JSON.stringify(stateAfterMintInteraction, null, 2));

  console.log('Simulate input function error');
  await contract.writeInteraction({ function: 'yooo' })
  
await arLocal.stop();

})();