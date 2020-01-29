import React, { Component } from 'react'
import { onboard, web3 } from '../utils/onboard';
import { ERC20ABI, factoryABI, exchangeABI } from '../utils/contractABIs';
import { Button } from 'react-bootstrap';
import { tokenData } from '../utils/tokenData';
import DropdownMenu from '../Components/DropdownMenu/DropdownMenu';
import CreateExchange from './CreateExchange/CreateExchange';


export default class Connect extends Component {
    constructor() {
        super();

        this.state = {
            address: '',
            balance: '',
            token1Symbol: 'ETH',
            token2Symbol: 'DAI',
            token1Address: '0x6b175474e89094c44da98b954eedeac495271d0f',
            token2Address: '',
            token1ExchangeAddress: '',
            token2ExchangeAddress: '',
            token1Instance: {},
            token2Instance: {},
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

            this.setState({
                address: currentState.address,
                balance,
                walletConnected: true,
                factoryInstance
            });

            // Creating Instance for DAI after user connects wallet
            this.setTokenInstance(0, 2);
        }
    }

    setTokenInstance = (token, tokenNumber) => {
        const tokenAddress = tokenData[token].address;
        const tokenSymbol = tokenData[token].symbol

        const tokenInstance = new web3.eth.Contract(ERC20ABI, tokenAddress);

        const exchangeAddress = this.state.factoryInstance.methods.getExchange(tokenAddress).call();

        if(tokenNumber === 1 && this.state.token1Symbol !== tokenSymbol) {
            this.setState({ 
                token1Instance: tokenInstance,
                token1Symbol: tokenSymbol,
                token1Address: tokenAddress,
                token1ExchangeAddress: exchangeAddress
            });
        }
        else if(tokenNumber !== 5) {
            this.setState({ 
                token2Instance: tokenInstance,
                token2Symbol: tokenSymbol,
                token2Address: tokenAddress,
                token2ExchangeAddress: exchangeAddress
            });
        }
        
    }

    render() {
        const { 
            walletConnected, 
            address, 
            balance, 
            token1Symbol, 
            token2Symbol,
            factoryInstance
        } = this.state;
        return (
            <div>
                <div>{address}</div>
                <div>{balance}</div>
                {!walletConnected ?
                <Button onClick={this.connectWallet} variant="primary">Connect Wallet</Button>
                :
                <div>
                    <DropdownMenu 
                        setTokenInstance={this.setTokenInstance} 
                        token1Symbol={token1Symbol} 
                        token2Symbol={token2Symbol}
                    />
                    <CreateExchange address={address} factoryInstance={factoryInstance}/>
                </div>
                }
            </div>
        )
    }
}
