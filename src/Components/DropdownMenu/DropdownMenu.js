import React, { Component } from 'react'
import { onboard, web3 } from '../../utils/onboard';
import { ERC20ABI, factoryABI } from '../../utils/contractABIs';
import { Dropdown, Button, DropdownButton } from 'react-bootstrap';

export default class DropdownMenu extends Component {
    render() {
        const { setTokenInstance } = this.props;
        return (
            <div>
                <DropdownButton
                    title='Primary'
                    variant='primary'
                    id='dropdown-variants-Primary'
                    key='Primary'
                >
                    <Dropdown.Item eventKey="1">DAI</Dropdown.Item>
                    <Dropdown.Item eventKey="2">MKR</Dropdown.Item>
                    <Dropdown.Item eventKey="3">REP</Dropdown.Item>
                    <Dropdown.Item eventKey="5">USDC</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setTokenInstance(4)} eventKey="4">sETH</Dropdown.Item>
                    <Dropdown.Item eventKey="6">SNX</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }
}
