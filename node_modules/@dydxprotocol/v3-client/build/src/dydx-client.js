"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DydxClient = void 0;
const starkex_eth_1 = require("@dydxprotocol/starkex-eth");
const web3_1 = __importDefault(require("web3"));
const clock_1 = __importDefault(require("./modules/clock"));
const eth_private_1 = __importDefault(require("./modules/eth-private"));
const onboarding_1 = __importDefault(require("./modules/onboarding"));
const private_1 = __importDefault(require("./modules/private"));
const public_1 = __importDefault(require("./modules/public"));
class DydxClient {
    constructor(host, options = {}) {
        this.host = host;
        this.apiTimeout = options.apiTimeout;
        this.ethSendOptions = options.ethSendOptions;
        this.networkId = typeof options.networkId === 'number' ? options.networkId : 1;
        this.starkPrivateKey = options.starkPrivateKey;
        this.apiKeyCredentials = options.apiKeyCredentials;
        if (options.web3 || options.web3Provider) {
            // Non-null assertion is safe due to if-condition.
            this.web3 = options.web3 || new web3_1.default(options.web3Provider);
        }
        // Modules.
        this._public = new public_1.default(host);
        this._clock = new clock_1.default(options.timestampAdjustment);
    }
    /**
     * Get the public module, used for interacting with public endpoints.
     */
    get public() {
        return this._public;
    }
    /**
     * Get the clock module, used for adjusting system time to server time.
     */
    get clock() {
        return this._clock;
    }
    /**
     * Get the private module, used for interacting with endpoints that require API-key auth.
     */
    get private() {
        if (!this._private) {
            if (this.apiKeyCredentials) {
                this._private = new private_1.default({
                    host: this.host,
                    apiKeyCredentials: this.apiKeyCredentials,
                    starkPrivateKey: this.starkPrivateKey,
                    networkId: this.networkId,
                    clock: this._clock,
                });
            }
            else {
                return notSupported('Private endpoints are not supported since apiKeyCredentials was not provided');
            }
        }
        return this._private;
    }
    /**
     * Get the keys module, used for managing API keys. Requires Ethereum key auth.
     */
    get ethPrivate() {
        if (!this._ethPrivate) {
            if (this.web3) {
                this._ethPrivate = new eth_private_1.default({
                    host: this.host,
                    web3: this.web3,
                    networkId: this.networkId,
                    clock: this._clock,
                });
            }
            else {
                return notSupported('Eth private endpoints are not supported since neither web3 nor web3Provider was provided');
            }
        }
        return this._ethPrivate;
    }
    /**
     * Get the onboarding module, used to create a new user. Requires Ethereum key auth.
     */
    get onboarding() {
        if (!this._onboarding) {
            if (this.web3) {
                this._onboarding = new onboarding_1.default(this.host, this.web3, this.networkId);
            }
            else {
                return notSupported('Onboarding endpoints are not supported since neither web3 nor web3Provider was provided');
            }
        }
        return this._onboarding;
    }
    /**
     * Get the eth module, used for interacting with Ethereum smart contracts.
     */
    get eth() {
        if (!this._eth) {
            if (this.web3) {
                this._eth = new starkex_eth_1.StarkwareLib(this.web3.currentProvider, this.networkId, this.ethSendOptions);
            }
            else {
                return notSupported('Eth endpoints are not supported since neither web3 nor web3Provider was provided');
            }
        }
        return this._eth;
    }
}
exports.DydxClient = DydxClient;
/**
 * Returns a proxy object that throws with the given message when trying to call a function on it.
 */
function notSupported(errorMessage) {
    const handler = {
        get() {
            throw new Error(errorMessage);
        },
    };
    return new Proxy({}, handler);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHlkeC1jbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZHlkeC1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkRBQXlEO0FBRXpELGdEQUF3QjtBQUV4Qiw0REFBb0M7QUFDcEMsd0VBQStDO0FBQy9DLHNFQUE4QztBQUM5QyxnRUFBd0M7QUFDeEMsOERBQXNDO0FBa0J0QyxNQUFhLFVBQVU7SUFtQnJCLFlBQ0UsSUFBWSxFQUNaLFVBQXlCLEVBQUU7UUFFM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sT0FBTyxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUVuRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUN4QyxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksY0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFhLENBQUMsQ0FBQztTQUM3RDtRQUVELFdBQVc7UUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZ0JBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBTyxDQUFDO29CQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtvQkFDekMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO29CQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtpQkFDbkIsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsT0FBTyxZQUFZLENBQ2pCLDhFQUE4RSxDQUNwRSxDQUFDO2FBQ2Q7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFVBQVU7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFCQUFVLENBQUM7b0JBQ2hDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO29CQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07aUJBQ25CLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE9BQU8sWUFBWSxDQUNqQiwwRkFBMEYsQ0FDN0UsQ0FBQzthQUNqQjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksVUFBVTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDYixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksb0JBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3pFO2lCQUFNO2dCQUNMLE9BQU8sWUFBWSxDQUNqQix5RkFBeUYsQ0FDNUUsQ0FBQzthQUNqQjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksR0FBRztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSwwQkFBWSxDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFDekIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsT0FBTyxZQUFZLENBQ2pCLGtGQUFrRixDQUNuRSxDQUFDO2FBQ25CO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBcElELGdDQW9JQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxZQUFZLENBQ25CLFlBQW9CO0lBRXBCLE1BQU0sT0FBTyxHQUFHO1FBQ2QsR0FBRztZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUNGLENBQUM7SUFDRixPQUFPLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDIn0=