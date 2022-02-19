"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = void 0;
const es6_promisify_1 = require("es6-promisify");
const web3_1 = __importDefault(require("web3"));
const types_1 = require("../types");
const helpers_1 = require("./helpers");
class Signer {
    // ============ Constructor ============
    constructor(web3) {
        this.web3 = web3;
    }
    // ============ Functions ============
    /**
     * Returns a signable EIP712 Hash of a struct
     */
    getEIP712Hash(structHash) {
        const hash = web3_1.default.utils.soliditySha3({ t: 'bytes2', v: '0x1901' }, { t: 'bytes32', v: this.getDomainHash() }, { t: 'bytes32', v: structHash });
        // Non-null assertion operator is safe, hash is null only on empty input.
        return hash;
    }
    async ethSignTypedDataInternal(signer, data, signingMethod) {
        let rpcMethod;
        let rpcData;
        let provider = this.web3.currentProvider;
        if (provider === null) {
            throw new Error('Cannot sign since Web3 currentProvider is null');
        }
        if (typeof provider === 'string') {
            throw new Error('Cannot sign since Web3 currentProvider is a string');
        }
        provider = provider;
        let sendAsync;
        switch (signingMethod) {
            case types_1.SigningMethod.TypedData:
                sendAsync = es6_promisify_1.promisify(provider.send).bind(provider);
                rpcMethod = 'eth_signTypedData';
                rpcData = data;
                break;
            case types_1.SigningMethod.MetaMask:
                sendAsync = es6_promisify_1.promisify(provider.sendAsync).bind(provider);
                rpcMethod = 'eth_signTypedData_v3';
                rpcData = JSON.stringify(data);
                break;
            case types_1.SigningMethod.MetaMaskLatest:
                sendAsync = es6_promisify_1.promisify(provider.sendAsync).bind(provider);
                rpcMethod = 'eth_signTypedData_v4';
                rpcData = JSON.stringify(data);
                break;
            case types_1.SigningMethod.CoinbaseWallet:
                sendAsync = es6_promisify_1.promisify(provider.sendAsync).bind(provider);
                rpcMethod = 'eth_signTypedData_v4';
                rpcData = data;
                break;
            default:
                throw new Error(`Invalid signing method ${signingMethod}`);
        }
        const response = await sendAsync({
            method: rpcMethod,
            params: [signer, rpcData],
            jsonrpc: '2.0',
            id: Date.now(),
        });
        if (response.error) {
            throw new Error(response.error.message);
        }
        return `0x${helpers_1.stripHexPrefix(response.result)}0${types_1.SignatureTypes.NO_PREPEND}`;
    }
    /**
     * Sign a message with `personal_sign`.
     */
    async ethSignPersonalInternal(signer, message) {
        let provider = this.web3.currentProvider;
        if (provider === null) {
            throw new Error('Cannot sign since Web3 currentProvider is null');
        }
        if (typeof provider === 'string') {
            throw new Error('Cannot sign since Web3 currentProvider is a string');
        }
        provider = provider;
        const sendAsync = (es6_promisify_1.promisify(provider.sendAsync || provider.send).bind(provider));
        const rpcMethod = 'personal_sign';
        const response = await sendAsync({
            method: rpcMethod,
            params: [signer, message],
            jsonrpc: '2.0',
            id: Date.now(),
        });
        if (response.error) {
            throw new Error(response.error.message);
        }
        // Note: Using createTypedSignature() fixes the signature `v` value.
        return helpers_1.createTypedSignature(response.result, types_1.SignatureTypes.PERSONAL);
    }
}
exports.Signer = Signer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V0aC1zaWduaW5nL3NpZ25lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxpREFBMEM7QUFDMUMsZ0RBQXdCO0FBT3hCLG9DQUdrQjtBQUNsQix1Q0FBaUU7QUFFakUsTUFBc0IsTUFBTTtJQUcxQix3Q0FBd0M7SUFFeEMsWUFDRSxJQUFVO1FBRVYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELHNDQUFzQztJQUV0Qzs7T0FFRztJQUNJLGFBQWEsQ0FDbEIsVUFBa0I7UUFFbEIsTUFBTSxJQUFJLEdBQWtCLGNBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUNqRCxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUM1QixFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQVksRUFBRSxFQUNuRCxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUNoQyxDQUFDO1FBQ0YseUVBQXlFO1FBQ3pFLE9BQU8sSUFBSyxDQUFDO0lBQ2YsQ0FBQztJQU9TLEtBQUssQ0FBQyx3QkFBd0IsQ0FDdEMsTUFBYyxFQUNkLElBQVEsRUFDUixhQUE0QjtRQUU1QixJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxPQUFXLENBQUM7UUFFaEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDekMsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztTQUN2RTtRQUNE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