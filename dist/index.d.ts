import { HttpProvider } from 'web3/providers';
import { constants } from './shared';
interface IParams {
    provider?: string | HttpProvider;
    privateKey?: string;
}
export interface IContext extends LowLevel {
    isTestnet: () => boolean;
}
/**
 * Temporary module to interact directly with
 * the smart contracts while we wait for the LowLevel API to be implemented
 */
export declare class LowLevel {
    private networkId;
    constructor(params?: IParams);
    isTestnet(): boolean;
    getAccount(): Promise<string | undefined>;
    getNetworkId(): constants.NetworkIds;
    private getBrowserProvider;
}
export {};
