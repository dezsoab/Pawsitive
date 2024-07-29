import React from "react";
import { dummyProducts } from "../../home/(products)/dummyProducts";
import logger from "@/logging/logger";

const Product = ({ params }: { params: { id: string } }) => {
  const chosenProduct = dummyProducts.find(
    (product) => product.id == parseInt(params.id)
  );

  logger.info("Rendering product page for SKU: " + chosenProduct?.id);

  return (
    <div>
      {params.id}
      <h1>{chosenProduct?.title}</h1>
    </div>
  );
};

export default Product;
