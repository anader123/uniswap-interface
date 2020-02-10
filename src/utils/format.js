import BigNumber from 'bignumber.js';

BigNumber.config({ DECIMAL_PLACES: 3 });

export const formatTokenValue = async (value, tokenContract) => {
    const decimals = await tokenContract.methods.decimals().call()
    const bn = new BigNumber(value);
    
    return bn.shiftedBy(-decimals).toString(10);
};