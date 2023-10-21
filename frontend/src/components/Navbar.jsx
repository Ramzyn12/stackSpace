import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { StacksMocknet } from "@stacks/network";
import { stringUtf8CV } from "@stacks/transactions";

const Navbar = () => {
  const [userData, setUserData] = useState(undefined);
  console.log(userData);
  const network = new StacksMocknet();
  const address = userData?.profile?.stxAddress?.testnet;

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Hello Stacks",
    icon: "https://freesvg.org/img/1541103084.png",
  };

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const handleLogin = () => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      userSession,
    });
  };

  const logUserOut = async () => {
    userSession.signUserOut();
    window.location.reload();
  }

  return (
    <div className="bg-indigo-500 py-2 text-slate-100 flex items-center justify-between px-20">
      <h1 className="text-2xl font-black">StackSpace</h1>
      <ul className="flex gap-6 items-center">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/marketplace"}>Marketplace</Link>
        </li>
        <li>
          <Link to={"/sellers"}>Sell</Link>
        </li>
        {!address && (
          <li>
            <button
              onClick={handleLogin}
              className="bg-slate-200 hover:bg-white duration-300 ease-in-out rounded-md px-3 py-2 text-indigo-800"
            >
              Connect Wallet
            </button>
          </li>
        )}
        {address && (
          <div className="flex flex-row items-center gap-4">
            <p>
              Logged in as: <b> {address}</b>
            </p>
            <button type="button" onClick={handleLogin}>
              Change Account
            </button>
            <button onClick={logUserOut} type="button">Log Out</button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
