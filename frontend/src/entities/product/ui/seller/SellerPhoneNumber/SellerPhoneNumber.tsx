import Typography from "@mui/material/Typography";
import { typographyStyle } from "../../globalStyle";
import type { FC } from "react";

interface ISellerPhoneNumberProps {
  phone_number: string;
}

const SellerPhoneNumber: FC<ISellerPhoneNumberProps> = ({ phone_number }) => {
  return (
    <Typography component={"p"} sx={typographyStyle}>
      {phone_number}
    </Typography>
  );
};

export default SellerPhoneNumber;
