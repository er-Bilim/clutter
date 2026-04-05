import Typography from "@mui/material/Typography";
import { typographyStyle } from "../../globalStyle";
import type { FC } from "react";

interface IProductPriceProps {
  price: number;
  currency: string;
}

const ProductPrice: FC<IProductPriceProps> = ({ price, currency }) => {
  return (
    <Typography
      component={"p"}
      sx={{
        fontWeight: 600,
        fontSize: "inherit",
        ...typographyStyle,
      }}
    >
      {price} {currency}
    </Typography>
  );
};

export default ProductPrice;
