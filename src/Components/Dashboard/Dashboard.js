import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

// Ethereum
import { onboard, web3 } from '../../utils/onboard';
import { ERC20ABI, factoryABI, exchangeABI } from '../../utils/contractABIs';
import { tokenData } from '../../utils/tokenData';

// Components
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import CreateExchange from '../CreateExchange/CreateExchange';
import SwapButton from '../SwapButton/SwapButton';

// Redux
import { connect } from 'react-redux';
import {
    setAddress,
    setBalance,
    toggleWalletConnected,
    setTokenSymbol,
    setTokenAddress,
    createTokenInstance,
    createExchangeInstance,
    setExchangeAddress,
    createFactoryInstance,
    toggleSwapToken
} from '../../redux/actions';

class Dashboard extends Component {

    connectWallet = async () => {
        const { 
            setAddress,
            setBalance,
            toggleWalletConnected,
            tokenAddress,
            factoryAddress,
            createFactoryInstance,
            createExchangeInstance
        } = this.props;
        
        const result = await onboard.walletSelect();
        if(result) {
            await onboard.walletCheck();
            const currentState = await onboard.getState();

            const weiBalance = await web3.eth.getBalance(currentState.address);
            const balance = web3.utils.fromWei(weiBalance);
            setBalance(balance);

            const factoryInstance = new web3.eth.Contract(factoryABI, factoryAddress);

            const exchangeAddress = await factoryInstance.methods.getExchange(tokenAddress).call();
            const exchangeInstance = new web3.eth.Contract(exchangeABI, exchangeAddress);

            // Redux
            setAddress(currentState.address);
            toggleWalletConnected(true);
            createFactoryInstance(factoryInstance);
            createExchangeInstance(exchangeInstance);
            setExchangeAddress(exchangeAddress);

            // Creating Instance for DAI after user connects wallet
            this.setTokenInstance(0);
        }
    }

    setTokenInstance = async (token) => {
        const { 
            setTokenSymbol,
            setTokenAddress,
            createTokenInstance,
            createExchangeInstance,
            setExchangeAddress,
            factoryInstance
        } = this.props;
        const tokenAddress = tokenData[token].address;
        const tokenSymbol = tokenData[token].symbol

        const tokenInstance = new web3.eth.Contract(ERC20ABI, tokenAddress);
        const exchangeAddress = await factoryInstance.methods.getExchange(tokenAddress).call();
        const exchangeInstance = new web3.eth.Contract(exchangeABI, exchangeAddress)

        // Redux
        setTokenSymbol(tokenSymbol);
        setTokenAddress(tokenAddress);
        createTokenInstance(tokenInstance);
        createExchangeInstance(exchangeInstance);
        setExchangeAddress(exchangeAddress);
    }

    toggleSwap = (bool) => {
        toggleSwapToken(bool);
    }

    render() {
        const { 
            tokenSymbol, 
            factoryInstance,
            exchangeInstance,
            swapToken,
            exchangeAddress,
            tokenInstance,
            address, 
            balance, 
            walletConnected
        } = this.props;

        return (
            <div>
                <br/>
                <h2>Uniswap Portal</h2>
                <br/>
                {!walletConnected ?
                    <Button onClick={this.connectWallet} variant="primary">Connect Wallet</Button>
                :
                <div>
                    <br/>
                    <div>Address: {address}</div>
                    <div>Balance: {balance} ETH</div>
                    <br/>
                    <span onClick={() => this.toggleSwap(true)}>Swap </span><span onClick={() => this.toggleSwap(false)}> Create Exchange</span>
                    <br/>
                    {swapToken ?
                        <div>
                            <DropdownMenu 
                            setTokenInstance={this.setTokenInstance} 
                            tokenSymbol={tokenSymbol} 
                            />
                            <SwapButton address={address} 
                                exchangeInstance={exchangeInstance} 
                                exchangeAddress={exchangeAddress} 
                                tokenInstance={tokenInstance}
                                tokenSymbol={tokenSymbol}
                            />
                        </div>
                    :
                        <CreateExchange address={address} factoryInstance={factoryInstance}/>
                    }
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {
    setAddress, 
    setBalance,
    toggleWalletConnected,
    setTokenSymbol,
    setTokenAddress,
    createTokenInstance,
    createExchangeInstance,
    setExchangeAddress,
    createFactoryInstance,
    toggleSwapToken
})(Dashboard);