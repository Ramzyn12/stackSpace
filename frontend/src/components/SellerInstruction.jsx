import React from "react";
import magnify from "../assets/magnifying.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const SellerInstruction = () => {
  return (
    <>
      {" "}
      <h1 className="text-center text-slate-200 text-6xl pt-10 font-black uppercase font-homeFont">
        List your property shares
      </h1>
      <h3 className="text-center text-slate-200 text-4xl pt-10 font-black uppercase font-homeFont">
        In 3 easy steps
      </h3>
      {/* Instructions */}
      <div className="p-16 flex justify-around">
        {/* Card One */}
        <div className="bg-slate-200 shadow-slate-800 shadow-xl w-[350px] flex flex-col gap-3 items-center justify-center p-8 rounded-xl">
          {/* E.g magnifying glass */}
          <img className="w-3/5 object-contain" src={magnify} />
          {/* title e.g Find Address */}
          <h1 className="font-black text-3xl">Connect Wallet</h1>
          {/* Explanation */}
          <p className="text-center">
            Click on find address and search Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Impedit et minima possimus doloribus
            saepe veritatis reiciendis iste recusandae, id delectus cum, odio
            labore sequi odit?
          </p>
        </div>
        <div className="bg-slate-200 shadow-slate-800 shadow-xl w-[350px] flex flex-col gap-3 items-center justify-center p-8 rounded-xl">
          {/* E.g magnifying glass */}
          <img className="w-3/5 object-contain" src={magnify} />
          {/* title e.g Find Address */}
          <h1 className="font-black text-3xl">Find Address</h1>
          {/* Explanation */}
          <p className="text-center">
            Click on find address and search Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Impedit et minima possimus doloribus
            saepe veritatis reiciendis iste recusandae, id delectus cum, odio
            labore sequi odit?
          </p>
        </div>
        <div className="bg-slate-200 shadow-slate-800 shadow-xl w-[350px] flex flex-col gap-3 items-center justify-center p-8 rounded-xl">
          {/* E.g magnifying glass */}
          <img className="w-3/5 object-contain" src={magnify} />
          {/* title e.g Find Address */}
          <h1 className="font-black text-3xl">Complete form</h1>
          {/* Explanation */}
          <p className="text-center">
            Click on find address and search Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Impedit et minima possimus doloribus
            saepe veritatis reiciendis iste recusandae, id delectus cum, odio
            labore sequi odit?
          </p>
        </div>
      </div>
      {/* CTA */}
      <div className="flex w-full mt-10 pb-20 justify-center">
        <button className="text-indigo-800 flex gap-2 items-center text-2xl hover:bg-indigo-700 duration-300 ease-in-out rounded-md px-8 py-3 bg-white">
          Let's Get To Selling
          <FontAwesomeIcon icon={faLocationArrow}/>
        </button>
      </div>
    </>
  );
};

export default SellerInstruction;
