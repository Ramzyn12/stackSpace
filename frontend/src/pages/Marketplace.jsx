import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import MarketGrid from "../components/MarketGrid";

const Marketplace = () => {
  const [useAiSearch, setUseAiSearch] = useState(true);

  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [formData, setFormData] = useState(null); // initially empty, will hold the form data later
  const [aiSearchText, setAiSearchText] = useState("");

  const handleNormalSubmit = (e) => {
    e.preventDefault();

    const newFormData = {
      area: location, // assuming 'area' is the correct parameter for the API
      radius: radius,
      minimum_price: minPrice, // mapping 'minPrice' to 'min_price', which the API expects
      maximum_price: maxPrice, // mapping 'maxPrice' to 'max_price'
      // ... any other transformations needed
    };

    setFormData(newFormData); // update the
  };

  const handleAISearchSubmit = (e) => {
    e.preventDefault();

    console.log("ai search text", aiSearchText);
    // setFormData({});
    callTextractionApi(aiSearchText);
  };

  const callTextractionApi = async (description) => {
    // The URL and headers for your API call remain unchanged
    const url = "https://ai-textraction.p.rapidapi.com/textraction";
    const headers = {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '9d5f48c667mshcf0881338a109cdp154bdfjsne5c82dfd8e57',
        'X-RapidAPI-Host': 'ai-textraction.p.rapidapi.com'
    };

    // Update the body to use the description from your form (or state)
    const body = JSON.stringify({
      text: description, // your dynamic description here
      entities: [
        {
          description: "furnished state",
          type: "string",
          var_name: "furnished",
          valid_values: ["furnished", "unfurnished"],
        },

        {
          description: "key feature of property in a small sentence",
          type: "string",
          var_name: "keywords",
        },
        {
          description: "area location",
          type: "string",
          var_name: "area",
        },
        {
          description: "number of bedrooms",
          type: "float",
          var_name: "minimum_beds",
        },

        {
          description: "radius of area",
          type: "integer",
          var_name: "radius",
        },
        {
          description: "whether pets are allowed or not",
          type: "boolean",
          var_name: "pets_allowed",
        },
      ],
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      const result = await response.json(); // or `await response.text();` if the response is text.
      console.log('ai Result', result.results)
      setFormData(result.results);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-600">
      <main className="px-20 flex flex-col items-center">
        <div className="py-8 ">
          <h3 className="text-3xl text-slate-200 font-black ">
            Describe your dream home and we'll do the rest!
          </h3>
          <h1 className="text-xl mt-3 text-slate-200 font-black ">
            Include as much detail as possible to ensure we find the perfect fit for you
          </h1>
          {/* controls */}
          {/* <div className="py-6 flex gap-8">
            <button
              onClick={() => setUseAiSearch(true)}
              className="px-6 py-3 bg-green-600 text-slate-200"
            >
              AI Search
            </button>
            <button
              onClick={() => setUseAiSearch(false)}
              className="px-6 py-3 bg-green-600 text-slate-200"
            >
              Normal
            </button>
          </div> */}
          {/* normal Search */}
          {!useAiSearch && (
            <form
              onSubmit={handleNormalSubmit}
              className="flex gap-5 items-end"
            >
              <div className="flex flex-col w-[260px] gap-1">
                <label
                  htmlFor="location"
                  className="font-bold text-lg text-white"
                >
                  Enter a location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g Oxford or NW3"
                  className="p-2 px-4 rounded bg-slate-200"
                ></input>
              </div>
              <div className="flex flex-col w-[260px] gap-1">
                <label
                  htmlFor="radius"
                  className="font-bold text-lg text-white"
                >
                  Radius
                </label>
                <input
                  type="text"
                  id="radius"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="e.g 2 miles"
                  className="p-2 px-4 rounded bg-slate-200"
                ></input>
              </div>
              <div className="flex flex-col w-[260px] gap-1">
                <label
                  htmlFor="minPrice"
                  className="font-bold text-lg text-white"
                >
                  Min Price
                </label>
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  id="minPrice"
                  placeholder="e.g $200,000"
                  className="p-2 rounded px-4 bg-slate-200"
                ></input>
              </div>
              <div className="flex flex-col w-[260px] gap-1">
                <label
                  htmlFor="maxPrice"
                  className="font-bold text-lg text-white"
                >
                  Max Price
                </label>
                <input
                  type="text"
                  id="maxPrice"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g $500,000"
                  className="p-2 rounded px-4 bg-slate-200"
                ></input>
              </div>
              <button
                type="submit"
                className="text-lg bg-green-700 text-slate-200 flex items-center gap-2 px-6 py-2 rounded"
              >
                Search
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
              </button>
            </form>
          )}
          {useAiSearch && (
            <form onSubmit={handleAISearchSubmit} className="max-w-2xl mt-6">
              <textarea
                type="text"
                cols={20}
                onChange={(e) => setAiSearchText(e.target.value)}
                value={aiSearchText}
                placeholder="e.g 4 bedroom house near a gym where the garden has a pond..."
                className="w-full rounded p-3 pb-32 text-lg"
              ></textarea>
              <button
                type="submit"
                className="text-lg bg-green-700 text-slate-200 flex items-center justify-center w-full gap-2 px-6 py-2 rounded"
              >
                Search
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
              </button>
            </form>
          )}
        </div>
        <MarketGrid formData={formData} />
      </main>
    </div>
  );
};

export default Marketplace;
