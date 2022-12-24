import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/outline";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../slices/basketSlice";

function CheckoutCard({
  id,
  title,
  price,
  description,
  category,
  image,
  hasprime,
  rating,
}) {
  const dispatch = useDispatch();
  const addToBusket = () => {
    const product = {
        id,
        title,
        price,
        description,
        category,
        image,
        hasPrime : hasprime,
        rating
      };
      dispatch(addToBasket(product))
  };
  const removeBuscket = () => {
    dispatch(removeFromBasket({id}))
  };
  return (
    <div className="sm:flex gap-6 mb-5">
      <Image
        className="mx-auto"
        src={image}
        height={200}
        width={200}
        objectFit="contain"
      />
      <div className="w-full">
        <p className="font-bold">{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="USD" />

        {hasprime && (
          <div className="flex items-center space-y-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">Free next day delivery</p>
          </div>
        )}
      </div>
      <div className="w-1/2 flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addToBusket} className="button mt-5">
          Add to Basket
        </button>
        <button onClick={removeBuscket} className="button mt-5">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutCard;
