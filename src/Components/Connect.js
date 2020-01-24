import React, { Component } from 'react'
import { onboard, web3 } from '../utils/onboard';
import { ERC20ABI, factoryABI } from '../utils/contractABIs';
import { Button } from 'react-bootstrap';
import { tokenData } from '../utils/tokenData';
import DropdownMenu from '../Components/DropdownMenu/DropdownMenu';


export default class Connect extends Component {
    constructor() {
        super();

        this.state = {
            address: '',
            balance: '',
            tokenInstance: {},
            walletConnected: false
        }
    }

    connectWallet = async () => {
        const result = await onboard.walletSelect();
        if(result) {
            await onboard.walletCheck();
            const currentState = await onboard.getState();
            console.log(currentState);
            const weiBalance = await web3.eth.getBalance(currentState.address);
            const balance = web3.utils.fromWei(weiBalance);
            this.setState({
                address: currentState.address,
                balance,
                walletConnected: true
            });
        }
    }

    setTokenInstance = (token) => {
        const tokenAddress = tokenData[token].address;
        console.log(tokenAddress);
        const tokenInstance = new web3.eth.Contract(ERC20ABI, tokenAddress);
        this.setState({ tokenInstance });
    }

    render() {
        const { walletConnected, address, balance } = this.state;
        return (
            <div>
                <div>{address}</div>
                <div>{balance}</div>
                {!walletConnected ?
                <Button onClick={this.connectWallet} variant="primary">Connect Wallet</Button>
                :
                <DropdownMenu setTokenInstance={this.setTokenInstance} />
                }
            </div>
        )
    }
}
