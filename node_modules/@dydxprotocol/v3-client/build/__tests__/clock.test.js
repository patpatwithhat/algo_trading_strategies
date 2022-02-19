"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('Clock', () => {
    it('constructor', async () => {
        const client = new src_1.DydxClient('https://example.com', {});
        expect(client.clock.timestampAdjustment).toEqual(0);
    });
    it('setTimestampAdjustment', async () => {
        const newAdjustment = 124234.123;
        const client = new src_1.DydxClient('https://example.com', {});
        client.clock.setTimestampAdjustment(newAdjustment);
        expect(client.clock.timestampAdjustment).toEqual(newAdjustment);
    });
    it('getAdjustedIsoString', async () => {
        const newAdjustment = -312340.5;
        const client = new src_1.DydxClient('https://example.com', {});
        const iso1 = client.clock.getAdjustedIsoString();
        client.clock.setTimestampAdjustment(newAdjustment);
        const iso2 = client.clock.getAdjustedIsoString();
        const oneSecondMs = 1000; // iso1/iso2 should be generated within 1 second of each other
        const msAdjustment = newAdjustment * 1000;
        expect(Date.parse(iso2) >= Date.parse(iso1) + msAdjustment);
        expect(Date.parse(iso2) <= Date.parse(iso1) + msAdjustment + oneSecondMs);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2sudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL19fdGVzdHNfXy9jbG9jay50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQW9DO0FBRXBDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3JCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBVSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3RDLE1BQU0sYUFBYSxHQUFXLFVBQVUsQ0FBQztRQUN6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFVLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNwQyxNQUFNLGFBQWEsR0FBVyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFVLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRWpELE1BQU0sV0FBVyxHQUFXLElBQUksQ0FBQyxDQUFDLDhEQUE4RDtRQUNoRyxNQUFNLFlBQVksR0FBVyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDNUUsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9