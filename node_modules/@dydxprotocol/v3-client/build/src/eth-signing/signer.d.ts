import Web3 from 'web3';
import { SigningMethod } from '../types';
export declare abstract class Signer {
    protected readonly web3: Web3;
    constructor(web3: Web3);
    /**
     * Returns a signable EIP712 Hash of a struct
     */
    getEIP712Hash(structHash: string): string;
    /**
     * Returns the EIP712 domain separator hash.
     */
    abstract getDomainHash(): string;
    protected ethSignTypedDataInternal(signer: string, data: {}, signingMethod: SigningMethod): Promise<string>;
    /**
     * Sign a message with `personal_sign`.
     */
    protected ethSignPersonalInternal(signer: string, message: string): Promise<string>;
}
