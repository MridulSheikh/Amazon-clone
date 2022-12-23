import Head from "next/head";
import Header from "../components/shared/Header";
import Banner from "../components/shared/home/Banner";
import ProductFedd from "../components/shared/home/ProductFedd";

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
       {/* Header */}
       <Header />
       <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
          <Banner />
        {/* product price */}
          <ProductFedd products={products} />
       </main>
    </div>
  );
}

export async function getServerSideProps(context){
  const products = await fetch("https://fakestoreapi.com/products").then(res => res.json())
  return {
    props : {
      products
    }
  }
}