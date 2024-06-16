import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false); // State to manage showing/hiding filters

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="bg-teal-500 min-h-screen">
        <div className="container mx-auto">
          <div className="flex md:flex-row">
            <div className="bg-teal-500 p-3 mt-2 mb-10 relative">
              <button
                className="w-full bg-teal-600 hover:bg-green-500 text-coral text-left rounded p-2"
                onClick={toggleFilters}
              >
                Filter
              </button>
              {showFilters && (
                <>
                  <h2 className="h4 text-center py-2 bg-teal-600 rounded-full mb-2 mt-4">
                    Filter by Categories
                  </h2>

                  <div className="p-5 w-[15rem]">
                    {categories?.map((c) => (
                      <div key={c._id} className="mb-2">
                        <div className="flex ietms-center mr-4">
                          <input
                            type="checkbox"
                            id="red-checkbox"
                            onChange={(e) =>
                              handleCheck(e.target.checked, c._id)
                            }
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />

                          <label
                            htmlFor="green-checkbox"
                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                          >
                            {c.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="h4 text-center py-2 bg-teal-600 rounded-full mb-2">
                    Filter by Brands
                  </h2>

                  <div className="p-5">
                    {uniqueBrands?.map((brand) => (
                      <>
                        <div className="flex items-enter mr-4 mb-5">
                          <input
                            type="radio"
                            id={brand}
                            name="brand"
                            onChange={() => handleBrandClick(brand)}
                            className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />

                          <label
                            htmlFor="green-radio"
                            className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                          >
                            {brand}
                          </label>
                        </div>
                      </>
                    ))}
                  </div>

                  <h2 className="h4 text-center py-2 bg-teal-600 rounded-full mb-2">
                    Filter by Price
                  </h2>

                  <div className="p-5 w-[15rem]">
                    <input
                      type="text"
                      placeholder="Enter Price"
                      value={priceFilter}
                      onChange={handlePriceChange}
                      className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                    />
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      className="w-full bg-teal-600 hover:bg-green-600 border my-4"
                      onClick={() => window.location.reload()}
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="p-3">
              <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
              <div className="flex flex-wrap">
                {products.length === 0 ? (
                  <Loader />
                ) : (
                  products?.map((p) => (
                    <div className="p-3" key={p._id}>
                      <ProductCard p={p} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
