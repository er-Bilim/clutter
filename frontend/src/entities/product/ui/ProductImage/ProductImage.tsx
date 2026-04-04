import { type FC } from "react";
import { API_URL } from "../../../../shared/constants/constants";
import CONTENT_PLACEHOLDER from "../../../../assets/images/placeholder/content_placeholder.png";
import CardMedia from "@mui/material/CardMedia";

interface IProductImageProps {
  image: string | null;
}

const ProductImage: FC<IProductImageProps> = ({ image }) => {
  const imageUrl = image ? `${API_URL}/${image}` : CONTENT_PLACEHOLDER;

  return (
    <CardMedia
      component="img"
      image={imageUrl}
      sx={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ProductImage;
