import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { web3 } from '../../utils/onboard';

export default class SwapButton extends Component {
    constructor() {
        super();
        this.state = {
            weiAmount: '',
            outputAmount: ''
        }
    }

    swapToken = () => {
        const { exchangeInstance, address } = this.props;
        const { weiAmount } = this.state;

        let deadline = new Date().getTime() + 600000;
        const min_tokens = 1;
        exchangeInstance.methods.ethToTokenSwapInput(min_tokens, deadline).send({ from: address, value: weiAmount})
    }

    handleInput = async (ethAmount) => {
        const { tokenInstance, exchangeAddress } = this.props;
        if(ethAmount !== '') {
            const weiAmount = web3.utils.toWei(ethAmount);

            // Sell ETH for ERC20
            const inputAmount = weiAmount;
            const inputReserve = await web3.eth.getBalance(exchangeAddress);
            const outputReserve = await tokenInstance.methods.balanceOf(exchangeAddress).call();

            // Output amount bought
            const numerator = inputAmount * outputReserve * 997;
            const denominator = inputReserve * 1000 + inputAmount * 997;
            const outputAmount = numerator / denominator;

            console.log(inputReserve, outputReserve)
            const formattedOutpuAmount = web3.utils.fromWei(outputAmount.toString());
            this.setState({ weiAmount, outputAmount: formattedOutpuAmount });
        }
    }
    
    render() {
        return (
            <div>
                <input type='number' placeholder='Enter Eth Amount' onChange={(event) => this.handleInput(event.target.value)}/>
                <br/>
                <Button onClick={this.swapToken}>Swap</Button>
                <p>You will receive {this.state.outputAmount}</p>
            </div>
        )
    }
}
