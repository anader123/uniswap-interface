import React, { Component } from 'react'
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';

// Ethereum
import { web3 } from '../../utils/onboard';
import { formatTokenValue } from '../../utils/format'

// Redux
import { connect } from 'react-redux';
import {
    setOutputAmount,
    setWeiAmount
} from '../../redux/actions';

class DropdownMenu extends Component {
    constructor() {
        super();

        this.state = { min_tokens: 0 }
    }

    swapToken = () => {
        const { exchangeInstance, address, weiAmount } = this.props;
        const { min_tokens } = this.state;

        let deadline = new Date().getTime() + 50000;
        exchangeInstance.methods.ethToTokenSwapInput(min_tokens, deadline).send({ from: address, value: weiAmount})
    }

    handleInput = async (ethAmount) => {
        const { tokenInstance, exchangeAddress, setOutputAmount, setWeiAmount } = this.props;
        if(ethAmount === '') {
            ethAmount = '0';
        }
            const weiAmount = web3.utils.toWei(ethAmount);

            // Sell ETH for ERC20
            const inputAmount = weiAmount;
            const inputReserve = await web3.eth.getBalance(exchangeAddress);

            const outputReserve = await tokenInstance.methods.balanceOf(exchangeAddress).call();

            // Output amount bought
            const numerator = inputAmount * outputReserve * 997;
            const denominator = inputReserve * 1000 + inputAmount * 997;
            const outputAmount = numerator / denominator;

            const formattedOutpuAmount = await formatTokenValue(outputAmount, tokenInstance);

            const min_tokens = (outputAmount * 0.75);
            this.setState({ min_tokens })
            // Redux 
            setOutputAmount(formattedOutpuAmount);
            setWeiAmount(weiAmount);
    }

    render() {
        const { setTokenInstance, tokenSymbol, outputAmount } = this.props;
        return (
            <div>
                <h4>Select a token to swap for Ether</h4>
                <br/>
                <DropdownButton
                    title={tokenSymbol}
                    variant='primary'
                    id='dropdown-variants-Primary'
                    key='Input-Token'
                >
                    <Dropdown.Item onSelect={() => setTokenInstance(0)} eventKey="1">DAI</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(1)} eventKey="2">MKR</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(2)} eventKey="3">REP</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(3)} eventKey="4">USDC</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(4)} eventKey="5">sETH</Dropdown.Item>
                </DropdownButton>
                <br/>

                <div>
                    <input type='number' placeholder='Enter Eth Amount' onChange={(event) => this.handleInput(event.target.value)}/>
                    <br/>
                    <Button onClick={this.swapToken}>Swap</Button>
                    <p>You will receive approximately {outputAmount} {tokenSymbol}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {
    setOutputAmount,
    setWeiAmount
})(DropdownMenu);