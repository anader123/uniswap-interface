import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { web3 } from '../../utils/onboard';

export default class SwapButton extends Component {
    constructor() {
        super();
        this.state = {
            weiAmount: ''
        }
    }

    swapToken = () => {
        const { exchangeInstance, address } = this.props;
        const { weiAmount } = this.state;

        let deadline = new Date().getTime() + 600000;
        const min_tokens = 1;
        exchangeInstance.methods.ethToTokenSwapInput(min_tokens, deadline).send({ from: address, value: weiAmount})
        console.log(exchangeInstance.methods.ethToTokenSwapInput)
    }

    handleInput = (ethAmount) => {
        if(ethAmount !== '') {
            const weiAmount = web3.utils.toWei(ethAmount);
            this.setState({ weiAmount });
        }
    }
    
    render() {
        return (
            <div>
                <input type='number' placeholder='Enter Eth Amount' onChange={(event) => this.handleInput(event.target.value)}/>
                <Button onClick={this.swapToken}>Swap</Button>
            </div>
        )
    }
}
