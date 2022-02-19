"use strict";
/**
 * Utilities for writing unit tests with Jest.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.asMock = void 0;
function asMock(mock) {
    if (typeof mock === 'function') {
        return mock;
    }
    return mock;
}
exports.asMock = asMock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL19fdGVzdHNfXy9oZWxwZXJzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7QUFvQkgsU0FBZ0IsTUFBTSxDQUFDLElBQWlCO0lBQ3RDLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQzlCLE9BQU8sSUFBMkIsQ0FBQztLQUNwQztJQUNELE9BQU8sSUFBK0IsQ0FBQztBQUN6QyxDQUFDO0FBTEQsd0JBS0MifQ==