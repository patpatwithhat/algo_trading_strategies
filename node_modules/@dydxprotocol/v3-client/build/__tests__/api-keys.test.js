"use strict";
/**
 * Unit tests for the API keys module.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const web3_1 = __importDefault(require("web3"));
const src_1 = require("../src");
const util_1 = require("./helpers/util");
const apiKeyCredentials = {
    key: 'd53c3a7d-3add-68db-a9c3-9ad582313c8e',
    secret: '85BR_H-GC7HS3aydOxLw3zjRuDI6RYVgFmsYaKJh',
    passphrase: '1qYatmED3wy9RnDZsGnR',
};
describe('API Keys Module & Private Module', () => {
    it('signs a private request', async () => {
        util_1.asMock(axios_1.default).mockResolvedValue({});
        const web3 = new web3_1.default();
        const client = new src_1.DydxClient('https://example.com', { web3, apiKeyCredentials });
        await client.private.getApiKeys();
        expect(axios_1.default).toHaveBeenCalledTimes(1);
        expect(axios_1.default).toHaveBeenCalledWith({
            url: expect.stringContaining('/v3/api-keys'),
            method: 'GET',
            headers: {
                'DYDX-API-KEY': expect.stringMatching(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/),
                'DYDX-TIMESTAMP': expect.any(String),
                'DYDX-PASSPHRASE': expect.stringMatching(/^[A-Za-z0-9_-]{20}$/),
                'DYDX-SIGNATURE': expect.any(String),
            },
            data: undefined,
        });
    });
    it('signs an ApiKey request', async () => {
        util_1.asMock(axios_1.default).mockResolvedValue({});
        const web3 = new web3_1.default();
        const account = web3.eth.accounts.wallet.create(1)[0];
        const client = new src_1.DydxClient('https://example.com', { web3 });
        await client.ethPrivate.deleteApiKey(apiKeyCredentials.key, account.address);
        expect(axios_1.default).toHaveBeenCalledTimes(1);
        expect(axios_1.default).toHaveBeenCalledWith({
            url: expect.stringContaining('/v3/api-keys'),
            method: 'DELETE',
            headers: {
                'DYDX-SIGNATURE': expect.stringMatching(/0x[0-9a-f]{130}/),
                'DYDX-TIMESTAMP': expect.any(String),
                'DYDX-ETHEREUM-ADDRESS': expect.stringMatching(/0x[0-9a-fA-F]{40}/),
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWtleXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19fdGVzdHNfXy9hcGkta2V5cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCxrREFBNkM7QUFDN0MsZ0RBQXdCO0FBRXhCLGdDQUF3RTtBQUN4RSx5Q0FBd0M7QUFFeEMsTUFBTSxpQkFBaUIsR0FBc0I7SUFDM0MsR0FBRyxFQUFFLHNDQUFzQztJQUMzQyxNQUFNLEVBQUUsMENBQTBDO0lBQ2xELFVBQVUsRUFBRSxzQkFBc0I7Q0FDbkMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUU7SUFDaEQsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3ZDLGFBQU0sQ0FBQyxlQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFtQixDQUFDLENBQUM7UUFFckQsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLEVBQUUsQ0FBQztRQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFVLENBQUMscUJBQXFCLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQyxNQUFNLENBQUMsZUFBSyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLGVBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDO1lBQ2pDLEdBQUcsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1lBQzVDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLDZFQUE2RSxDQUFDO2dCQUNwSCxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDcEMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDL0QsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7YUFDckM7WUFDRCxJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN2QyxhQUFNLENBQUMsZUFBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBbUIsQ0FBQyxDQUFDO1FBRXJELE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxFQUFFLENBQUM7UUFDeEIsTUFBTSxPQUFPLEdBQW9CLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBVSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRCxNQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0UsTUFBTSxDQUFDLGVBQUssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxlQUFLLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztZQUNqQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztZQUM1QyxNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUU7Z0JBQ1AsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDMUQsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3BDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUM7YUFDcEU7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=