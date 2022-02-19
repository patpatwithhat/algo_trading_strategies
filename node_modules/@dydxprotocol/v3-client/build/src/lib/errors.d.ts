/**
 * Base class for custom errors.
 */
export declare class CustomError extends Error {
    constructor(message: string);
}
/**
 * Base class for a custom error which wraps another error.
 */
export declare class WrappedError extends CustomError {
    readonly originalError: Error;
    constructor(message: string, originalError: Error);
}
