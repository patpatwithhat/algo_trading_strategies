"use strict";
/**
 * Unit tests signing with credentials.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const web3_1 = __importDefault(require("web3"));
const src_1 = require("../src");
const axios_2 = require("../src/lib/axios");
const util_1 = require("./helpers/util");
const apiKeyCredentials = {
    key: 'foo',
    secret: 'qnjyWWTHMY5SFqmNpJga_fXL-3lwOqUIpmz2izlV',
    passphrase: 'foo',
};
describe('Verify signature is as expected', () => {
    it('signs a private request', async () => {
        util_1.asMock(axios_1.default).mockResolvedValue({});
        const web3 = new web3_1.default();
        const client = new src_1.DydxClient('https://example.com', { web3, apiKeyCredentials });
        await client.private.getApiKeys();
        expect(client.private.sign({
            requestPath: '/v3/api-keys?ethereumAddress=0xE5714924C8C5c732F92A439075C8211eB0611aaC',
            method: axios_2.RequestMethod.GET,
            isoTimestamp: '2021-02-01T19:38:54.508Z',
        })).toEqual('jGElyQttdQDNqlRu5CpCtfVEYcikknzXWsOjKJAcTtI=');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vX190ZXN0c19fL3ByaXZhdGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsa0RBQTZDO0FBQzdDLGdEQUF3QjtBQUV4QixnQ0FBdUQ7QUFDdkQsNENBQWlEO0FBQ2pELHlDQUF3QztBQUV4QyxNQUFNLGlCQUFpQixHQUFzQjtJQUMzQyxHQUFHLEVBQUUsS0FBSztJQUNWLE1BQU0sRUFBRSwwQ0FBMEM7SUFDbEQsVUFBVSxFQUFFLEtBQUs7Q0FDbEIsQ0FBQztBQUVGLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFDL0MsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3ZDLGFBQU0sQ0FBQyxlQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFtQixDQUFDLENBQUM7UUFFckQsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFJLEVBQUUsQ0FBQztRQUV4QixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFVLENBQUMscUJBQXFCLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDekIsV0FBVyxFQUFFLHlFQUF5RTtZQUN0RixNQUFNLEVBQUUscUJBQWEsQ0FBQyxHQUFHO1lBQ3pCLFlBQVksRUFBRSwwQkFBMEI7U0FDekMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9