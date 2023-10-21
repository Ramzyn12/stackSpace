import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import fakeHouse from "../assets/housePic.jpeg";
import React, { useState, useEffect, useRef } from "react";
import { faBathtub, faBed, faStairs } from "@fortawesome/free-solid-svg-icons";
// import allData from "../data/data.json";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { StacksMocknet } from "@stacks/network";
import { uintCV, PostConditionMode } from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
const BASE_URL = "https://zoopla.p.rapidapi.com/properties/list";
const defaultParams = {
  area: "Oxford",
  order_by: "age",
  ordering: "descending",
  listing_status: "sale",
  page_number: "1",
  page_size: "40",
};
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9d5f48c667mshcf0881338a109cdp154bdfjsne5c82dfd8e57",
    "X-RapidAPI-Host": "zoopla.p.rapidapi.com",
  },
};

function getDaysAgo(dateString) {
  // Parse the date string
  const datePosted = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const msDifference = currentDate - datePosted;

  // Convert the difference to days
  const daysDifference = Math.floor(msDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

const MarketGrid = ({ formData }) => {
  const [pageData, setPageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [sharesInput, setSharesInput] = useState([]);

  const isFirstRender = useRef(true); // Create a ref to keep track of the first render
  const appDetails = {
    name: "Hello Stacks",
    icon: "https://freesvg.org/img/1541103084.png",
  };

  const fetchFirestoreData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "houseListings"));
      const firestoreData = querySnapshot.docs.map((doc) => doc.data());
      return firestoreData; // returns an array of houseListing documents
    } catch (error) {
      console.error("Error fetching Firestore data: ", error);
    }
  };

  // Function to fetch a page of house data
  const fetchData = async (formData) => {
    if (!formData) return;
    try {
      const params = { ...defaultParams, ...formData }; // Overwrite the default page_number with the current page
      const urlParams = new URLSearchParams(params);
      const fullUrl = `${BASE_URL}?${urlParams.toString()}`;

      const response = await fetch(fullUrl, options); // Use the fullUrl and options
      const allData = await response.json();
      const houses = allData.listing; // Assume pages are 0-indexed in the data
      const firestoreData = await fetchFirestoreData();
      const combinedData = houses.concat(firestoreData);
      // console.log(combinedData);
      setPageData(combinedData);

      // Initialize shares input state
      const initialSharesState = combinedData.map(() => ({ shares: 0 }));
      setSharesInput(initialSharesState);
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };

  const handleSharesChange = (index, value) => {
    const updatedSharesInput = [...sharesInput];
    updatedSharesInput[index].shares = value;
    setSharesInput(updatedSharesInput);
  };

  const handleBuy = async (index) => {
    const selectedHouse = pageData[index];
    const numberOfShares = sharesInput[index].shares;

    // Define the Stacks network you're working with, change to mainnet when needed
    const network = new StacksMocknet(); // or use StacksMainnet() for mainnet

    // Set up the transaction options
    const txOptions = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "hello-stacks",
      functionName: "purchase-shares",
      functionArgs: [
        uintCV(selectedHouse.houseId), // assuming houseId is an integer
        uintCV(numberOfShares),
      ],
      appDetails,
      network,
      postConditionMode: PostConditionMode.Allow, // whether the tx should fail when unexpected assets are transferred
      // Explicitly set to an empty array
      onFinish: (data) => {
        console.log("Transaction ID:", data.txId);
        console.log("Transaction success:", data.txId); // you may want to fetch and display transaction status to the user
        // handleSharesChange(index, 0); // reset the input after successful transaction
      },
    };

    try {
      // Open the transaction signing popup
      await openContractCall(txOptions);
    } catch (e) {
      console.error("Error sending transaction:", e);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Update the ref to indicate that the first render is complete
    } else {
      fetchData(formData); // Fetch new data when formData changes, but not on the first render
    }
  }, [formData]);

  return (
    <div className="grid grid-cols-3 gap-10 ">
      {pageData.map((house, index) => (
        <div key={index} className="flex flex-col w-[380px] shadow-xl rounded">
          {/* image container */}
          <div className="w-full h-[200]px">
            <img src={house.image_url} className="w-full object-cover" />
          </div>
          {/* info */}
          <div className="text-slate-200 p-2">
            <h1>
              {house.last_sale_price
                ? ((Number(house.last_sale_price) * 1.8) / 100).toFixed(0)
                : house.price
                ? ((Number(house.price) * 1.8) / 100).toFixed(0)
                : house.pricePerShare}
              STX Per Share
            </h1>
            <div className="flex gap-3">
              {house.num_bedrooms != null && house.num_bedrooms !== "" && (
                <p>
                  {house.num_bedrooms} <FontAwesomeIcon icon={faBed} />
                </p>
              )}
              {house.num_bathrooms != null && house.num_bathrooms !== "" && (
                <p>
                  {house.num_bathrooms} <FontAwesomeIcon icon={faBathtub} />
                </p>
              )}
              {house.num_floors != null && house.num_floors !== "" && (
                <p>
                  {house.num_floors} <FontAwesomeIcon icon={faStairs} />
                </p>
              )}
            </div>
            <p>{house.title}</p>
            <p>{house.displayable_address}</p>
            <p>
              Posted
              {(() => {
                const daysAgo = getDaysAgo(
                  house.last_published_date.slice(0, 10)
                );
                return daysAgo > 0 ? ` ${daysAgo} days ago` : " Today"; // Return the appropriate message
              })()}
            </p>

            <div className="text-slate-200 p-2">
              <input
                type="number"
                value={sharesInput[index].shares}
                onChange={(e) => handleSharesChange(index, e.target.value)}
                className="border-2 border-gray-300"
                style={{ width: "100px" }} // Adjust styling as needed
              />
              <button
                onClick={() => handleBuy(index)}
                className="bg-blue-500 text-white mt-2"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketGrid;
