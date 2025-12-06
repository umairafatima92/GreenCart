import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ products = {} }) => {
  const { currency, AddToCart, RemoveFromCart, cartItems, navigate } =
    useAppContext();

  const productImage = products?.image?.[0] || null;

  return (
    products && (
      <div onClick={() => { navigate(`/products/${products.category.toLowerCase()}/${products._id}`); scrollTo(0, 0) }} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
        <div
          className="group cursor-pointer flex items-center justify-center px-2"
          onClick={() => navigate(`/product/${products._id}`)}
        >
          {productImage && (
            <img
              className="group-hover:scale-105 transition max-w-26 md:max-w-36"
              src={productImage}
              alt={products?.name ?? "product"}
            />
          )}
        </div>

        <div className="text-gray-500/60 text-sm">
          <p>{products?.category ?? ""}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {products?.name ?? ""}
          </p>

          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-3.5 w-3"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                />
              ))}
            <p>(4)</p>
          </div>

          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-emerald-500">
              {currency}{products?.offerPrice ?? "0"}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}{products?.price ?? "0"}
              </span>
            </p>

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-emerald-500"
            >
              {!cartItems[products._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-emerald-90 border border-emerald-300 md:w-[80px] w-[64px] h-[34px] rounded text-emerald-600 font-medium cursor-pointer"
                  onClick={() => AddToCart(products._id)}
                >
                  <img src={assets.cart_icon} alt="cart-icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-emerald-500/25 rounded select-none">
                  <button
                    onClick={() => RemoveFromCart(products._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[products._id]}
                  </span>
                  <button
                    onClick={() => AddToCart(products._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
