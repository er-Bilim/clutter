import type { FC } from "react";
import type { IProduct } from "../../model/types";
import Box from "@mui/material/Box";
import ProductImage from "../ProductImage/ProductImage";
import ProductInfo from "../ProductInfo/ProductInfo";
import { grey } from "@mui/material/colors";

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
          <ProductInfo
            sellerName={product.user.display_name}
            category={product.category}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
