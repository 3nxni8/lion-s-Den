import ProductList from "../../../components/Products/ProductList";
import { PRODUCTS } from "../../../constants/products";

const Products = () => {
  return (
    <div className="container mx-auto px-4">
      <ProductList
        products={PRODUCTS}
        title="All Products"
        description="Browse our curated selection of products."
      />
    </div>
  );
};

export default Products;