// Action Types
const SET_ADDRESS = 'SET_ADDRESS';
const SET_BALANCE = 'SET_BALANCE';
const SET_TOKEN_SYMBOL = 'SET_TOKEN_SYMBOL';
const SET_TOKEN_ADDRESS = 'SET_TOKEN_ADDRESS';
const SET_EXCHANGE_ADDRESS = 'SET_EXCHANGE_ADDRESS';
const CREATE_TOKEN_INSTANCE = 'CREATE_TOKEN_INSTANCE';
const CREATE_EXCHANGE_INSTANCE = 'CREATE_EXCHANGE_INSTANCE';
const CREATE_FACTORY_INSTANCE = 'CREATE_FACTORY_INSTANCE';
const TOGGLE_WALLET_CONNECTED = 'TOGGLE_WALLET_CONNECTED';
const TOGGLE_SWAP_TOKEN = 'TOGGLE_SWAP_TOKEN';

// Action Builders 
export const setAddress = (address) => {
    return {
        type: SET_ADDRESS, 
        payload: address
    }
}

export const setBalance = (balance) => {
    return {
        type: SET_BALANCE, 
        payload: balance
    }
}

export const setTokenSymbol = (symbol) => {
    return {
        type: SET_TOKEN_SYMBOL, 
        payload: symbol
    }
}

export const setTokenAddress = (address) => {
    return {
        type: SET_TOKEN_ADDRESS, 
        payload: address
    }
}

export const setExchangeAddress = (address) => {
    return {
        type: SET_EXCHANGE_ADDRESS, 
        payload: address
    }
}

export const createTokenInstance = (token) => {
    return {
        type: CREATE_TOKEN_INSTANCE, 
        payload: token
    }
}

export const createExchangeInstance = (exchange) => {
    return {
        type: CREATE_EXCHANGE_INSTANCE, 
        payload: exchange
    }
}

export const createFactoryInstance = (factory) => {
    return {
        type: CREATE_FACTORY_INSTANCE, 
        payload: factory
    }
}

export const toggleWalletConnected = (bool) => {
    return {
        type: TOGGLE_WALLET_CONNECTED, 
        payload: bool
    }
}

export const toggleSwapToken = (bool) => {
    return {
        type: TOGGLE_SWAP_TOKEN, 
        payload: bool
    }
}