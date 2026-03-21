import React from "react";

const ProductCard = () => {
  const product = null;

  if (!product) {
    throw new Error("Product failed to load");
  }

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductCard;
