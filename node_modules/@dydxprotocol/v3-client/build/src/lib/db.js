"use strict";
// TODO: Get rid of this file.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountId = exports.getUserId = void 0;
const uuid = __importStar(require("uuid"));
const UUID_NAMESPACE = '0f9da948-a6fb-4c45-9edc-4685c3f3317d';
function getUserId(address) {
    return uuid.v5(Buffer.from(address.toLowerCase()), UUID_NAMESPACE);
}
exports.getUserId = getUserId;
function getAccountId({ address, accountNumber = '0', }) {
    return uuid.v5(Buffer.from(`${getUserId(address)}${accountNumber}`), UUID_NAMESPACE);
}
exports.getAccountId = getAccountId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4QkFBOEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFOUIsMkNBQTZCO0FBRTdCLE1BQU0sY0FBYyxHQUFXLHNDQUFzQyxDQUFDO0FBRXRFLFNBQWdCLFNBQVMsQ0FDdkIsT0FBZTtJQUVmLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFKRCw4QkFJQztBQUVELFNBQWdCLFlBQVksQ0FBQyxFQUMzQixPQUFPLEVBQ1AsYUFBYSxHQUFHLEdBQUcsR0FJcEI7SUFDQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxFQUNwRCxjQUFjLENBQ2YsQ0FBQztBQUNKLENBQUM7QUFYRCxvQ0FXQyJ9