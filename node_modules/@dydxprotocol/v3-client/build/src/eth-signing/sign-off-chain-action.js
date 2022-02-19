"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOffChainAction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ethers = __importStar(require("ethers"));
const lodash_1 = __importDefault(require("lodash"));
const web3_1 = __importDefault(require("web3"));
const types_1 = require("../types");
const helpers_1 = require("./helpers");
const signer_1 = require("./signer");
// IMPORTANT: The order of these params affects the message signed with SigningMethod.PERSONAL.
//            The message should not be changed at all since it's used to generated default keys.
const PERSONAL_SIGN_DOMAIN_PARAMS = ['name', 'version', 'chainId'];
class SignOffChainAction extends signer_1.Signer {
    constructor(web3, networkId, actionStruct, { domain = 'dYdX', version = '1.0', } = {}) {
        super(web3);
        this.networkId = networkId;
        this.actionStruct = actionStruct;
        this.domain = domain;
        this.version = version;
    }
    async sign(signer, signingMethod, message) {
        // If the address is in the wallet, sign with it so we don't have to use the web3 provider.
        const walletAccount = (
        // Hack: The TypeScript type incorrectly has index signature on number but not string.
        this.web3.eth.accounts.wallet[signer]);
        switch (signingMethod) {
            case types_1.SigningMethod.Hash:
            case types_1.SigningMethod.UnsafeHash:
            case types_1.SigningMethod.Compatibility: {
                const hash = this.getHash(message);
                const rawSignature = walletAccount
                    ? walletAccount.sign(hash).signature
                    : await this.web3.eth.sign(hash, signer);
                const hashSig = helpers_1.createTypedSignature(rawSignature, types_1.SignatureTypes.DECIMAL);
                if (signingMethod === types_1.SigningMethod.Hash) {
                    return hashSig;
                }
                const unsafeHashSig = helpers_1.createTypedSignature(rawSignature, types_1.SignatureTypes.NO_PREPEND);
                if (signingMethod === types_1.SigningMethod.UnsafeHash) {
                    return unsafeHashSig;
                }
                if (this.verify(unsafeHashSig, signer, message)) {
                    return unsafeHashSig;
                }
                return hashSig;
            }
            // @ts-ignore Fallthrough case in switch.
            case types_1.SigningMethod.TypedData:
                // If the private key is available locally, sign locally without using web3.
                if (walletAccount === null || walletAccount === void 0 ? void 0 : walletAccount.privateKey) {
                    const wallet = new ethers.Wallet(walletAccount.privateKey);
                    const rawSignature = await wallet._signTypedData(this.getDomainData(), { [this.domain]: this.actionStruct }, message);
                    return helpers_1.createTypedSignature(rawSignature, types_1.SignatureTypes.NO_PREPEND);
                }
            /* falls through */
            case types_1.SigningMethod.MetaMask:
            case types_1.SigningMethod.MetaMaskLatest:
            case types_1.SigningMethod.CoinbaseWallet: {
                const data = {
                    types: {
                        EIP712Domain: helpers_1.EIP712_DOMAIN_STRUCT_NO_CONTRACT,
                        [this.domain]: this.actionStruct,
                    },
                    domain: this.getDomainData(),
                    primaryType: this.domain,
                    message,
                };
                return this.ethSignTypedDataInternal(signer, data, signingMethod);
            }
            case types_1.SigningMethod.Personal: {
                const messageString = this.getPersonalSignMessage(message);
                return this.ethSignPersonalInternal(signer, messageString);
            }
            default:
                throw new Error(`Invalid signing method ${signingMethod}`);
        }
    }
    verify(typedSignature, expectedSigner, message) {
        if (helpers_1.stripHexPrefix(typedSignature).length !== 66 * 2) {
            throw new Error(`Unable to verify signature with invalid length: ${typedSignature}`);
        }
        const sigType = parseInt(typedSignature.slice(-2), 16);
        let hashOrMessage;
        switch (sigType) {
            case types_1.SignatureTypes.NO_PREPEND:
            case types_1.SignatureTypes.DECIMAL:
            case types_1.SignatureTypes.HEXADECIMAL:
                hashOrMessage = this.getHash(message);
                break;
            case types_1.SignatureTypes.PERSONAL:
                hashOrMessage = this.getPersonalSignMessage(message);
                break;
            default:
                throw new Error(`Invalid signature type: ${sigType}`);
        }
        const signer = helpers_1.ecRecoverTypedSignature(hashOrMessage, typedSignature);
        return helpers_1.addressesAreEqual(signer, expectedSigner);
    }
    /**
     * Get the message string to be signed when using SignatureTypes.PERSONAL.
     *
     * This signing method may be used in cases where EIP-712 signing is not possible.
     */
    getPersonalSignMessage(message) {
        // Make sure the output is deterministic for a given input.
        return JSON.stringify({
            ...lodash_1.default.pick(this.getDomainData(), PERSONAL_SIGN_DOMAIN_PARAMS),
            ...lodash_1.default.pick(message, lodash_1.default.keys(message).sort()),
        }, null, 2);
    }
    getDomainHash() {
        const hash = web3_1.default.utils.soliditySha3({ t: 'bytes32', v: helpers_1.hashString(helpers_1.EIP712_DOMAIN_STRING_NO_CONTRACT) }, { t: 'bytes32', v: helpers_1.hashString(this.domain) }, { t: 'bytes32', v: helpers_1.hashString(this.version) }, { t: 'uint256', v: new bignumber_js_1.default(this.networkId).toFixed(0) });
        // Non-null assertion operator is safe, hash is null only on empty input.
        return hash;
    }
    getDomainData() {
        return {
            name: this.domain,
            version: this.version,
            chainId: this.networkId,
        };
    }
}
exports.SignOffChainAction = SignOffChainAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1vZmYtY2hhaW4tYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V0aC1zaWduaW5nL3NpZ24tb2ZmLWNoYWluLWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXFDO0FBQ3JDLCtDQUFpQztBQUNqQyxvREFBdUI7QUFDdkIsZ0RBQXdCO0FBRXhCLG9DQUtrQjtBQUNsQix1Q0FRbUI7QUFDbkIscUNBQWtDO0FBRWxDLCtGQUErRjtBQUMvRixpR0FBaUc7QUFDakcsTUFBTSwyQkFBMkIsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFPbkUsTUFBc0Isa0JBQWlDLFNBQVEsZUFBTTtJQU1uRSxZQUNFLElBQVUsRUFDVixTQUFpQixFQUNqQixZQUEwQixFQUMxQixFQUNFLE1BQU0sR0FBRyxNQUFNLEVBQ2YsT0FBTyxHQUFHLEtBQUssTUFJYixFQUFFO1FBRU4sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUlNLEtBQUssQ0FBQyxJQUFJLENBQ2YsTUFBYyxFQUNkLGFBQTRCLEVBQzVCLE9BQVU7UUFFViwyRkFBMkY7UUFDM0YsTUFBTSxhQUFhLEdBQWdDO1FBQ2pELHNGQUFzRjtRQUN0RixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQTJCLENBQUMsQ0FDM0QsQ0FBQztRQUVGLFFBQVEsYUFBYSxFQUFFO1lBQ3JCLEtBQUsscUJBQWEsQ0FBQyxJQUFJLENBQUM7WUFDeEIsS0FB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