import React, { Component } from 'react'
import { onboard, web3 } from '../../utils/onboard';
import { ERC20ABI, factoryABI } from '../../utils/contractABIs';
import { Dropdown, Button, DropdownButton } from 'react-bootstrap';

export default class DropdownMenu extends Component {
    render() {
        const { setTokenInstance, token1Symbol, token2Symbol } = this.props;
        return (
            <div>
                <DropdownButton
                    title={token1Symbol}
                    variant='primary'
                    id='dropdown-variants-Primary'
                    key='Input-Token'
                >
                    <Dropdown.Item onSelect={() => setTokenInstance(0, 1)} eventKey="1">DAI</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(1, 1)} eventKey="2">MKR</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(2, 1)} eventKey="3">REP</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(3, 1)} eventKey="4">USDC</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(4, 1)} eventKey="5">sETH</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(5, 1)} eventKey="5">ETH</Dropdown.Item>
                </DropdownButton>

                <DropdownButton
                    title={token2Symbol}
                    variant='primary'
                    id='dropdown-variants-Primary'
                    key='Output-Token'
                >
                    <Dropdown.Item onSelect={() => setTokenInstance(0, 2)} eventKey="1">DAI</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(1, 2)} eventKey="2">MKR</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(2, 2)} eventKey="3">REP</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(3, 2)} eventKey="4">USDC</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(4, 2)} eventKey="5">sETH</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(5, 1)} eventKey="5">ETH</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }
}
