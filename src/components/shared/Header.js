import React from "react";
import Image from "next/image";
import {ShoppingCartIcon, SearchIcon, MenuIcon} from '@heroicons/react/outline'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from 'next/router'
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/basketSlice";

const Header = () => {
    const {data : session} = useSession()
    const router = useRouter()
    const items = useSelector(selectItems);
  return (
    <header className="sticky top-0 z-40">
      {/* top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div  onClick={()=>router.push('/')} className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer ease-in duration-200">
          <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" />
           <SearchIcon className="h-12 p-4" />
        </div>
        {/* right */}
        <div className="text-white flex items-center text-xs space-x-3 mx-6 whitespace-nowrap">
            <div onClick={!session ? signIn : signOut} className="link cursor-pointer">
                {
                    session ?
                    <p>Hello {session?.user.name}</p>
                    :
                    <p>Sign in</p>
                }
                <p className="font-extrabold md:text-sm">Account & Lists</p>
            </div>
            <div className="link">
                <p>Returns</p>
                <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            <div onClick={()=>router.push('/checkout')} className="relative link flex items-center">
                <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items?.length}</span>
                <ShoppingCartIcon className="h-10" />
                <p className="hidden font-extrabold md:text-sm md:inline mt-2">Basket</p>
            </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
            <MenuIcon className="h-6 m-1 " />
            All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Price</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
