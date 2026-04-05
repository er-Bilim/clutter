import Typography from "@mui/material/Typography";
import { typographyStyle } from "../../globalStyle";
import type { FC } from "react";

interface IProductCategoryProps {
  category: string;
}

const ProductCategory: FC<IProductCategoryProps> = ({ category }) => {
  return (
    <Typography component={"p"} sx={typographyStyle}>
      {category}
    </Typography>
  );
};

export default ProductCategory;
