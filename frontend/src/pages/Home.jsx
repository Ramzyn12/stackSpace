import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { useState, useEffect } from "react";
import { StacksMocknet } from "@stacks/network";
import { stringUtf8CV } from "@stacks/transactions";

import React from "react";
import homeImage from "../assets/home.png";
import SellerInstruction from "../components/SellerInstruction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Home = () => {
  // const retrieveMessage = async () => {
  //   const retrievedMessage = await fetch(
  //     "http://localhost:3999/extended/v1/tx/events?" +
  //       new URLSearchParams({
  //         tx_id: transactionId,
  //       })
  //   );
  //   const responseJson = await retrievedMessage.json();
  //   setCurrentMessage(responseJson.events[0].contract_log.value.repr);
  // };

  return (
    <main className="min-h-screen bg-slate-100 px-20">
      {/* Left side */}
      <div className="flex h-screen">
        <div className="w-1/2 flex flex-col text-slate-800 gap-10 justify-center">
          <h3 className="text-3xl text-homeFont uppercase font-black">
            Welcome to the future
          </h3>
          <h1 className="text-7xl font-homeFont uppercase font-black">
            Redefining Home Ownership for the Digital Age
          </h1>
          <h3 className="text-3xl">
            A modern marketplace for trading property shares
          </h3>
          {/* Controls */}
          <div className="flex gap-4">
            <Link to={'/marketplace'}>
              <button className="text-white font-logoFont gap-2 tracking-wider flex items-center text-2xl transform hover:translate-x-1 hover:-translate-y-1 duration-300 ease-in-out rounded-md px-5 py-3 bg-gradient-to-t from-green-600 to-green-500 hover:from-indigo-600 hover:to-indigo-500">
                Visit Marketplace
                <FontAwesomeIcon icon={faLocationArrow} className="text-xl" />
              </button>
            </Link>
          </div>
        </div>
        {/* Right side */}
        <div className="w-1/2 flex justify-center items-center">
          <img className="w-3/4 object-cover" src={homeImage} />
        </div>
      </div>
      <SellerInstruction />
      {/* {!userData && (
        <button
          className="p-4 bg-indigo-500 rounded text-white"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )} */}
      {/* {userData && (
        <div className="flex gap-4">
          <input
            className="p-4 border border-indigo-500 rounded"
            placeholder="Write message here..."
            onChange={handleMessageChange}
            value={message}
          />
          <button
            className="p-4 bg-indigo-500 rounded text-white"
            onClick={submitMessage}
          >
            Submit New Message
          </button>
        </div>
      )} */}
      {/* <div className="flex gap-4">
        <input
          className="p-4 border border-indigo-500 rounded"
          placeholder="Paste transaction ID to look up message"
          onChange={handleTransactionChange}
          value={transactionId}
        />
        <button
          className="p-4 bg-indigo-500 rounded text-white"
          onClick={retrieveMessage}
        >
          Retrieve Message
        </button>
      </div> */}
      {/* {currentMessage.length > 0 ? (
        <p className="text-2xl">{currentMessage}</p>
      ) : (
        ""
      )} */}
    </main>
  );
};

export default Home;
