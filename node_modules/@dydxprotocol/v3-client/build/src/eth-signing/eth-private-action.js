"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignEthPrivateAction = void 0;
const web3_1 = __importDefault(require("web3"));
const helpers_1 = require("./helpers");
const sign_off_chain_action_1 = require("./sign-off-chain-action");
const EIP712_ETH_PRIVATE_ACTION_STRUCT = [
    { type: 'string', name: 'method' },
    { type: 'string', name: 'requestPath' },
    { type: 'string', name: 'body' },
    { type: 'string', name: 'timestamp' },
];
const EIP712_ETH_PRIVATE_ACTION_STRUCT_STRING = ('dYdX(' +
    'string method,' +
    'string requestPath,' +
    'string body,' +
    'string timestamp' +
    ')');
class SignEthPrivateAction extends sign_off_chain_action_1.SignOffChainAction {
    constructor(web3, networkId) {
        super(web3, networkId, EIP712_ETH_PRIVATE_ACTION_STRUCT);
    }
    getHash(message) {
        const structHash = web3_1.default.utils.soliditySha3({ t: 'bytes32', v: helpers_1.hashString(EIP712_ETH_PRIVATE_ACTION_STRUCT_STRING) }, { t: 'bytes32', v: helpers_1.hashString(message.method) }, { t: 'bytes32', v: helpers_1.hashString(message.requestPath) }, { t: 'bytes32', v: helpers_1.hashString(message.body) }, { t: 'bytes32', v: helpers_1.hashString(message.timestamp) });
        // Non-null assertion operator is safe, hash is null only on empty input.
        return this.getEIP712Hash(structHash);
    }
}
exports.SignEthPrivateAction = SignEthPrivateAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLXByaXZhdGUtYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2V0aC1zaWduaW5nL2V0aC1wcml2YXRlLWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBd0I7QUFHeEIsdUNBQXVDO0FBQ3ZDLG1FQUE2RDtBQUU3RCxNQUFNLGdDQUFnQyxHQUFHO0lBQ3ZDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0lBQ2xDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFO0lBQ3ZDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQ2hDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0NBQ3RDLENBQUM7QUFDRixNQUFNLHVDQUF1QyxHQUFHLENBQzlDLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsR0FBRyxDQUNKLENBQUM7QUFFRixNQUFhLG9CQUFxQixTQUFRLDBDQUFvQztJQUU1RSxZQUNFLElBQVUsRUFDVixTQUFpQjtRQUVqQixLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxPQUFPLENBQ1osT0FBeUI7UUFFekIsTUFBTSxVQUFVLEdBQWtCLGNBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUN2RCxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLG9CQUFVLENBQUMsdUNBQXVDLENBQUMsRUFBRSxFQUN4RSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLG9CQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQy9DLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsb0JBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFDcEQsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUM3QyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLG9CQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ25ELENBQUM7UUFDRix5RUFBeUU7UUFDekUsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDRjtBQXRCRCxvREFzQkMifQ==