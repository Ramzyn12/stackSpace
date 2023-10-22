import React from "react";
import magnify from "../assets/magnifying.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import wallet from "../assets/wallet.png";
import form from "../assets/form.png";
import { Link } from "react-router-dom";
const SellerInstruction = () => {
  return (
    <>
      {" "}
      <h1 className="text-center text-slate-800 text-6xl pt-10 font-black uppercase font-homeFont">
        List your property shares
      </h1>
      <h3 className="text-center text-slate-800 text-4xl pt-10 font-black uppercase font-homeFont">
        In 3 easy steps
      </h3>
      {/* Instructions */}
      <div className="p-16 flex justify-around">
        {/* Card One */}
        <div className="bg-white shadow-slate-500 shadow-lg w-[350px] flex flex-col gap-6 items-center justify-center p-8 rounded-xl">
          {/* E.g magnifying glass */}
          <img className="w-2/5 rounded-xl object-contain" src={wallet} />
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
        <div className="bg-white shadow-slate-500 shadow-lg w-[350px] flex flex-col gap-6 items-center justify-center p-8 rounded-xl">
          {/* E.g magnifying glass */}
          <img className="w-2/5 object-contain" src={magnify} />
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
        <div className="bg-white shadow-slate-500 shadow-lg w-[350px] flex flex-col gap-6 items-center justify-center p-8 rounded-xl">
          {/* E.g magnifying glass */}
          <img className="w-2/5 ml-6 object-right object-contain" src={form} />
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
      <div className="flex w-full mt-3 pb-20 justify-center">
        <Link to={'/sellers'}>
          <button className="text-white font-logoFont gap-2 tracking-wider flex items-center text-2xl transform hover:translate-x-1 hover:-translate-y-1 duration-300 ease-in-out rounded-md px-5 py-3 bg-gradient-to-t from-green-600 to-green-500 hover:from-indigo-600 hover:to-indigo-500">
            Make Your First Sale
            <FontAwesomeIcon icon={faLocationArrow} className="text-xl" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default SellerInstruction;
