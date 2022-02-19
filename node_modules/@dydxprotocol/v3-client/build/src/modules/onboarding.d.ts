import { KeyPairWithYCoordinate } from '@dydxprotocol/starkex-lib';
import Web3 from 'web3';
import { SignOnboardingAction } from '../eth-signing';
import { AccountResponseObject, ApiKeyCredentials, Data, ISO31661ALPHA2, SigningMethod, UserResponseObject } from '../types';
export default class Onboarding {
    readonly host: string;
    readonly networkId: number;
    readonly signer: SignOnboardingAction;
    constructor(host: string, web3: Web3, networkId: number);
    protected post(endpoint: string, data: {}, ethereumAddress: string, signature?: string | null, signingMethod?: SigningMethod): Promise<Data>;
    /**
     * @description create a user, account and apiKey in one onboarding request
     *
     * @param {
     * @starkKey is the unique public key for starkwareLib operations used in the future
     * @starkKeyYCoordinate is the Y Coordinate of the unique public key for starkwareLib
     * operations used in the future
     * }
     * @param ethereumAddress of the account
     * @param signature validating the request
     * @param signingMethod for the request
     * @param referredByAffiliateLink of affiliate who referred the user
     * @param country for the user (ISO 3166-1 Alpha-2 Compliant)
     */
    createUser(params: {
        starkKey: string;
        starkKeyYCoordinate: string;
        referredByAffiliateLink?: string;
        country?: ISO31661ALPHA2;
    }, ethereumAddress: string, signature?: string | null, signingMethod?: SigningMethod): Promise<{
        apiKey: ApiKeyCredentials;
        user: UserResponseObject;
        account: AccountResponseObject;
    }>;
    /**
     * @description Derive a STARK key pair deterministically from an Ethereum key.
     *
     * This is used by the frontend app to derive the STARK key pair in a way that is recoverable.
     * Programmatic traders may optionally derive their STARK key pair in the same way.
     *
     * @param ethereumAddress Ethereum address of the account to use for signing.
     * @param signingMethod Method to use for signing.
     */
    deriveStarkKey(ethereumAddress: string, signingMethod?: SigningMethod): Promise<KeyPairWithYCoordinate>;
    /**
     * @description Derive an API key pair deterministically from an Ethereum key.
     *
     * This is used by the frontend app to recover the default API key credentials.
     *
     * @param ethereumAddress Ethereum address of the account to use for signing.
     * @param signingMethod Method to use for signing.
     */
    recoverDefaultApiCredentials(ethereumAddress: string, signingMethod?: SigningMethod): Promise<ApiKeyCredentials>;
}
