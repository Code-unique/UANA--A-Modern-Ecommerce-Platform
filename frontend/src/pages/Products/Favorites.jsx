import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="bg-teal-500 min-h-screen flex justify-end">
      <div className="container ml-auto mr-10">
        <h1 className="text-lg font-bold ml-3 mt-3 text-white">FAVORITE PRODUCTS</h1>

        <div className="flex flex-wrap">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
