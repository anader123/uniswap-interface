import React, { Component } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default class DropdownMenu extends Component {

    render() {
        const { setTokenInstance, tokenSymbol } = this.props;
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
            </div>
        )
    }
}
