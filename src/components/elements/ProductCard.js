import { Link } from "react-router-dom";
import { Ratings } from "./Ratings";
import { useCart } from "../../contexts/CartContext";
import { useEffect, useState } from "react";

export const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cartList } = useCart();
  function handleClick(product) {
    addToCart(product);
  }
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const productInCart = cartList.find((item) => item.id === product.id);

    productInCart ? setInCart(true) : setInCart(false);
  }, [cartList, product.id]);
  return (
    <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/products/${product.id}`} className="relative">
        {product.best_seller && (
          <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">
            Best Seller
          </span>
        )}
        <img
          className="rounded-t-lg w-full h-64"
          src={product.poster}
          alt={product.name}
        />
      </Link>
      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.overview}
        </p>

        <Ratings ratingVal={product.rating} />

        <p className="flex justify-between items-center">
          <span className="text-2xl dark:text-gray-200">
            <span>$</span>
            <span>{product.price}</span>
          </span>
          {inCart ? (
            <button
              onClick={() => removeFromCart(product)}
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800"
            >
              Remove Item <i className="ml-1 bi bi-trash3"></i>
            </button>
          ) : (
            <button
              disabled={product.in_stock ? "" : "disabled"}
              onClick={() => handleClick(product)}
              className={`${
                product.in_stock ? "" : "cursor-not-allowed"
              } inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`}
            >
              Add To Cart <i className="ml-1 bi bi-plus-lg"></i>
            </button>
          )}
        </p>
      </div>
    </div>
  );
};
