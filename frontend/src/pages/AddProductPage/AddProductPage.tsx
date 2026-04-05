import Box from "@mui/material/Box";
import AddProductForm from "../../entities/product/ui/product/forms/AddProductForm/AddProductForm";

const AddProductPage = () => {
  return (
    <Box
      sx={{
        width: "650px",
        margin: "0 auto",
      }}
    >
      <AddProductForm />
    </Box>
  );
};

export default AddProductPage;
