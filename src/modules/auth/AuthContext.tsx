import React, { useEffect, useState } from 'react';
import { Account, Verification } from '@/types';
import { arweave, connect, getAccount, webWallet } from '@/lib/api';

const AuthContext = React.createContext<{
  walletAddress?: string;
  account?: Account;
  connecting?: boolean;
  verification?: Verification;
  setState: React.Dispatch<
    React.SetStateAction<{
      connecting?: boolean;
      walletAddress?: string | undefined;
      account?: Account | undefined;
      verification?: Verification | undefined;
    }>
  >;
}>({ connecting: false, setState: () => {} });

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<{
    connecting?: boolean;
    walletAddress?: string;
    account?: Account;
    verification?: Verification;
  }>({
    connecting: false,
  });

  // useEffect(() => {
  //   checkForAddress();
  // }, []);

  // const checkForAddress = async () => {
  //   if (!webWallet.address) {
  //     window.addEventListener('arweaveWalletLoaded', async () => {
  //       // get the currently used wallet's address. "arweave-js" will handle everything under the hood (permissions, etc.)
  //       // important: this funciton returns a promise and it will not be resolved until the user logs in
  //       const addr = await arweave.wallets.getAddress();
  //       if (addr) {
  //         const userAccount = await getAccount(addr);
  //         if (await userAccount) {
  //           setState({ walletAddress: addr, account: userAccount });
  //         } else {
  //           setState({ walletAddress: addr });
  //         }
  //       }
  //     });
  //   }

  //   window.addEventListener('walletSwitch', async (e) => {
  //     const newAddr = e.detail.address;
  //     if (newAddr) {
  //       const userAccount = await getAccount(newAddr);
  //       if (await userAccount) {
  //         setState({ walletAddress: newAddr, account: userAccount });
  //       } else {
  //         setState({ walletAddress: newAddr });
  //       }
  //     }
  //   });

  //   return () =>
  //     window.removeEventListener('walletSwitch', () => {
  //       setState({ walletAddress: null });
  //     });
  // };

  // useEffect(() => {
  //   webWallet.on('change', () => {
  //     if (webWallet.address) {
  //       setState({ walletAddress: webWallet.address });
  //     }

  //     if (!webWallet.address) {
  //       setState({ walletAddress: '' });
  //     }
  //   });
  // });

  return (
    <AuthContext.Provider
      value={{
        walletAddress: state.walletAddress,
        account: state.account,
        connecting: state.connecting,
        setState: setState,
        verification: state.verification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
