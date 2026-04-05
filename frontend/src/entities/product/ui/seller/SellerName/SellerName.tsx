import Typography from "@mui/material/Typography";
import { typographyStyle } from "../../globalStyle";
import type { FC } from "react";

interface ISellerNameProps {
  name: string;
}

const SellerName: FC<ISellerNameProps> = ({ name }) => {
  return (
    <Typography component={"p"} sx={typographyStyle}>
      {name}
    </Typography>
  );
};

export default SellerName;
