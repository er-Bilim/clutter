import Box from "@mui/material/Box";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/lib/redux/hooks";
import {
  selectError,
  selectLoading,
  selectProducts,
} from "../../../entities/product/model/selectors";
import { useEffect } from "react";
import { getAllProducts } from "../../../entities/product/model/thunk";
import Loader from "../../../shared/ui/Loader/Loader";
import Typography from "@mui/material/Typography";
import ProductCard from "../../../entities/product/ui/ProductCard/ProductCard";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const { fetchLoading } = useAppSelector(selectLoading);
  const { fetchError } = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const renderContent = () => {
    if (fetchLoading) {
      return <Loader />;
    }

    if (fetchError) {
      return <Typography component="p">{fetchError.error}</Typography>;
    }

    if (products.length === 0) {
      return <Typography component="p">No products</Typography>;
    }

    return (
      <>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 3,
          alignItems: "center",
        }}
      >
        {renderContent()}
      </Box>
    </>
  );
};

export default ProductList;
