"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NFTModel, UpdatedIMG } from "@/components";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";

function index() {
   const router = useRouter();
   const [nftList, setNFTS] = useState<any[]>();
   const [loading, isLoading] = useState(true);
   const [addressWallet, setAddressWallet] = useState(
      "J5HxijcGXuzj9K7ynxenKjrUeekDewy7HYW3q3jx5mci",
   );
   const NFTs = useSelector((state: any) => state.signerReducer.NFTs);
   const { publicKey } = useWallet();

   const backClick = () => {
      router.back();
   };

   return (
      <div className=" w-screen min-h-screen flex flex-col bg-white">
         <p
            onClick={() => backClick()}
            className=" absolute left-5 top-5 hover:-translate-x-2  w-[40px] h-[40px] bg-[#E2EAB0] rounded-xl flex justify-center items-center"
         >
            &#8592;
         </p>
         <div className=" w-full h-[500px] bg-white">
            <UpdatedIMG name={"Background"} />
            <div className=" flex w-full h-[250px] max-sm:pt-10 gap-2 items-end px-[10%] -translate-y-40">
               <UpdatedIMG name={"Avatar"} />
               <div className=" h-[50px] flex justify-center items-center rounded-xl bg-gradient-to-br from-[#E55D87] to-[#5FC3E4]">
                  <span className=" text-black font-bold text-3xl max-sm:text-sm px-[10px] flex items-end">
                     {`${addressWallet.substring(0, 6)}...${addressWallet.substring(36)}`}
                  </span>
               </div>
            </div>
         </div>
         <div className="w-full px-[5%] py-[5%] flex flex-col gap-10 justify-center items-center bg-white">
            <div className=" text-black font-semibold w-[100%] justify-between flex items-center">
               <span className="text-3xl">My Collection</span>
            </div>
            {loading == true && NFTs == undefined ? (
               <CircularProgress color="success" />
            ) : (
               <div className="w-full flex flex-wrap px-20 gap-10 justify-center items-center">
                  {NFTs.map((e: any, index: number) => (
                     <NFTModel key={index} nfts={e} isSell={true} />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

export default index;
