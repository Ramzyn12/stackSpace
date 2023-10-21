import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { AppConfig, UserSession, openContractCall } from "@stacks/connect";
import { StacksMocknet } from "@stacks/network";
import { db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { uintCV } from "@stacks/transactions";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9d5f48c667mshcf0881338a109cdp154bdfjsne5c82dfd8e57",
    "X-RapidAPI-Host": "uk-postcode.p.rapidapi.com",
  },
};

const Sell = () => {
  const [pricePerShare, setPricePerShare] = useState("");
  const [totalShares, setTotalShares] = useState("");
  const [postCode, setPostCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [findPostCode, setFindPostCode] = useState("");
  const [userData, setUserData] = useState(undefined);
  const [image, setImage] = useState("");
  const address = userData?.profile?.stxAddress?.testnet;

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Hello Stacks",
    icon: "https://freesvg.org/img/1541103084.png",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file chosen");
    } else if (!file.type.startsWith("image/")) {
      console.log("Not an image file");
    } else {
      setImage(file); // Update your state with the chosen file
    }
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

  const handleHouseListing = async (e) => {
    e.preventDefault();

    const network = new StacksMocknet();

    const houseId = 125; // a random house-id for demonstration
    const pricePerShareInMicroSTX = pricePerShare; // you need to make sure this is in the smallest denomination, which is usually measured in micro-units of the currency
    const pricePerShareInSTX = pricePerShareInMicroSTX * 1000000; // you need to make sure this is in the smallest denomination, which is usually measured in micro-units of the currency

    const totalSharesForSale = totalShares;

    const functionArgs = [
      uintCV(houseId),
      uintCV(pricePerShareInSTX),
      uintCV(totalSharesForSale),
    ];

    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "hello-stacks",
      functionName: "list-house-for-sale",
      functionArgs,
      network,
      appDetails,
      onFinish: (data) => {
        console.log("Transaction ID:", data.txId);
        console.log("Transaction:", data);
        // Here, you might want to show a confirmation to the user, reset form fields, etc.
      },
    };

    await openContractCall(options);
    if (image == null) return;

    const imageRef = ref(storage, `images/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    // Get the download URL for the uploaded image
    const url = await getDownloadURL(imageRef);
    console.log(url)

    try {
      const docRef = await addDoc(collection(db, "houseListings"), {
        houseId: houseId, // this could be a more unique identifier
        image_url: url,
        last_sale_price: "200000",
        num_bedrooms: 3,
        num_bathrooms: 3,
        num_floors: 2,
        title: "fake house for testing",
        last_published_date: "2023-10-20 12:54:04",
        address: {
          line2: "...",
          city: "London",
          postCode: postCode,
        },
        displayable_address: "latest ",
        shares: totalSharesForSale,
        pricePerShare: pricePerShareInSTX,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    console.log(pricePerShare, totalShares, postCode);
    setPricePerShare("");
    setTotalShares("");
    setPostCode("");
  };

  const handleFindAddress = async (e) => {
    e.preventDefault();

    const url = `https://uk-postcode.p.rapidapi.com/search?q=${findPostCode
      .trim()
      .slice(0, 3)}%20${findPostCode.trim().slice(3, 6)}&limit=10`;

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const finalInfo = result.results[0];
      setCity(finalInfo.locality);
      setStreetName(finalInfo.streetName);
      setPostCode(findPostCode.toUpperCase());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-600 pb-32">
      {/* search bar */}
      <form onSubmit={handleFindAddress} className="w-full flex bg-blue-300">
        <input
          type="text"
          placeholder="Enter Postcode"
          onChange={(e) => setFindPostCode(e.target.value)}
          value={findPostCode}
          className=" flex-1 border p-2 border-gray-300"
        />
        <button className="py-3 px-6 bg-slate-200 text-red rounded">
          Find Address
        </button>
      </form>
      {/* main info for selling shares */}
      <form onSubmit={handleHouseListing} className="px-32 flex flex-col">
        {/* description */}
        <div>
          <h1 className="font-bold text-4xl text-slate-200 mt-10">
            Tokenise and Sell a fraction of your house
          </h1>
          <h3 className="text-xl text-slate-200 py-4 max-w-xl">
            Remember the more information you give about your property the more
            likely it is people find it.
          </h3>
        </div>

        <div className="bg-slate-200 mt-10 p-8 rounded-md flex gap-5 flex-col">
          <p>Manually Add Address</p>
          {/* jagged box */}
          <div className="w-full gap-8 items-center justify-between flex">
            <label className="w-[140px]">Address Line 1</label>
            <input
              type="text"
              onChange={(e) => setStreetName(e.target.value)}
              value={streetName}
              placeholder="E.g 74 crostfield"
              className=" flex-1 border p-2 border-gray-300"
            />
          </div>
          <div className="w-full gap-8 items-center justify-between flex">
            <label className="w-[140px]">Address Line 2</label>
            <input
              type="text"
              placeholder="E.g 74 crostfield"
              className=" flex-1 border p-2 border-gray-300"
            />
          </div>
          <div className="w-full gap-8 items-center justify-between flex">
            <label className="w-[140px]">City</label>
            <input
              type="text"
              placeholder="London"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className=" flex-1 border p-2 border-gray-300"
            />
          </div>
          <div className="w-full gap-8 items-center justify-between flex">
            <label className="w-[140px]">Post Code</label>
            <input
              type="text"
              placeholder="E.g AY7 5NA"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              className=" flex-1 border p-2 border-gray-300"
            />
          </div>
        </div>
        {false && (
          <div className="flex mt-10 items-center justify-between">
            <div>
              <h1 className="text-3xl py-2 text-slate-200 font-black">
                Current Evaluation
              </h1>
              <h1 className="text-4xl">
                <span className="text-green-300">334038493874 STX</span> /{" "}
                <span className="text-red-200">$45084754</span>
              </h1>
            </div>

            <button className="px-5 py-3  rounded bg-green-300 text-black">
              Ready to Tokenise?
            </button>
          </div>
        )}
        {/* upload photos */}
        {true && (
          <div className="bg-slate-200 mt-10 p-8 rounded-md flex gap-5 flex-col">
            <p>Add up to 10 photos</p>
            {/* jagged box */}
            <div className="w-full py-20 flex items-center justify-center border-black border-4 border-dotted">
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                style={{ display: "none" }} // This hides the default file input
                accept="image/*" // Optional: this attribute limits the file picker dialog to only show image files
              />
              <label htmlFor="imageInput" className="cursor-pointer">
                {/* The label acts as your "button". When the user clicks this label, it will open the file picker dialog. */}
                <div className="p-5 border border-black rounded-sm gap-2 flex items-center">
                  <span>Add photo</span>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </label>
              {/* You could display the chosen image name here or a thumbnail of the image */}
              {image && <p>Chosen file: {image.name}</p>}
            </div>
          </div>
        )}
        <div className="bg-slate-200 mt-10 p-8 rounded-md flex gap-5 flex-col">
          <p>How many shares are you selling?</p>
          {/* jagged box */}
          <div className="w-full gap-8 items-center justify-between flex">
            <label className="w-[140px]">Shares to sell</label>
            <input
              type="text"
              value={totalShares}
              onChange={(e) => setTotalShares(e.target.value)}
              required
              placeholder="20"
              className=" flex-1 border p-2 border-gray-300"
            />
          </div>
          <div className="w-full gap-8 items-center justify-between flex">
            <label className="w-[140px]">Price per share (STX)</label>
            <input
              type="text"
              value={pricePerShare}
              onChange={(e) => setPricePerShare(e.target.value)}
              required
              placeholder="300 STX"
              className=" flex-1 border p-2 border-gray-300"
            />
          </div>
        </div>
        {/* controls */}
        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="py-3 px-6 bg-green-500 mt-10 text-red rounded"
          >
            Sell your shares
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sell;
