"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const starkex_lib_1 = require("@dydxprotocol/starkex-lib");
const web3_1 = __importDefault(require("web3"));
const eth_signing_1 = require("../../src/eth-signing");
const types_1 = require("../../src/types");
// DEFAULT GANACHE ACCOUNT FOR TESTING ONLY -- DO NOT USE IN PRODUCTION.
const GANACHE_ADDRESS = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
const GANACHE_PRIVATE_KEY = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
// Note that this is the signature for SigningMethod.TypedData, but not SigningMethod.Hash.
const EXPECTED_SIGNATURE = ('0x3ec5317783b313b0acac1f13a23eaaa2fca1f45c2f395081e9bfc20b4cc1acb17e' +
    '3d755764f37bf13fa62565c9cb50475e0a987ab0afa74efde0b3926bb7ab9d1b00');
const mockRequestNoBody = {
    requestPath: 'v3/test',
    method: starkex_lib_1.ApiMethod.POST,
    body: '{}',
    timestamp: '2021-01-08T10:06:12.500Z',
};
const mockRequestWithBody = {
    ...mockRequestNoBody,
    body: JSON.stringify({ key: 'value', key2: 'value2' }),
};
let localSigner;
let remoteSigner;
describe('SignEthPrivateAction', () => {
    describe('with a local Ethereum private key', () => {
        beforeAll(() => {
            const web3 = new web3_1.default();
            localSigner = new eth_signing_1.SignEthPrivateAction(web3, 1);
            web3.eth.accounts.wallet.add(GANACHE_PRIVATE_KEY);
        });
        it('signs and verifies using SigningMethod.Hash', async () => {
            const signature = await localSigner.sign(GANACHE_ADDRESS, types_1.SigningMethod.Hash, mockRequestNoBody);
            expect(localSigner.verify(signature, GANACHE_ADDRESS, mockRequestNoBody)).toBe(true);
        });
        it('signs and verifies using SigningMethod.TypedData', async () => {
            const signature = await localSigner.sign(GANACHE_ADDRESS, types_1.SigningMethod.TypedData, mockRequestNoBody);
            expect(localSigner.verify(signature, GANACHE_ADDRESS, mockRequestNoBody)).toBe(true);
            expect(signature).toBe(EXPECTED_SIGNATURE);
        });
        it('rejects an invalid signature', async () => {
            const signature = await localSigner.sign(GANACHE_ADDRESS, types_1.SigningMethod.Hash, mockRequestNoBody);
            // Change the last character.
            const lastChar = signature.charAt(signature.length - 1);
            const newLastChar = lastChar === '0' ? '1' : '0';
            const invalidSignature = `${signature.slice(0, signature.length - 1)}${newLastChar}`;
            expect(localSigner.verify(invalidSignature, GANACHE_ADDRESS, mockRequestNoBody)).toBe(false);
        });
    });
    describe('with a web3 provider', () => {
        beforeAll(async () => {
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider('http://127.0.0.1:8545'));
            remoteSigner = new eth_signing_1.SignEthPrivateAction(web3, 1);
        });
        it('signs and verifies using SigningMethod.Hash', async () => {
            const signature = await localSigner.sign(GANACHE_ADDRESS, types_1.SigningMethod.Hash, mockRequestNoBody);
            expect(localSigner.verify(signature, GANACHE_ADDRESS, mockRequestNoBody)).toBe(true);
        });
        it('signs and verifies using SigningMethod.TypedData', async () => {
            const signature = await remoteSigner.sign(GANACHE_ADDRESS, types_1.SigningMethod.TypedData, mockRequestNoBody);
            expect(remoteSigner.verify(signature, GANACHE_ADDRESS, mockRequestNoBody)).toBe(true);
            expect(signature).toBe(EXPECTED_SIGNATURE);
        });
        it('signs and verifies using SigningMethod.TypedData (with body)', async () => {
            const signature = await remoteSigner.sign(GANACHE_ADDRESS, types_1.SigningMethod.TypedData, mockRequestWithBody);
            expect(remoteSigner.verify(signature, GANACHE_ADDRESS, mockRequestWithBody)).toBe(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWtleS1hY3Rpb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19fdGVzdHNfXy9ldGgtc2lnbmluZy9hcGkta2V5LWFjdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQXNEO0FBQ3RELGdEQUF3QjtBQUV4Qix1REFBNkQ7QUFDN0QsMkNBQWdEO0FBRWhELHdFQUF3RTtBQUN4RSxNQUFNLGVBQWUsR0FBRyw0Q0FBNEMsQ0FBQztBQUNyRSxNQUFNLG1CQUFtQixHQUFHLG9FQUFvRSxDQUFDO0FBRWpHLDJGQUEyRjtBQUMzRixNQUFNLGtCQUFrQixHQUFHLENBQ3pCLHNFQUFzRTtJQUN0RSxvRUFBb0UsQ0FDckUsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsV0FBVyxFQUFFLFNBQVM7SUFDdEIsTUFBTSxFQUFFLHVCQUFTLENBQUMsSUFBSTtJQUN0QixJQUFJLEVBQUUsSUFBSTtJQUNWLFNBQVMsRUFBRSwwQkFBMEI7Q0FDdEMsQ0FBQztBQUNGLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxpQkFBaUI7SUFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztDQUN2RCxDQUFDO0FBRUYsSUFBSSxXQUFpQyxDQUFDO0FBQ3RDLElBQUksWUFBa0MsQ0FBQztBQUV2QyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBRXBDLFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLEVBQUU7UUFFakQsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxFQUFFLENBQUM7WUFDeEIsV0FBVyxHQUFHLElBQUksa0NBQW9CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsUUFB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