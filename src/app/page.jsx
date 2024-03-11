import Form from "./components/Form";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Baby Shawer de Vasco</title>
        <meta name="description" content="Regalo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full items-center justify-center  bg-[#b4e4ff]">
        <Form />
      </main>
    </>
  );
}
