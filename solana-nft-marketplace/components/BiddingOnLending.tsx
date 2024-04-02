"use client";
import React, { useEffect, useState } from "react";
import acceptBid from "@/role/bidNFT/acceptBid";
import { Network } from "@shyft-to/js";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWallet } from "@solana/wallet-adapter-react";
import cancelBid from "@/role/bidNFT/cancelBid";
import { getCurrentNFTBorrow } from "@/script/action/vault/vaultAction";
import { useDispatch } from "react-redux";

function BiddingOnLending() {
   const [nftBid, setNFTBid] = useState<any[]>([]);
   const axios = require("axios");
   const { publicKey } = useWallet();
   const dispatch = useDispatch()

   const biddingList = () => {
      let config = {
         method: "get",
         maxBodyLength: Infinity,
         url: `https://api.shyft.to/sol/v1/marketplace/active_bids?network=devnet&marketplace_address=${process.env.NEXT_PUBLIC_ADDRESS_VAULT}&sort_by=bid_date&sort_order=desc`,
         headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
         },
      };

      axios
         .request(config)
         .then((res: any) => {
            console.log(res.data.result);
            const nft = new Array();
            res.data.result.data.forEach((event: any) => {
               const dataNFT = {
                  addressID: event.nft_address,
                  name: event.nft.name,
                  img: event.nft.image_uri,
                  seller: event.nft.owner,
                  buyer: event.buyer_address,
                  price: event.price,
                  bid_state: event.bid_state,
               };
               nft.push(dataNFT);
            });
            console.log("nft", nft);
            setNFTBid(nft);
         })
         .catch((error: any) => {
            console.log(error);
         });
   };

   useEffect(() => {
      biddingList();
      console.log("bidding list", nftBid);
   }, []);

   const acceptBidding = (bid_state: string, lender: string, price:number, nftAddress: string, borrower: string) => {
      acceptBid(Network.Devnet, bid_state, lender, process.env.NEXT_PUBLIC_ADDRESS_VAULT);

      if (publicKey !== null) {
          
          const currentNFT = {
           addressID: nftAddress,
           lenderNFT: lender,
           borrowerNFT:borrower,
           priceNFT: price,
        //    timeBorrowNFT: timeBorrow, 
           expirationNFT: process.env.NEXT_PUBLIC_EXPIRATION,
        //    stakeValue: stakeValue,
           isRevert: false ,
           isRecover: false
        }
  
        dispatch(getCurrentNFTBorrow(currentNFT))
      }

      setTimeout(() => {
         toast.success("🦄 Accept Bid NFT Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
         });
      }, 15000);
   };

   const cancelBidding = (bid_state: string, borrower: string) => {
      cancelBid(
         Network.Devnet,
         bid_state,
         borrower,
         process.env.NEXT_PUBLIC_ADDRESS_VAULT,
      );

      setTimeout(() => {
         toast.success("🦄 Cancel Bid NFT Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
         });
      }, 15000);
   };

   return (
      <div className=" w-full z-30 flex flex-col gap-5 items-center text-white px-10 py-5 border-x-4 border-[#F7F7F9]">
         <p className=" text-4xl font-semibold">Bidding&Offering NFT on Lending</p>
         <table className="table-auto border-white ">
            <thead className="border-b text-xl font-medium dark:border-neutral-500">
               <tr>
                  <th scope="col" className="px-8 py-4">
                     Image
                  </th>
                  <th scope="col" className=" px-10 py-4">
                     Name
                  </th>
                  <th scope="col" className=" px-10 py-4">
                     Lender
                  </th>
                  <th scope="col" className="px-16 py-4">
                     Borrower
                  </th>
                  <th scope="col" className="px-2 py-4">
                     EPrice
                  </th>
                  <th scope="col" className="px-6 py-4">
                     Expiration
                  </th>
                  <th scope="col" className="px-6 py-4">
                     Accept
                  </th>
                  <th scope="col" className="px-6 py-4">
                     Refuse
                  </th>
               </tr>
            </thead>
            <tbody className=" rounded-xl ">
               {nftBid.map((item: any, index: number) => (
                  <tr
                     key={index}
                     className="hover:bg-[#3b664b] justify-center text-white"
                  >
                     <td className="whitespace-nowrap px-6 py-4 flex flex-col items-center">
                        <img
                           className=" w-16 h-16 rounded-md object-cover"
                           src={item.img}
                        />
                     </td>
                     <td className="whitespace-nowrap px-10 py-4 text-center">
                        {item.name}
                     </td>
                     <td className="whitespace-nowrap px-10 py-4 text-center">
                        {`${item.seller.substring(0, 6)}...${item.seller.substring(38)}`}
                     </td>
                     <td className="whitespace-nowrap px-16 py-4 text-center">
                        {`${item.buyer.substring(0, 6)}...${item.buyer.substring(38)}`}
                     </td>
                     <td className="whitespace-nowrap px-2 py-4 text-center">
                        {item.price}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4 text-center">
                        {process.env.NEXT_PUBLIC_EXPIRATION}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4 text-center">
                        {item.seller == publicKey?.toBase58() ? (
                           <button
                              onClick={() => acceptBidding(item.bid_state, item.seller, item.price, item.addressID, item.buyer)}
                              className="px-2 py-1 bg-green-600 rounded-xl"
                           >
                              Accept Offer
                           </button>
                        ) : (
                           <p className=" text-white text-center">Not Authenticaion</p>
                        )}
                     </td>
                     <td className="whitespace-nowrap px-6 py-4 text-center">
                        {item.buyer == publicKey?.toBase58() ? (
                           <button
                              onClick={() => cancelBidding(item.bid_state, item.buyer)}
                              className="px-2 py-1 bg-rose-600 rounded-xl"
                           >
                              Cancel Offer
                           </button>
                        ) : (
                           <p className=" text-white text-center">Not Authenticaion</p>
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
         />
      </div>
   );
}

export default BiddingOnLending;
