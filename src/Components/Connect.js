import React, { Component } from 'react'
import { onboard, web3 } from '../utils/onboard';
import { ERC20ABI, factoryABI, exchangeABI } from '../utils/contractABIs';
import { Button } from 'react-bootstrap';
import { tokenData } from '../utils/tokenData';

// Components
import DropdownMenu from '../Components/DropdownMenu/DropdownMenu';
import CreateExchange from './CreateExchange/CreateExchange';
import SwapButton from '../Components/SwapButton/SwapButton';


export default class Connect extends Component {
    constructor() {
        super();

        this.state = {
            address: '',
            balance: '',
            tokenSymbol: 'DAI',
            tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
            tokenInstance: {},
            exchangeInstance: {},
            factoryInstance: {},
            walletConnected: false,
            factoryAddress: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95'
        }
    }

    connectWallet = async () => {
        const result = await onboard.walletSelect();
        if(result) {
            await onboard.walletCheck();
            const currentState = await onboard.getState();

            const weiBalance = await web3.eth.getBalance(currentState.address);
            const balance = web3.utils.fromWei(weiBalance);

            const factoryInstance = new web3.eth.Contract(factoryABI, this.state.factoryAddress);

            const exchangeAddress = await factoryInstance.methods.getExchange(this.state.tokenAddress).call();
            const exchangeInstance = new web3.eth.Contract(exchangeABI, exchangeAddress)

            this.setState({
                address: currentState.address,
                balance,
                walletConnected: true,
                factoryInstance,
                exchangeInstance
            });

            // Creating Instance for DAI after user connects wallet
            this.setTokenInstance(0);
        }
    }

    setTokenInstance = async (token) => {
        const tokenAddress = tokenData[token].address;
        const tokenSymbol = tokenData[token].symbol

        const tokenInstance = new web3.eth.Contract(ERC20ABI, tokenAddress);
        const exchangeAddress = await this.state.factoryInstance.methods.getExchange(tokenAddress).call();
        console.log(exchangeAddress)
        const exchangeInstance = new web3.eth.Contract(exchangeABI, exchangeAddress)

        this.setState({ 
            tokenInstance: tokenInstance,
            tokenSymbol: tokenSymbol,
            tokenAddress: tokenAddress,
            exchangeInstance
        });
    }

    render() {
        const { 
            walletConnected, 
            address, 
            balance, 
            tokenSymbol, 
            factoryInstance,
            exchangeInstance
        } = this.state;

        return (
            <div>
                {!walletConnected ?
                <Button onClick={this.connectWallet} variant="primary">Connect Wallet</Button>
                :
                <div>
                    <div>{address}</div>
                    <div>{balance} ETH</div>
                    <DropdownMenu 
                        setTokenInstance={this.setTokenInstance} 
                        tokenSymbol={tokenSymbol} 
                    />
                    <SwapButton address={address} exchangeInstance={exchangeInstance} />
                    <CreateExchange address={address} factoryInstance={factoryInstance}/>
                    
                </div>
                }
            </div>
        )
    }
}
