import Typography from "@mui/material/Typography";
import { typographyStyle } from "../../globalStyle";
import type { FC } from "react";

interface IProductTitleProps {
  title: string;
}

const ProductTitle: FC<IProductTitleProps> = ({ title }) => {
  return (
    <Typography component={"p"} sx={typographyStyle}>
      {title}
    </Typography>
  );
};

export default ProductTitle;
