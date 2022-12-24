import Head from "next/head";
import Header from "../components/shared/Header";
import Banner from "../components/shared/home/Banner";
import ProductFedd from "../components/shared/home/ProductFedd";
import Layout from "../components/shared/Layout";

export default function Home({ products }) {
  return (
    <Layout>
      <div className="bg-gray-100">
        <main className="max-w-screen-2xl mx-auto">
          {/* Banner */}
          <Banner />
          {/* product price */}
          <ProductFedd products={products} />
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}
