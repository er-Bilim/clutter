import Typography from "@mui/material/Typography";
import { typographyStyle } from "../../globalStyle";
import type { FC } from "react";

interface IProductDescriptionProps {
  description: string;
}

const ProductDescription: FC<IProductDescriptionProps> = ({ description }) => {
  return (
    <Typography component={"p"} sx={typographyStyle}>
      {description}
    </Typography>
  );
};

export default ProductDescription;
