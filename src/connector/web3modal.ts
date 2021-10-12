import Web3Modal from "web3modal";
import Web3 from "web3";

//  // Web3modal instance
let web3Modal;

//  // Chosen wallet provider given by the dialog window
let provider: any;

export const web3Provider = async () => {
  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
  });

  try {
    provider = await web3Modal.connect();
    provider.on("connect", (info: { chainId: number }) => {
      console.log("connected: ", info);
    });
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }
  
  subscribeToEvents();
  const web3 = new Web3(provider);

  return web3;
};

const subscribeToEvents = async () => {
  provider.on("accountsChanged", (accounts: string) => {
   return accounts[0];
  });


  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: any) => {
    console.log(chainId);
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId: any) => {
    return networkId;
  });

  await refreshAccountData();
};

const ethereum = window.ethereum;

export const refreshAccountData = async () => {
  const networkId = await ethereum.networkVersion;
  const accounts = await ethereum.request({ method: "eth_accounts" });

  if (accounts?.length) {
   
  }
};
