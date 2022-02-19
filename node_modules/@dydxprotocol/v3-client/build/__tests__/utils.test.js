"use strict";
/**
 * Unit tests for helper and utility functions in src.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request_helpers_1 = require("../src/helpers/request-helpers");
describe('request-helpers', () => {
    describe('generateQueryPath', () => {
        it('creates query path', async () => {
            expect(request_helpers_1.generateQueryPath('url', {
                param1: 'value1',
                param2: undefined,
                param3: 3,
            })).toEqual('url?param1=value1&param3=3');
        });
        it('creates empty query path', async () => {
            expect(request_helpers_1.generateQueryPath('url', { param1: undefined })).toEqual('url');
            expect(request_helpers_1.generateQueryPath('url', {})).toEqual('url');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19fdGVzdHNfXy91dGlscy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCxvRUFBbUU7QUFFbkUsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUUvQixRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQ2pDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLElBQUksRUFBRTtZQUNsQyxNQUFNLENBQUMsbUNBQWlCLENBQUMsS0FBSyxFQUFFO2dCQUM5QixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE1BQU0sRUFBRSxDQUFDO2FBQ1YsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDeEMsTUFBTSxDQUFDLG1DQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sQ0FBQyxtQ0FBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=