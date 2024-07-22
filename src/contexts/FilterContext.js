import { filterReducer } from "../reducers/filterReducer";
const { createContext, useContext, useReducer } = require("react");

const filterInitialState = {
  productList: [],
  onlyInStock: false,
  bestSellerOnly: false,
  sortBy: null,
  ratings: null,
};

const filterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, filterInitialState);

  const initialProductList = (products) => {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        products: products,
      },
    });
  };

  function bestSeller(products) {
    return state.bestSellerOnly
      ? products.filter((product) => product.best_seller === true)
      : products;
  }

  function sortBy(products) {
    if (state.sortBy === "lowToHigh") {
      return products.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (state.sortBy === "highToLow") {
      return products.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return products;
  }

  function rating(products) {
    if (state.ratings === "4STARSABOVE") {
      return products.filter((product) => product.rating >= 4);
    }
    if (state.ratings === "3STARSABOVE") {
      return products.filter((product) => product.rating >= 3);
    }
    if (state.ratings === "2STARSABOVE") {
      return products.filter((product) => product.rating >= 2);
    }
    if (state.ratings === "1STARSABOVE") {
      return products.filter((product) => product.rating >= 1);
    }
    return products;
  }

  function inStock(products) {
    return state.onlyInStock
      ? products.filter((product) => product.in_stock === true)
      : products;
  }

  const filterProductList = bestSeller(
    inStock(sortBy(rating(state.productList)))
  );

  const value = {
    productList: filterProductList,
    initialProductList,
    state,
    dispatch,
  };
  return (
    <filterContext.Provider value={value}>{children}</filterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(filterContext);
  return context;
};
