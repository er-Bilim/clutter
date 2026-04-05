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
import ProductCard from "../../../entities/product/ui/product/ProductCard/ProductCard";
import { selectCategories } from "../../../entities/category/model/selectors";
import { getCategories } from "../../../entities/category/model/thunk";
import { Link, useSearchParams } from "react-router-dom";
import CategoryNavigation from "../../../shared/ui/CategoryNavigation/CategoryNavigation";

const ProductList = () => {
  const [queryParams] = useSearchParams();
  const categoryQuery: string | null = queryParams.get("category");

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const products = useAppSelector(selectProducts);
  const { fetchLoading } = useAppSelector(selectLoading);
  const { fetchError } = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getAllProducts(categoryQuery)).unwrap();

    if (categories.length === 0) {
      dispatch(getCategories()).unwrap();
    }
  }, [dispatch, categoryQuery, categories]);

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
          <Box
            component={Link}
            key={product._id}
            to={`product/${product._id}`}
            sx={{
              position: "relative",
              textDecoration: "none",
              transition: "bottom 0.3s ease",
              bottom: 0,
              "&:hover": {
                bottom: "20px",
              },
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </>
    );
  };

  return (
    <>
      <Box>
        <CategoryNavigation
          categories={categories}
          categoryQuery={categoryQuery}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 6,
          alignItems: "center",
          mt: 5,
        }}
      >
        {renderContent()}
      </Box>
    </>
  );
};

export default ProductList;
