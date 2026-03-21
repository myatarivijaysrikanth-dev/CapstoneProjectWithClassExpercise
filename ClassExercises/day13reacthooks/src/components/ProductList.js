import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading products...</p>;
  }

  return (
    <div className="mt-5">
      <h2 className="text-center mb-4">Product Management</h2>

      <div className="row">
        {products.slice(0, 6).map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow h-100">
              <img
                src={product.image}
                className="card-img-top p-3"
                style={{ height: "200px", objectFit: "contain" }}
                alt={product.title}
              />

              <div className="card-body text-center">
                <h6 className="card-title">{product.title}</h6>

                <p className="fw-bold">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
