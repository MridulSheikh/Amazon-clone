import React from 'react'
import Layout from '../components/shared/Layout'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutCard from '../components/checkout/CheckoutCard'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/react'

const checkout = () => {
    const items = useSelector(selectItems);
    const {data : session} = useSession()
    const total = useSelector(selectTotal);
  return (
    <Layout>
        <main className='bg-gray-100 flex'>
            <div className='lg:flex max-w-screen-2xl mx-auto'>
                <div className='flex-grow m-5 shadow-sm'>
                    <Image 
                    src="http://links.papareact.com/ikj"
                    width={1020}
                    height={250}
                    objectFit="contain"
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        {
                            items.length == 0 ?
                            <h1 className='text-3xl border-b pb-4'>Your Amazon Basket is empty</h1>
                            :
                            <h1 className='text-3xl border-b pb-4'>Your Amazon Basket</h1>
                        }
                        {
                        items?.map((item, i) => <CheckoutCard 
                        key={i}
                        id={item?.id}
                        title={item?.title}
                        rating={item?.rating}
                        price={item?.price}
                        description={item?.description}
                        category={item?.category}
                        image={item?.image}
                        hasprime={item?.hasPrime}
                        />)
                    }
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-white p-10 shadow-md m-5'>
                    {items.length > 0 && <div>
                        <h2 className='whitespace-nowrap'>
                            Subtotal ({items.length} items)
                        <span className='font-bold'>
                            <Currency quantity={total} currency="USD" />
                        </span>
                        </h2>
                        <button 
                        className={`button text-sm mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`} disabled={!session}>
                            {!session ? 'Sing in to checkout' : 'Procced to checkout'}
                        </button>
                    </div>}
                </div>
        </main>
    </Layout>
  )
}

export default checkout