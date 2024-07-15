import React from "react";
import { dummyProducts } from "../../home/(products)/dummyProducts";

const Product = ({ params }: { params: { id: string } }) => {
  const chosenProduct = dummyProducts.find(
    (product) => product.id == parseInt(params.id)
  );

  return (
    <div>
      {params.id}
      <h1>{chosenProduct?.title}</h1>
    </div>
  );
};

export default Product;
