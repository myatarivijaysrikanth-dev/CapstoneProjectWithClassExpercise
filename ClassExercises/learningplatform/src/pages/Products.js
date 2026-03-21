import ErrorBoundary from "../components/ErrorBoundary";
import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <div className="container">
      <h2 className="section-title">Product Section</h2>

      <ErrorBoundary>
        <ProductCard />
      </ErrorBoundary>
    </div>
  );
};

export default Products;
