import type { FC } from "react";
import type { IProduct } from "../../../model/types";
import Box from "@mui/material/Box";
import ProductImage from "../ProductImage/ProductImage";
import { grey } from "@mui/material/colors";
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductPrice from "../ProductPrice/ProductPrice";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }) => {
  return (
    <>
      <Box
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "210px",
            border: 2,
            borderColor: grey[900],
          }}
        >
          <ProductImage image={product.image} />
        </Box>
        <Box
          sx={{
            width: "100%",
            background: grey[900],
            color: grey[100],
            padding: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <ProductTitle title={product.title} />
            <ProductPrice price={product.price} currency="KGS" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
