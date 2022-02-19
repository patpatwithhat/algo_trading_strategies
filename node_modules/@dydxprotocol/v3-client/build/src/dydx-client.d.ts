import { StarkwareLib } from '@dydxprotocol/starkex-eth';
import { KeyPair } from '@dydxprotocol/starkex-lib';
import Web3 from 'web3';
import Clock from './modules/clock';
import EthPrivate from './modules/eth-private';
import Onboarding from './modules/onboarding';
import Private from './modules/private';
import Public from './modules/public';
import { ApiKeyCredentials, EthereumSendOptions, Provider } from './types';
export interface ClientOptions {
    apiTimeout?: number;
    ethSendOptions?: EthereumSendOptions;
    networkId?: number;
    starkPrivateKey?: string | KeyPair;
    web3?: Web3;
    web3Provider?: string | Provider;
    apiKeyCredentials?: ApiKeyCredentials;
    timestampAdjustment?: number;
}
export declare class DydxClient {
    readonly host: string;
    readonly apiTimeout?: number;
    readonly ethSendOptions?: EthereumSendOptions;
    readonly networkId: number;
    readonly starkPrivateKey?: string | KeyPair;
    readonly web3?: Web3;
    apiKeyCredentials?: ApiKeyCredentials;
    private readonly _public;
    private readonly _clock;
    private _private?;
    private _ethPrivate?;
    private _onboarding?;
    private _eth?;
    constructor(host: string, options?: ClientOptions);
    /**
     * Get the public module, used for interacting with public endpoints.
     */
    get public(): Public;
    /**
     * Get the clock module, used for adjusting system time to server time.
     */
    get clock(): Clock;
    /**
     * Get the private module, used for interacting with endpoints that require API-key auth.
     */
    get private(): Private;
    /**
     * Get the keys module, used for managing API keys. Requires Ethereum key auth.
     */
    get ethPrivate(): EthPrivate;
    /**
     * Get the onboarding module, used to create a new user. Requires Ethereum key auth.
     */
    get onboarding(): Onboarding;
    /**
     * Get the eth module, used for interacting with Ethereum smart contracts.
     */
    get eth(): StarkwareLib;
}
