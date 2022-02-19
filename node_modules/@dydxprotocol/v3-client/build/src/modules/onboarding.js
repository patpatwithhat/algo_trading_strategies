"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const starkex_lib_1 = require("@dydxprotocol/starkex-lib");
const eth_signing_1 = require("../eth-signing");
const helpers_1 = require("../eth-signing/helpers");
const request_helpers_1 = require("../helpers/request-helpers");
const axios_1 = require("../lib/axios");
const types_1 = require("../types");
const KEY_DERIVATION_SUPPORTED_SIGNING_METHODS = [
    types_1.SigningMethod.TypedData,
    types_1.SigningMethod.MetaMask,
    types_1.SigningMethod.MetaMaskLatest,
    types_1.SigningMethod.CoinbaseWallet,
    types_1.SigningMethod.Personal,
];
class Onboarding {
    constructor(host, web3, networkId) {
        this.host = host;
        this.networkId = networkId;
        this.signer = new eth_signing_1.SignOnboardingAction(web3, networkId);
    }
    // ============ Request Helpers ============
    async post(endpoint, data, ethereumAddress, signature = null, signingMethod = types_1.SigningMethod.TypedData) {
        const message = { action: types_1.OnboardingActionString.ONBOARDING };
        // On mainnet, include an extra onlySignOn parameter.
        if (this.networkId === 1) {
            message.onlySignOn = 'https://trade.dydx.exchange';
        }
        const url = `/v3/${endpoint}`;
        return axios_1.axiosRequest({
            url: `${this.host}${url}`,
            method: axios_1.RequestMethod.POST,
            data,
            headers: {
                'DYDX-SIGNATURE': signature || await this.signer.sign(ethereumAddress, signingMethod, message),
                'DYDX-ETHEREUM-ADDRESS': ethereumAddress,
            },
        });
    }
    // ============ Requests ============
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
    async createUser(params, ethereumAddress, signature = null, signingMethod) {
        return this.post('onboarding', params, ethereumAddress, signature, signingMethod);
    }
    // ============ Key Derivation ============
    /**
     * @description Derive a STARK key pair deterministically from an Ethereum key.
     *
     * This is used by the frontend app to derive the STARK key pair in a way that is recoverable.
     * Programmatic traders may optionally derive their STARK key pair in the same way.
     *
     * @param ethereumAddress Ethereum address of the account to use for signing.
     * @param signingMethod Method to use for signing.
     */
    async deriveStarkKey(ethereumAddress, signingMethod = types_1.SigningMethod.TypedData) {
        if (!KEY_DERIVATION_SUPPORTED_SIGNING_METHODS.includes(signingMethod)) {
            throw new Error('Unsupported signing method for API key derivation');
        }
        const message = { action: types_1.OnboardingActionString.KEY_DERIVATION };
        // On mainnet, include an extra onlySignOn parameter.
        if (this.networkId === 1) {
            message.onlySignOn = 'https://trade.dydx.exchange';
        }
        const signature = await this.signer.sign(ethereumAddress, signingMethod, message);
        return starkex_lib_1.keyPairFromData(Buffer.from(helpers_1.stripHexPrefix(signature), 'hex'));
    }
    /**
     * @description Derive an API key pair deterministically from an Ethereum key.
     *
     * This is used by the frontend app to recover the default API key credentials.
     *
     * @param ethereumAddress Ethereum address of the account to use for signing.
     * @param signingMethod Method to use for signing.
     */
    async recoverDefaultApiCredentials(ethereumAddress, signingMethod = types_1.SigningMethod.TypedData) {
        if (!KEY_DERIVATION_SUPPORTED_SIGNING_METHODS.includes(signingMethod)) {
            throw new Error('Unsupported signing method for API key derivation');
        }
        const message = { action: types_1.OnboardingActionString.ONBOARDING };
        // On mainnet, include an extra onlySignOn parameter.
        if (this.networkId === 1) {
            message.onlySignOn = 'https://trade.dydx.exchange';
        }
        const signature = await this.signer.sign(ethereumAddress, signingMethod, message);
        const buffer = Buffer.from(helpers_1.stripHexPrefix(signature), 'hex');
        // Get secret.
        const rBuffer = buffer.slice(0, 32);
        const rHashedData = request_helpers_1.keccak256Buffer(rBuffer);
        const secret = rHashedData.slice(0, 30);
        // Get key and passphrase.
        const sBuffer = buffer.slice(32, 64);
        const sHashedData = request_helpers_1.keccak256Buffer(sBuffer);
        const key = sHashedData.slice(0, 16);
        const passphrase = sHashedData.slice(16, 31);
        return {
            secret: toBase64Url(secret),
            key: uuidFormatKey(key),
            passphrase: toBase64Url(passphrase),
        };
    }
}
exports.default = Onboarding;
function uuidFormatKey(keyBuffer) {
    const key = keyBuffer.toString('hex');
    return [
        key.slice(0, 8),
        key.slice(8, 12),
        key.slice(12, 16),
        key.slice(16, 20),
        key.slice(20, 32),
    ].join('-');
}
function toBase64Url(base64) {
    return base64.toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25ib2FyZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL29uYm9hcmRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFHbUM7QUFHbkMsZ0RBQXNEO0FBQ3RELG9EQUF3RDtBQUN4RCxnRUFBNkQ7QUFDN0Qsd0NBR3NCO0FBQ3RCLG9DQVNrQjtBQUVsQixNQUFNLHdDQUF3QyxHQUFvQjtJQUNoRSxxQkFBYSxDQUFDLFNBQVM7SUFDdkIscUJBQWEsQ0FBQyxRQUFRO0lBQ3RCLHFCQUFhLENBQUMsY0FBYztJQUM1QixxQkFBYSxDQUFDLGNBQWM7SUFDNUIscUJBQWEsQ0FBQyxRQUFRO0NBQ3ZCLENBQUM7QUFFRixNQUFxQixVQUFVO0lBSzdCLFlBQ0UsSUFBWSxFQUNaLElBQVUsRUFDVixTQUFpQjtRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQW9CLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCw0Q0FBNEM7SUFFbEMsS0FBSyxDQUFDLElBQUksQ0FDbEIsUUFBZ0IsRUFDaEIsSUFBUSxFQUNSLGVBQXVCLEVBQ3ZCLFlBQTJCLElBQUksRUFDL0IsZ0JBQStCLHFCQUFhLENBQUMsU0FBUztRQUV0RCxNQUFNLE9BQU8sR0FBcUIsRUFBRSxNQUFNLEVBQUUsOEJBQXNCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFaEYscURBQXFEO1FBQ3JELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxDQUFDLFVBQVUsR0FBRyw2QkFBNkIsQ0FBQztTQUNwRDtRQUVELE1BQU0sR0FBRyxHQUFXLE9BQU8sUUFBUSxFQUFFLENBQUM7UUFDdEMsT0FBTyxvQkFBWSxDQUFDO1lBQ2xCLEdBQUcs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