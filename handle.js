import { AptosClient, AptosAccount, HexString, derivePath, CoinClient } from "aptos";
import bip39 from "bip39";
import { bytesToHex } from '@noble/hashes/utils';
import axios from 'axios'
import ansiEscapes from "ansi-escapes";
import dotenv from 'dotenv';

dotenv.config();

const NODE_URL = process.env.NODE_URL;
const client = new AptosClient(NODE_URL);
const coinClient = new CoinClient(client);

const mint = async (wallet, payload) => {
    console.log('\nMinting...');
    try {
        const generateTransaction = await client.generateTransaction(wallet.address().hex(), payload);


        generateTransaction.max_gas_amount = await coinClient.checkBalance(wallet) / generateTransaction.gas_unit_price;

        const signedTransaction = await client.signTransaction(wallet, generateTransaction);

        const pendingTransaction = await client.submitTransaction(signedTransaction);

        await client.waitForTransaction(pendingTransaction.hash);

        const result = await client.getTransactionByHash(pendingTransaction.hash);

        if (result.success) {
            console.log(`\nSuccess mint\nHash : ${result.hash}`);
        } else {
            console.log('\nFail');
        }
        
    } catch (err) {
        console.log(err.message);
    }
}

const main = async (startTime, payload) => {
    let wallet;
    if (process.env.MNEMONIC_OR_PRIVATE_KEY.split(' ').length > 2) {
        const mnemonic = process.env.MNEMONIC_OR_PRIVATE_KEY;
    
        const normalizeMnemonics = mnemonic.trim()
            .split(/\s+/)
            .map((part) => part.toLowerCase())
            .join(" ");
        
        const { key } = derivePath("m/44'/637'/0'/0'/0'", bytesToHex(bip39.mnemonicToSeedSync(normalizeMnemonics)));
        
        wallet = new AptosAccount(key);
    } else {
        wallet = new AptosAccount(new HexString(process.env.MNEMONIC_OR_PRIVATE_KEY).toUint8Array());
    }
    
    const accountBalance = Number(await coinClient.checkBalance(wallet)) / 100000000
    
    console.log(`\nAddress : ${wallet.address().hex()}`);
    console.log(`Balance : ${accountBalance} $APT`);

    var date = new Date(startTime * 1000);

    console.log(`\nMint time\nUnixTime : ${startTime}\nDate : ${date}\n`);

    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    
    let start = true;

    while(start) {
        const now = Date.now() / 1000
        var starting = startTime - now.toFixed(0);

        process.stdout.write(ansiEscapes.eraseLines(1) + `Starting in ${starting} sec`);
        if (now.toFixed(0) >= startTime) {
            start = false;
            await mint(wallet, payload);
        }
        await sleep(500)
    }
};

export { main };