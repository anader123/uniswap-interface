import React, { Component } from 'react'

export default class CreateExchange extends Component {

    constructor() {
        super();

        this.state = {
            tokenExists: false,
            tokenAddress: ''
        }
    }

    handleInput = async (tokenAddress) => {
        const { factoryInstance } = this.props;

        if(tokenAddress.length === 42) {
            const address = await factoryInstance.methods.getExchange(tokenAddress).call();
            if(address !== '0x0000000000000000000000000000000000000000') {
                this.setState({ tokenExists: true});
            }
            else {
                this.setState({ tokenExists: false});
            }
        }
        else {
            this.setState({ tokenExists: false});
        }

        this.setState({ tokenAddress });
    }

    callCreateExchange = async (tokenAddress) => {
        const { factoryInstance, address } = this.props;

        if(tokenAddress !== '') {
            factoryInstance.methods.createExchange(tokenAddress).send({ from: address});
        }
    }

    render() {
        const { tokenExists, tokenAddress } = this.state;
        return (
            <div>
                <h2>Create an Exchange</h2>
                <label>Input the address of a token you would like to create a Uniswap Pool for</label>
                <br></br>
                <input type='text' value={tokenAddress} onChange={(event) => this.handleInput(event.target.value)}/>
                {tokenExists?<div>That token already has a pool</div>:<div/>}
                <button onClick={() => this.callCreateExchange(tokenAddress)} disabled={tokenExists}>Create</button>
            </div>
        )
    }
}
