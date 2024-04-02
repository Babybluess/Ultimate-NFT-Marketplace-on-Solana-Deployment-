import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import HomePage from "../modules/HomePage";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

const Home: NextPage = () => {
   const [addressWallet, setAddressWallet] = useState("J5HxijcGXuzj9K7ynxenKjrUeekDewy7HYW3q3jx5mci")
   const {publicKey} = useWallet();
	const createUser = async (walletAddress: any) => {
		try {
			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: `http://localhost:3000/api/user`,
				headers: {},
				data: JSON.stringify({
					walletAddress,
				})
			};

			const response = await axios.request(config);
			return response.data;
		} catch (error) {
			throw error;
		}
	};

   useEffect(() => {
   console.log(publicKey);
   if (publicKey) {

      createUser(addressWallet)
   }

   },[publicKey])
   
   return (
      <div className=" w-screen min-h-screen z-0 px-[10%] py-[8%] bg-[#14161B] items-start justify-center relative flex overflow-hidden">
         <div className=" z-10 bg-gradient-to-br from-[#663439] to-[#48294E] w-screen h-screen top-0 left-0 fixed">
            <video autoPlay={true} loop controls={false} muted>
               <source src="./video/background.mp4" type="video/mp4"/>
            </video>
         </div>
         <HomePage />
      </div>
   );
};

export default Home;
