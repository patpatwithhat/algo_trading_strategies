"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const eth_signing_1 = require("../../src/eth-signing");
const types_1 = require("../../src/types");
let localSigner;
let localAccountAddress;
let remoteSigner;
let remoteAccountAddress;
// DEFAULT GANACHE ACCOUNT FOR TESTING ONLY -- DO NOT USE IN PRODUCTION.
const GANACHE_ADDRESS = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
const GANACHE_PRIVATE_KEY = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
// IMPORTANT: This is the message used with the SigningMethod.PERSONAL singing method.
//            The message should not be changed at all since it's used to generated default keys.
const EXPECTED_PERSONAL_MESSAGE = `{
  "name": "dYdX",
  "version": "1.0",
  "chainId": 1,
  "action": "dYdX Onboarding",
  "onlySignOn": "https://trade.dydx.exchange"
}`;
// Typed signature generated using web3.eth.personal().
const PERSONAL_SIGNATURE = ('0x12311bcc0280fe24e529bd16fa770a3eddb90ebca9f7d06e9ba11928f1d14dc8' +
    '7c2f6e5409137150feeaf37319ae2160996788528248090b56896d74d3ce5c3b1b03');
describe('SignOnboardingAction', () => {
    describe('without a web3 provider', () => {
        beforeAll(() => {
            const web3 = new web3_1.default();
            localSigner = new eth_signing_1.SignOnboardingAction(web3, 1);
            localAccountAddress = web3.eth.accounts.wallet.create(1)[0].address;
        });
        it('signs and verifies using SigningMethod.Hash', async () => {
            const signature = await localSigner.sign(localAccountAddress, types_1.SigningMethod.Hash, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' });
            expect(localSigner.verify(signature, localAccountAddress, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' })).toBe(true);
        });
        it('verifies a message signed using SigningMethod.Personal', async () => {
            const ganacheAccount = new web3_1.default().eth.accounts.wallet.add(GANACHE_PRIVATE_KEY);
            expect(localSigner.verify(PERSONAL_SIGNATURE, ganacheAccount.address, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' })).toBe(true);
        });
        it('rejects an invalid signature', async () => {
            const signature = await localSigner.sign(localAccountAddress, types_1.SigningMethod.Hash, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' });
            // Change the last character.
            const lastChar = signature.charAt(signature.length - 1);
            const newLastChar = lastChar === '0' ? '1' : '0';
            const invalidSignature = `${signature.slice(0, signature.length - 1)}${newLastChar}`;
            expect(localSigner.verify(invalidSignature, localAccountAddress, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' })).toBe(false);
        });
        it('rejects if the message is different', async () => {
            const signature = await localSigner.sign(localAccountAddress, types_1.SigningMethod.Hash, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' });
            expect(localSigner.verify(signature, localAccountAddress, { action: types_1.OnboardingActionString.KEY_DERIVATION, onlySignOn: 'https://trade.dydx.exchange' })).toBe(false);
        });
    });
    describe('with a web3 provider', () => {
        beforeAll(async () => {
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider('http://127.0.0.1:8545'));
            remoteSigner = new eth_signing_1.SignOnboardingAction(web3, 1);
            remoteAccountAddress = (await web3.eth.getAccounts())[0];
        });
        it('signs and verifies using SigningMethod.Hash', async () => {
            const signature = await remoteSigner.sign(remoteAccountAddress, types_1.SigningMethod.Hash, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' });
            expect(remoteSigner.verify(signature, remoteAccountAddress, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' })).toBe(true);
        });
        it('signs and verifies using SigningMethod.TypedData', async () => {
            const signature = await remoteSigner.sign(remoteAccountAddress, types_1.SigningMethod.TypedData, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' });
            expect(remoteSigner.verify(signature, remoteAccountAddress, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' })).toBe(true);
        });
        it('signs a message using SigningMethod.Personal', async () => {
            // Mock the signing function since personal_sign is not supported by Ganache.
            const provider = new web3_1.default.providers.HttpProvider('http://127.0.0.1:8545');
            const web3 = new web3_1.default(provider);
            provider.send = jest.fn().mockImplementation((_, callback) => {
                callback(null, { result: PERSONAL_SIGNATURE.slice(0, -2) });
            });
            const spiedSigner = new eth_signing_1.SignOnboardingAction(web3, 1);
            await spiedSigner.sign(remoteAccountAddress, types_1.SigningMethod.Personal, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' });
            expect(provider.send).toHaveBeenCalledWith({
                id: expect.any(Number),
                jsonrpc: '2.0',
                method: 'personal_sign',
                params: [
                    GANACHE_ADDRESS,
                    EXPECTED_PERSONAL_MESSAGE,
                ],
            }, expect.any(Function));
        });
        it('verifies a message signed using SigningMethod.Personal', async () => {
            expect(localSigner.verify(PERSONAL_SIGNATURE, remoteAccountAddress, { action: types_1.OnboardingActionString.ONBOARDING, onlySignOn: 'https://trade.dydx.exchange' })).toBe(true);
            // Try again, with the message parameters in a different order.
            expect(localSigner.verify(PERSONAL_SIGNATURE, remoteAccountAddress, { onlySignOn: 'https://trade.dydx.exchange', action: types_1.OnboardingActionString.ONBOARDING })).toBe(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25ib2FyZGluZy1hY3Rpb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19fdGVzdHNfXy9ldGgtc2lnbmluZy9vbmJvYXJkaW5nLWFjdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLHVEQUE2RDtBQUM3RCwyQ0FHeUI7QUFFekIsSUFBSSxXQUFpQyxDQUFDO0FBQ3RDLElBQUksbUJBQTJCLENBQUM7QUFDaEMsSUFBSSxZQUFrQyxDQUFDO0FBQ3ZDLElBQUksb0JBQTRCLENBQUM7QUFFakMsd0VBQXdFO0FBQ3hFLE1BQU0sZUFBZSxHQUFHLDRDQUE0QyxDQUFDO0FBQ3JFLE1BQU0sbUJBQW1CLEdBQUcsb0VBQW9FLENBQUM7QUFFakcsc0ZBQXNGO0FBQ3RGLGlHQUFpRztBQUNqRyxNQUFNLHlCQUF5QixHQUFHOzs7Ozs7RUFNaEMsQ0FBQztBQUVILHVEQUF1RDtBQUN2RCxNQUFNLGtCQUFrQixHQUFHLENBQ3pCLG9FQUFvRTtJQUNwRSxzRUFBc0UsQ0FDdkUsQ0FBQztBQUVGLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFFcEMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUV2QyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLEVBQUUsQ0FBQztZQUN4QixXQUFXLEdBQUcsSUFBSSxrQ0FBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNkNBQTZDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDM0QsTUFBTSxTQUFTLEdBQUcs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