import Onboard from 'bnc-onboard';
import Web3 from 'web3';
import { onboardKey } from './config';

export let web3;

export const onboard = Onboard({
    dappId: onboardKey,       // [String] The API key created by step one above
    networkId: 1,  // [Integer] The Ethereum network ID your Dapp uses.
    darkMode: true,
    subscriptions: {
        wallet: wallet => {
            web3 = new Web3(wallet.provider)
        }
    }
});