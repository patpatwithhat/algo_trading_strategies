"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const starkex_lib_1 = require("@dydxprotocol/starkex-lib");
const lodash_1 = __importDefault(require("lodash"));
const eth_signing_1 = require("../eth-signing");
const request_helpers_1 = require("../helpers/request-helpers");
const axios_1 = require("../lib/axios");
const types_1 = require("../types");
class EthPrivate {
    constructor({ host, web3, networkId, clock, }) {
        this.host = host;
        this.signer = new eth_signing_1.SignEthPrivateAction(web3, networkId);
        this.clock = clock;
    }
    // ============ Request Helpers ============
    async request(method, endpoint, ethereumAddress, signingMethod, data = {}) {
        const requestPath = `/v3/${endpoint}`;
        const timestamp = this.clock.getAdjustedIsoString();
        const body = JSON.stringify(data);
        const signature = await this.signer.sign(ethereumAddress, signingMethod, {
            method,
            requestPath,
            body,
            timestamp,
        });
        return axios_1.axiosRequest({
            url: `${this.host}${requestPath}`,
            method,
            data: !lodash_1.default.isEmpty(data) ? body : undefined,
            headers: {
                'DYDX-SIGNATURE': signature,
                'DYDX-TIMESTAMP': timestamp,
                'DYDX-ETHEREUM-ADDRESS': ethereumAddress,
            },
        });
    }
    async post(endpoint, ethereumAddress, signingMethod = types_1.SigningMethod.Hash) {
        return this.request(starkex_lib_1.ApiMethod.POST, endpoint, ethereumAddress, signingMethod);
    }
    async delete(endpoint, ethereumAddress, signingMethod = types_1.SigningMethod.Hash, params) {
        const requestPath = request_helpers_1.generateQueryPath(endpoint, params);
        return this.request(starkex_lib_1.ApiMethod.DELETE, requestPath, ethereumAddress, signingMethod);
    }
    async get(endpoint, ethereumAddress, signingMethod = types_1.SigningMethod.Hash) {
        return this.request(starkex_lib_1.ApiMethod.GET, endpoint, ethereumAddress, signingMethod);
    }
    // ============ Requests ============
    /**
     * @description have an auto-generated apikey, secret and passphrase generated
     * for an ethereumAddress.
     * @param ethereumAddress the apiKey will be for
     * @param signingMethod used to validate the request
     */
    async createApiKey(ethereumAddress, signingMethod = types_1.SigningMethod.Hash) {
        return this.post('api-keys', ethereumAddress, signingMethod);
    }
    /**
     *
     * @param apiKey to be deleted
     * @param ethereumAddress the apiKey is for
     * @param signingMethod used to validate the request
     */
    async deleteApiKey(apiKey, ethereumAddress, signingMethod = types_1.SigningMethod.Hash) {
        return this.delete('api-keys', ethereumAddress, signingMethod, { apiKey });
    }
    /**
     * @description This is for if you can't recover your starkKey or apiKey and need an
     * additional way to get your starkKey, positionid and balance on our exchange,
     *  all of which are needed to call the L1 solidity function needed to recover your funds.
     *
     * @param ethereumAddress the recovery is for
     * @param signingMethod used to validate the request
     */
    async recovery(ethereumAddress, signingMethod = types_1.SigningMethod.Hash) {
        return this.get('recovery', ethereumAddress, signingMethod);
    }
}
exports.default = EthPrivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLXByaXZhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9ldGgtcHJpdmF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUFzRDtBQUN0RCxvREFBdUI7QUFHdkIsZ0RBQXNEO0FBQ3RELGdFQUErRDtBQUMvRCx3Q0FFc0I7QUFDdEIsb0NBTWtCO0FBR2xCLE1BQXFCLFVBQVU7SUFLN0IsWUFBWSxFQUNWLElBQUksRUFDSixJQUFJLEVBQ0osU0FBUyxFQUNULEtBQUssR0FNTjtRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBb0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELDRDQUE0QztJQUVsQyxLQUFLLENBQUMsT0FBTyxDQUNyQixNQUFpQixFQUNqQixRQUFnQixFQUNoQixlQUF1QixFQUN2QixhQUE0QixFQUM1QixPQUFXLEVBQUU7UUFFYixNQUFNLFdBQVcsR0FBVyxPQUFPLFFBQVEsRUFBRSxDQUFDO1FBQzlDLE1BQU0sU0FBUyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM3RCxNQUFNLElBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLE1BQU0sU0FBUyxHQUFXLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQzlDLGVBQWUsRUFDZixhQUFhLEVBQ2I7WUFDRSxNQUFNO1lBQ04sV0FBVztZQUNYLElBQUk7WUFDSixTQUFTO1NBQ1YsQ0FDRixDQUFDO1FBQ0YsT0FBTyxvQkFBWSxDQUFDO1lBQ2xCLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxFQUFFO1lBQ2pDLE1BQU07WUFDTixJQUFJLEVBQUUsQ0FBQyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCxnQkFBZ0IsRUFBRSxTQUFTO2dCQUMzQixnQkFBZ0IsRUFBRSxTQUFTO2dCQUMzQix1QkFBdUIsRUFBRSxlQUFlO2FBQ3pDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLEtBQUssQ0FBQyxJQUFJLENBQ2xCLFFBQWdCLEVBQ2hCLGVBQXVCLEVBQ3ZCLGdCQUErQixxQkFBYSxDQUFDLElBQUk7UUFFakQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVTLEtBQUssQ0FBQyxNQUFNLENBQ3BCLFFBQWdCLEVBQ2hCLGVBQXVCLEVBQ3ZCLGdCQUErQixxQkFBYSxDQUFDLElBQUksRUFDakQsTUFBVTtRQUVWLE1BQU0sV0FBVyxHQUFHLG1DQUFpQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQVMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRVMsS0FBSyxDQUFDLEdBQUcsQ0FDakIsUUFBZ0IsRUFDaEIsZUFBdUIsRUFDdkIsZ0JBQStCLHFCQUFhLENBQUMsSUFBSTtRQUVqRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQscUNBQXFDO0lBRXJDOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FDaEIsZUFBdUIsRUFDdkIsZ0JBQStCLHFCQUFhLENBQUMsSUFBSTtRQUVqRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUNoQixNQUFjLEVBQ2QsZUFBdUIsRUFDdkIsZ0JBQStCLHFCQUFhLENBQUMsSUFBSTtRQUVqRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FDWixlQUF1QixFQUN2QixnQkFBK0IscUJBQWEsQ0FBQyxJQUFJO1FBU2pELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRjtBQW5JRCw2QkFtSUMifQ==