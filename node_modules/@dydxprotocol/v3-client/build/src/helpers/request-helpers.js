"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomClientId = exports.keccak256Buffer = exports.generateQueryPath = void 0;
const web3_1 = __importDefault(require("web3"));
const helpers_1 = require("../eth-signing/helpers");
function generateQueryPath(url, params) {
    const definedEntries = Object.entries(params)
        .filter(([_key, value]) => value !== undefined);
    if (!definedEntries.length) {
        return url;
    }
    const paramsString = definedEntries.map(([key, value]) => `${key}=${value}`).join('&');
    return `${url}?${paramsString}`;
}
exports.generateQueryPath = generateQueryPath;
function keccak256Buffer(input) {
    if (input.length === 0) {
        throw new Error('keccak256Buffer: Expected a Buffer with non-zero length');
    }
    return Buffer.from(helpers_1.stripHexPrefix(web3_1.default.utils.soliditySha3(input)), 'hex');
}
exports.keccak256Buffer = keccak256Buffer;
function generateRandomClientId() {
    return Math.random().toString().slice(2).replace(/^0+/, '');
}
exports.generateRandomClientId = generateRandomClientId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvcmVxdWVzdC1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF3QjtBQUV4QixvREFBd0Q7QUFFeEQsU0FBZ0IsaUJBQWlCLENBQUMsR0FBVyxFQUFFLE1BQVU7SUFDdkQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFvQixFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUM7SUFFckUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7UUFDMUIsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUVELE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQ3JDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFvQixFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FDdkQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixPQUFPLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ2xDLENBQUM7QUFaRCw4Q0FZQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxLQUFhO0lBQzNDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0tBQzVFO0lBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUFjLENBQUMsY0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBMEIsQ0FBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUxELDBDQUtDO0FBRUQsU0FBZ0Isc0JBQXNCO0lBQ3BDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFGRCx3REFFQyJ9