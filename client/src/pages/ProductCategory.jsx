import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard'; 

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  if (!category) return <p>Invalid category</p>;

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  const filterProducts = products.filter(
    (product) =>
      product.category?.toLowerCase().trim() === category.toLowerCase().trim()
  );

  return (
    <div className="mt-16 px-6">
      {searchCategory && (
        <div className="flex flex-col items-start">
          <p className="text-2xl font-semibold tracking-wide">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary mt-1 rounded-full"></div>
        </div>
      )}

      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-8">
          {filterProducts.map((product, index) => (
            <ProductCard key={product._id || index} products={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-primary">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
