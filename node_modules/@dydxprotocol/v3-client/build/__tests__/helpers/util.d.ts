/**
 * Utilities for writing unit tests with Jest.
 */
/// <reference types="jest" />
declare type Fn = (...args: any[]) => any;
declare type FnMock<F extends Fn> = jest.Mock<ReturnType<F>, Parameters<F>>;
declare type ObjMock<T extends {}> = {
    [K in keyof T]: T[K] extends Fn ? FnMock<T[K]> : ObjMock<T[K]>;
};
declare type Module = {
    [param: string]: Fn;
};
declare type ModuleMock<M extends Module> = {
    [K in keyof M]: M[K] extends Fn ? FnMock<M[K]> : ObjMock<M[K]>;
};
/**
 * Wrap a mocked function or module with the appropriate Jest mock typings.
 */
export declare function asMock<F extends Fn>(mock: F): FnMock<F>;
export declare function asMock<M extends Module>(mock: M): ModuleMock<M>;
export {};
