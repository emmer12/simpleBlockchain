import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { Nav } from "./components";
import LoggedInView from "./pages/loggedInView";
import { useWeb3React  } from "@web3-react/core";
import { injected } from "./connector/injected";


declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}


function App() {

  const {account,activate,deactivate,connector} = useWeb3React()
  
  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      connector?.deactivate()
      await deactivate()
      await injected.deactivate()

    } catch (ex) {
      console.log(ex)
    }
  }


  return (
    <div className="">
      <Nav account={account} handleLogout={disconnect}  />

      <div className="flex justify-center items-center bg-gray-100 body">
        {account ? (
            <LoggedInView />
        ) : (
          <button onClick={connect} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
            Connect Wallet 
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
