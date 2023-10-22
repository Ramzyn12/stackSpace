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

  const handleAISearchSubmit = (e) => {
    e.preventDefault();

    console.log("ai search text", aiSearchText);
    // setFormData({});
    callTextractionApi(aiSearchText);
    setAiSearchText("");
  };

  const callTextractionApi = async (description) => {
    // The URL and headers for your API call remain unchanged
    const url = "https://ai-textraction.p.rapidapi.com/textraction";
    const headers = {
      "content-type": "application/json",
      "X-RapidAPI-Key": "41d741e89amshc782edaa26c8d9ap1993bajsn0e035e65a140",
      "X-RapidAPI-Host": "ai-textraction.p.rapidapi.com",
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
      console.log("ai Result", result.results);
      setFormData(result.results);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      ›
      <main className="px-20 flex flex-col items-center">
        <div className="py-8 p-6 rounded-xl mt-10 bg-slate-200  flex flex-col justify-center items-center">
          <h3 className="text-3xl text-slate-800 font-black ">
            Describe your dream home and we'll do the rest!
          </h3>
          <h1 className="text-xl mt-3 text-slate-800 font-black ">
            Include as much detail as possible to ensure we find the perfect fit
            for you
          </h1>
          {useAiSearch && (
            <form
              onSubmit={handleAISearchSubmit}
              className="max-w-2xl w-full mt-6"
            >
              <textarea
                type="text"
                cols={20}
                onChange={(e) => setAiSearchText(e.target.value)}
                value={aiSearchText}
                placeholder="e.g 4 bedroom house near a gym where the garden has a pond..."
                className="w-full rounded p-3  pb-32 text-lg"
              ></textarea>
              <button
                type="submit"
                className=" font-logoFont text-lg bg-gradient-to-t w-full gap-2 flex items-center hover:scale-y-105 justify-center from-green-600 to-green-500  hover:from-indigo-600 hover:to-indigo-500 duration-300 ease-in-out rounded-md px-3 py-2 text-white"
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
