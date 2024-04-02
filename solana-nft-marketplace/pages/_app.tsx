import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/css/loading.css';
import '../public/css/globals.css';
import '../public/css/local.css';
import { Provider } from 'react-redux'
import myStore from '@/script/store/store';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
   WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo, useState } from 'react';
require("@solana/wallet-adapter-react-ui/styles.css");

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
	const network = WalletAdapterNetwork.Devnet;
	const [isConnect, setConnect] = useState(false);
 
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
 
	const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);
 
	console.log("is connect", isConnect);

	return (
		<>
			<Head>
				<title>SolNFTss</title>
				<meta name="description" content="Solana NFT Marketplace" />
				<meta name="author" content="Tommy" />
				<meta name="keywords" content="blockchain consultant, solana, nft marketplace" />
				<meta property="og:title" content="Charity Blue" />
				<meta property="og:url" content="" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="" />
				<meta property="og:site-name" content="Solana NFT Marketplace" />
				<meta property="og:description" content="Solana NFT Marketplace" />
				<meta property="og:image:alt" content="Solana NFT Marketplace" />
				<meta charSet="utf-8" />
				{/* <meta http-equiv="Content-Security-Policy" 
					content="
					default-src * data: mediastream: blob: filesystem: about: ws: wss: 'unsafe-eval' 'wasm-unsafe-eval' 'unsafe-inline'; 
					script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; 
					connect-src * data: blob: 'unsafe-inline'; 
					img-src * data: blob: 'unsafe-inline'; 
					frame-src * data: blob: ; 
					style-src * data: blob: 'unsafe-inline';
					font-src * data: blob: 'unsafe-inline';
					frame-ancestors * data: blob: 'unsafe-inline';"/> */}
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="icon" href="../images/logoSolNFTss.ico" />
			</Head>
			<Provider store={myStore}>
				<ConnectionProvider endpoint={endpoint}>
					<WalletProvider wallets={wallets} autoConnect>
						<WalletModalProvider>
							<Component {...pageProps} />
						</WalletModalProvider>
					</WalletProvider>
				</ConnectionProvider>
			</Provider>
		</>
	);
};

export default MyApp;