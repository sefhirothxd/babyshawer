import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Baby Shawer de Victor',
	description: 'Registro de regalos para el baby shawer de Victor',
	image: '/silladecomer.webp',
	url: 'https://babyshawer.vercel.app/',
	type: 'website',
	keywords: 'baby shawer, Victor, regalos',
	locale: 'es_ES',
	site_name: 'Baby Shawer de Victor',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<meta property="og:title" content={metadata.title} />
				<meta property="og:description" content={metadata.description} />
				<meta property="og:image" content={metadata.image} />
			</Head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
