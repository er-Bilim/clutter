import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { FC } from "react";

interface IProductInfoProps {
  sellerName: string;
  category: string;
  title: string;
  description: string | null;
  price: number;
}

const ProductInfo: FC<IProductInfoProps> = ({
  category,
  title,
  description,
  price,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography component={"p"} sx={{ letterSpacing: 2 }}>
        {category}
      </Typography>
      <Typography component={"p"}>{title}</Typography>
      <Typography component={"p"}> {description}</Typography>

      <Typography
        component={"p"}
        sx={{
          letterSpacing: 3,
          fontWeight: 600,
        }}
      >
        {price} KGS
      </Typography>
    </Box>
  );
};

export default ProductInfo;
