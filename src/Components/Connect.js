import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

export default class Connect extends Component {

    render() {
        const { connectWallet } = this.props;
        return (
            <div>
                <Button onClick={connectWallet} variant="primary">Connect Wallet</Button>
            </div>
        )
    }
}
