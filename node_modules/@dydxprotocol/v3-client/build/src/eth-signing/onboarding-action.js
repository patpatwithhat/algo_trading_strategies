"use strict";
/**
 * Signatures on static messages for onboarding.
 *
 * These are used during onboarding. The signature must be deterministic based on the Ethereum key
 * because the signatures will be used for key derivation, and the keys should be recoverable:
 *   - The onboarding signature is used to derive the default API credentials, on the server.
 *   - The key derivation signature is used by the frontend app to derive the STARK key pair.
 *     Programmatic traders may optionally derive their STARK key pair in the same way.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOnboardingAction = void 0;
const web3_1 = __importDefault(require("web3"));
const helpers_1 = require("./helpers");
const sign_off_chain_action_1 = require("./sign-off-chain-action");
// On mainnet, include an extra onlySignOn parameter.
const EIP712_ONBOARDING_ACTION_STRUCT = [
    { type: 'string', name: 'action' },
    { type: 'string', name: 'onlySignOn' },
];
const EIP712_ONBOARDING_ACTION_STRUCT_STRING = ('dYdX(' +
    'string action,' +
    'string onlySignOn' +
    ')');
const EIP712_ONBOARDING_ACTION_STRUCT_TESTNET = [
    { type: 'string', name: 'action' },
];
const EIP712_ONBOARDING_ACTION_STRUCT_STRING_TESTNET = ('dYdX(' +
    'string action' +
    ')');
class SignOnboardingAction extends sign_off_chain_action_1.SignOffChainAction {
    constructor(web3, networkId) {
        // On mainnet, include an extra onlySignOn parameter.
        const eip712Struct = networkId === 1
            ? EIP712_ONBOARDING_ACTION_STRUCT
            : EIP712_ONBOARDING_ACTION_STRUCT_TESTNET;
        super(web3, networkId, eip712Struct);
    }
    getHash(message) {
        // On mainnet, include an extra onlySignOn parameter.
        const eip712StructString = this.networkId === 1
            ? EIP712_ONBOARDING_ACTION_STRUCT_STRING
            : EIP712_ONBOARDING_ACTION_STRUCT_STRING_TESTNET;
        const data = [
            { t: 'bytes32', v: helpers_1.hashString(eip712StructString) },
            { t: 'bytes32', v: helpers_1.hashString(message.action) },
        ];
        // On mainnet, include an extra onlySignOn parameter.
        if (this.networkId === 1) {
            if (!message.onlySignOn) {
                throw new Error('The onlySignOn is required when onboarding to mainnet');
            }
            data.push({ t: 'bytes32', v: helpers_1.hashString(message.onlySignOn) });
        }
        else if (message.onlySignOn) {
            throw new Error('Unexpected onlySignOn when signing for non-mainnet network');
        }
        const structHash = web3_1.default.utils.soliditySha3(...data);
        // Non-null assertion operator is safe, hash is null only on empty input.
        return this.getEIP712Hash(structHash);
    }
}
exports.SignOnboardingAction = SignOnboardingAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25ib2FyZGluZy1hY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXRoLXNpZ25pbmcvb25ib2FyZGluZy1hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztHQVFHOzs7Ozs7QUFFSCxnREFBd0I7QUFHeEIsdUNBQXVDO0FBQ3ZDLG1FQUE2RDtBQUU3RCxxREFBcUQ7QUFDckQsTUFBTSwrQkFBK0IsR0FBRztJQUN0QyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtJQUNsQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtDQUN2QyxDQUFDO0FBQ0YsTUFBTSxzQ0FBc0MsR0FBRyxDQUM3QyxPQUFPO0lBQ1AsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixHQUFHLENBQ0osQ0FBQztBQUVGLE1BQU0sdUNBQXVDLEdBQUc7SUFDOUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Q0FDbkMsQ0FBQztBQUNGLE1BQU0sOENBQThDLEdBQUcsQ0FDckQsT0FBTztJQUNQLGVBQWU7SUFDZixHQUFHLENBQ0osQ0FBQztBQUVGLE1BQWEsb0JBQXFCLFNBQVEsMENBQW9DO0lBRTVFLFlBQ0UsSUFBVSxFQUNWLFNBQWlCO1FBRWpCLHFEQUFxRDtRQUNyRCxNQUFNLFlBQVksR0FBRyxTQUFTLEtBQUssQ0FBQztZQUNsQyxDQUFDLENBQUMsK0JBQStCO1lBQ2pDLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQztRQUU1QyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sT0FBTyxDQUNaLE9BQXlCO1FBRXpCLHFEQUFxRDtRQUNyRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQztZQUM3QyxDQUFDLENBQUMsc0NBQXNDO1lBQ3hDLENBQUMsQ0FBQyw4Q0FBOEMsQ0FBQztRQUVuRCxNQUFNLElBQUksR0FBRztZQUNYLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsb0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ25ELEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsb0JBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7U0FDaEQsQ0FBQztRQUVGLHFEQUFxRDtRQUNyRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7YUFDMUU7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUNQLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsb0JBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FDcEQsQ0FBQztTQUNIO2FBQU0sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztTQUMvRTtRQUVELE1BQU0sVUFBVSxHQUFrQixjQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ25FLHlFQUF5RTtRQUN6RSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUNGO0FBM0NELG9EQTJDQyJ9