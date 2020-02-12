// Initial State
const initialState = {
    address: '',
    balance: '',
    tokenSymbol: 'DAI',
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    factoryAddress: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
    exchangeAddress: '',
    tokenInstance: {},
    exchangeInstance: {},
    factoryInstance: {},
    walletConnected: false,
    swapToken: true,
}

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

// Reducer
export default function reducer(state = initialState, action) {
    console.log(action)
    switch(action.type) {
        case SET_ADDRESS:
            return {...state, address: action.payload};
        case SET_BALANCE:
            return {...state, balance: action.payload};
        case SET_TOKEN_SYMBOL:
            return {...state, tokenSymbol: action.payload};
        case SET_TOKEN_ADDRESS:
            return {...state, tokenAddress: action.payload};
        case SET_EXCHANGE_ADDRESS:
            return {...state, exchangeAddress: action.payload};
        case CREATE_TOKEN_INSTANCE:
            return {...state, tokenInstance: action.payload};
        case CREATE_EXCHANGE_INSTANCE:
            return {...state, exchangeInstance: action.payload};
        case CREATE_FACTORY_INSTANCE:
            return {...state, factoryInstance: action.payload};
        case TOGGLE_WALLET_CONNECTED:
            return {...state, walletConnected: action.payload};
        case TOGGLE_SWAP_TOKEN:
            return {...state, walletConnected: action.payload};
        default:
            return state;
    }
}