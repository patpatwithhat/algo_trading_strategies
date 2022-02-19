"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = exports.addressesAreEqual = exports.stripHexPrefix = exports.fixRawSignature = exports.createTypedSignature = exports.ecRecoverTypedSignature = exports.isValidSigType = exports.EIP712_DOMAIN_STRUCT_NO_CONTRACT = exports.EIP712_DOMAIN_STRING_NO_CONTRACT = exports.EIP712_DOMAIN_STRUCT = exports.EIP712_DOMAIN_STRING = exports.PREPEND_HEX = exports.PREPEND_DEC = exports.PREPEND_PERSONAL = void 0;
const ethers_1 = require("ethers");
const web3_1 = __importDefault(require("web3"));
const types_1 = require("../types");
/**
 * Ethereum signed message prefix without message length.
 */
exports.PREPEND_PERSONAL = '\x19Ethereum Signed Message:\n';
/**
 * Ethereum signed message prefix, 32-byte message, with message length represented as a string.
 */
exports.PREPEND_DEC = '\x19Ethereum Signed Message:\n32';
/**
 * Ethereum signed message prefix, 32-byte message, with message length as a one-byte integer.
 */
exports.PREPEND_HEX = '\x19Ethereum Signed Message:\n\x20';
exports.EIP712_DOMAIN_STRING = 'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)';
exports.EIP712_DOMAIN_STRUCT = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
];
exports.EIP712_DOMAIN_STRING_NO_CONTRACT = 'EIP712Domain(string name,string version,uint256 chainId)';
exports.EIP712_DOMAIN_STRUCT_NO_CONTRACT = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
];
function isValidSigType(sigType) {
    switch (sigType) {
        case types_1.SignatureTypes.NO_PREPEND:
        case types_1.SignatureTypes.DECIMAL:
        case types_1.SignatureTypes.HEXADECIMAL:
        case types_1.SignatureTypes.PERSONAL:
            return true;
        default:
            return false;
    }
}
exports.isValidSigType = isValidSigType;
/**
 * Recover the address used to sign a given hash or message.
 *
 * The string `hashOrMessage` is a hash, unless the signature has type SignatureTypes.PERSONAL, in
 * which case it is the signed message.
 */
function ecRecoverTypedSignature(hashOrMessage, typedSignature) {
    const sigType = parseInt(typedSignature.slice(-2), 16);
    let prependedHash;
    switch (sigType) {
        case types_1.SignatureTypes.NO_PREPEND:
            prependedHash = hashOrMessage;
            break;
        case types_1.SignatureTypes.PERSONAL: {
            const fullMessage = `${exports.PREPEND_PERSONAL}${hashOrMessage.length}${hashOrMessage}`;
            prependedHash = web3_1.default.utils.soliditySha3({ t: 'string', v: fullMessage });
            break;
        }
        case types_1.SignatureTypes.DECIMAL:
            prependedHash = web3_1.default.utils.soliditySha3({ t: 'string', v: exports.PREPEND_DEC }, { t: 'bytes32', v: hashOrMessage });
            break;
        case types_1.SignatureTypes.HEXADECIMAL:
            prependedHash = web3_1.default.utils.soliditySha3({ t: 'string', v: exports.PREPEND_HEX }, { t: 'bytes32', v: hashOrMessage });
            break;
        default:
            throw new Error(`Invalid signature type: ${sigType}`);
    }
    const signature = typedSignature.slice(0, -2);
    // Non-null assertion operator is safe, hash is null only on empty input.
    return ethers_1.ethers.utils.recoverAddress(ethers_1.ethers.utils.arrayify(prependedHash), signature);
}
exports.ecRecoverTypedSignature = ecRecoverTypedSignature;
function createTypedSignature(signature, sigType) {
    if (!isValidSigType(sigType)) {
        throw new Error(`Invalid signature type: ${sigType}`);
    }
    return `${fixRawSignature(signature)}0${sigType}`;
}
exports.createTypedSignature = createTypedSignature;
/**
 * Fixes any signatures that don't have a 'v' value of 27 or 28
 */
function fixRawSignature(signature) {
    const stripped = stripHexPrefix(signature);
    if (stripped.length !== 130) {
        throw new Error(`Invalid raw signature: ${signature}`);
    }
    const rs = stripped.substr(0, 128);
    const v = stripped.substr(128, 2);
    switch (v) {
        case '00':
            return `0x${rs}1b`;
        case '01':
            return `0x${rs}1c`;
        case '1b':
        case '1c':
            return `0x${stripped}`;
        default:
            throw new Error(`Invalid v value: ${v}`);
    }
}
exports.fixRawSignature = fixRawSignature;
// ============ Byte Helpers ============
function stripHexPrefix(input) {
    if (input.indexOf('0x') === 0) {
        return input.substr(2);
    }
    return input;
}
exports.stripHexPrefix = stripHexPrefix;
function addressesAreEqual(addressOne, addressTwo) {
    if (!addressOne || !addressTwo) {
        return false;
    }
    return (stripHexPrefix(addressOne).toLowerCase() === stripHexPrefix(addressTwo).toLowerCase());
}
exports.addressesAreEqual = addressesAreEqual;
function hashString(input) {
    const hash = web3_1.default.utils.soliditySha3({ t: 'string', v: input });
    if (hash === null) {
        throw new Error(`soliditySha3 input was empty: ${input}`);
    }
    return hash;
}
exports.hashString = hashString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ldGgtc2lnbmluZy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFnQztBQUNoQyxnREFBd0I7QUFFeEIsb0NBQW1EO0FBRW5EOztHQUVHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBVyxnQ0FBZ0MsQ0FBQztBQUV6RTs7R0FFRztBQUNVLFFBQUEsV0FBVyxHQUFXLGtDQUFrQyxDQUFDO0FBRXRFOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQVcsb0NBQW9DLENBQUM7QUFFM0QsUUFBQSxvQkFBb0IsR0FBVyxvRkFBb0YsQ0FBQztBQUVwSCxRQUFBLG9CQUFvQixHQUFHO0lBQ2xDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0lBQ2hDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0lBQ25DLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0lBQ3BDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7Q0FDL0MsQ0FBQztBQUVXLFFBQUEsZ0NBQWdDLEdBQVcsMERBQTBELENBQUM7QUFFdEcsUUFBQSxnQ0FBZ0MsR0FBRztJQUM5QyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtJQUNoQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtJQUNuQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtDQUNyQyxDQUFDO0FBRUYsU0FBZ0IsY0FBYyxDQUM1QixPQUFlO0lBRWYsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLHNCQUFjLENBQUMsVUFBVSxDQUFDO1FBQy9CLEtBQUssc0JBQWMsQ0FBQyxPQUFP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