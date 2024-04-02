import React from 'react'
import { signAndConfirmTransactionFe } from "../createNFT/ultilityFunc";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

 function airdropDevnet( network,  to_address ) {
    (async () => {
        const connection = new Connection(`https://api.${network}.solana.com`, "confirmed");
        const myAddress = new PublicKey(to_address);
        const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
      })();
}

export default airdropDevnet