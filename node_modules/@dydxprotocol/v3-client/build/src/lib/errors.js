"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappedError = exports.CustomError = void 0;
/**
 * Base class for custom errors.
 */
class CustomError extends Error {
    constructor(message) {
        super(message);
        // Set a more specific name. This will show up in e.g. console.log.
        this.name = this.constructor.name;
    }
}
exports.CustomError = CustomError;
/**
 * Base class for a custom error which wraps another error.
 */
class WrappedError extends CustomError {
    constructor(message, originalError) {
        super(message);
        this.originalError = originalError;
    }
}
exports.WrappedError = WrappedError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSCxNQUFhLFdBQVksU0FBUSxLQUFLO0lBQ3BDLFlBQVksT0FBZTtRQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7QUFORCxrQ0FNQztBQUVEOztHQUVHO0FBQ0gsTUFBYSxZQUFhLFNBQVEsV0FBVztJQUczQyxZQUNFLE9BQWUsRUFDZixhQUFvQjtRQUVwQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFWRCxvQ0FVQyJ9