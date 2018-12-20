import Web3 from 'web3';
import Accounts from 'web3/eth/accounts';
import { HttpProvider } from 'web3/providers';
import { constants } from './shared';
import { web3 } from './web3Client';

interface IEthereumProvider extends HttpProvider {
  enable(): Promise<void>;
}

interface IParams {
  provider?: string | HttpProvider;
  privateKey?: string;
}

type Wallet = Accounts['wallet'];

interface IWeb3Wallet
  extends Wallet,
  Array<{
    address?: string;
  }> { }

export interface IContext extends LowLevel {
  isTestnet: () => boolean;
}

/**
 * Temporary module to interact directly with
 * the smart contracts while we wait for the LowLevel API to be implemented
 */
export class LowLevel {
  private networkId: constants.NetworkIds = -1;

  constructor(params: IParams = {}) {
    const { provider, privateKey } = params;
    let auxProvider: HttpProvider | null;
    if (!provider) {
      auxProvider = this.getBrowserProvider();
    } else if (typeof provider === 'string') {
      auxProvider = new Web3.providers.HttpProvider(provider);
    } else {
      auxProvider = provider;
    }

    if (auxProvider === null) {
      throw new Error(
        `No provider or provider URL was passed to the constructor and there is \
        no provider injected into the browser. If this instance is running in \
        a browser, make sure you have MetaMask installed and enabled.`,
      );
    }

    web3.setProvider(auxProvider);

    if (privateKey) {
      web3.eth.accounts.wallet.add(privateKey);
    }
  }

  public isTestnet() {
    return this.networkId !== 1;
  }

  public async getAccount() {
    const nodeAccounts = await web3.eth.getAccounts();
    const walletAccount = (web3.eth.accounts.wallet as IWeb3Wallet)[0] || {};

    return nodeAccounts[0] || walletAccount.address;
  }

  public getNetworkId() {
    return this.networkId;
  }

  private getBrowserProvider() {
    if (!window) {
      return null;
    }

    const win = window as {
      web3?: Web3;
      ethereum?: IEthereumProvider;
    };

    const { ethereum, web3: w3 } = win;
    const isModern = !!ethereum;
    const isLegacy = !isModern && !!w3;

    if (isModern) {
      const web3Provider = ethereum as IEthereumProvider;
      return web3Provider;
    }
    if (isLegacy) {
      const web3Instance = w3 as Web3;
      return web3Instance.currentProvider as HttpProvider;
    }

    return null;
  }
}
