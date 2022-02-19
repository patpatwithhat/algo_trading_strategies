import { ApiMethod } from '@dydxprotocol/starkex-lib';
import Web3 from 'web3';
import { SignEthPrivateAction } from '../eth-signing';
import { ApiKeyCredentials, Data, PositionResponseObject, SigningMethod } from '../types';
import Clock from './clock';
export default class EthPrivate {
    readonly host: string;
    readonly signer: SignEthPrivateAction;
    readonly clock: Clock;
    constructor({ host, web3, networkId, clock, }: {
        host: string;
        web3: Web3;
        networkId: number;
        clock: Clock;
    });
    protected request(method: ApiMethod, endpoint: string, ethereumAddress: string, signingMethod: SigningMethod, data?: {}): Promise<Data>;
    protected post(endpoint: string, ethereumAddress: string, signingMethod?: SigningMethod): Promise<Data>;
    protected delete(endpoint: string, ethereumAddress: string, signingMethod: SigningMethod | undefined, params: {}): Promise<Data>;
    protected get(endpoint: string, ethereumAddress: string, signingMethod?: SigningMethod): Promise<Data>;
    /**
     * @description have an auto-generated apikey, secret and passphrase generated
     * for an ethereumAddress.
     * @param ethereumAddress the apiKey will be for
     * @param signingMethod used to validate the request
     */
    createApiKey(ethereumAddress: string, signingMethod?: SigningMethod): Promise<{
        apiKey: ApiKeyCredentials;
    }>;
    /**
     *
     * @param apiKey to be deleted
     * @param ethereumAddress the apiKey is for
     * @param signingMethod used to validate the request
     */
    deleteApiKey(apiKey: string, ethereumAddress: string, signingMethod?: SigningMethod): Promise<void>;
    /**
     * @description This is for if you can't recover your starkKey or apiKey and need an
     * additional way to get your starkKey, positionid and balance on our exchange,
     *  all of which are needed to call the L1 solidity function needed to recover your funds.
     *
     * @param ethereumAddress the recovery is for
     * @param signingMethod used to validate the request
     */
    recovery(ethereumAddress: string, signingMethod?: SigningMethod): Promise<{
        starkKey: string;
        positionId: string;
        equity: string;
        freeCollateral: string;
        quoteBalance: string;
        positions: PositionResponseObject[];
    }>;
}
