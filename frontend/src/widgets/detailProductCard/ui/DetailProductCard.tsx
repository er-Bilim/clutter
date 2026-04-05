import { useEffect } from "react";
import {
  deleteProduct,
  getProductByID,
} from "../../../entities/product/model/thunk";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/lib/redux/hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectError,
  selectLoading,
  selectProduct,
} from "../../../entities/product/model/selectors";
import Loader from "../../../shared/ui/Loader/Loader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SellerName from "../../../entities/product/ui/seller/SellerName/SellerName";
import UserAvatar from "../../../shared/ui/user/UserAvatar/UserAvatar";
import SellerPhoneNumber from "../../../entities/product/ui/seller/SellerPhoneNumber/SellerPhoneNumber";
import ProductImage from "../../../entities/product/ui/product/ProductImage/ProductImage";
import ProductTitle from "../../../entities/product/ui/product/ProductTitle/ProductTitle";
import ProductPrice from "../../../entities/product/ui/product/ProductPrice/ProductPrice";
import { grey, red } from "@mui/material/colors";
import ProductDescription from "../../../entities/product/ui/product/ProductDescription/ProductDescription";
import ProductCategory from "../../../entities/product/ui/product/ProductCategory/ProductCategory";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/model/selectors";
import { toast } from "react-toastify";

const DetailProductCard = () => {
  const { id: product_id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const { fetchLoading, deleteLoading } = useAppSelector(selectLoading);
  const { fetchError, deleteError } = useAppSelector(selectError);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleDeleteProduct = async (product_id: string) => {
    await dispatch(deleteProduct(product_id));
    navigate("/");
  };

  if (deleteError) {
    toast.error(deleteError.error);
  }

  useEffect(() => {
    if (product_id) {
      dispatch(getProductByID(product_id));
    }
  }, [product_id, dispatch]);

  const renderContent = () => {
    if (fetchLoading || deleteLoading) {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (fetchError || !product) {
      return (
        <>
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              letterSpacing: 3,
            }}
          >
            {fetchError?.error}
          </Typography>
        </>
      );
    }

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 17,
          }}
        >
          <Box>
            <Box
              sx={{
                borderRadius: 3,
                border: 1,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <UserAvatar name={product.user.display_name} />
                <SellerName name={product.user.display_name} />
                {user && user._id === product.user._id && (
                  <Typography
                    sx={{
                      letterSpacing: 3,
                      color: grey[500],
                    }}
                  >
                    (you)
                  </Typography>
                )}
              </Box>
              <Box
                sx={{ borderTop: 1, background: grey[900], color: grey[100] }}
              >
                <Box
                  sx={{
                    padding: 5,
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <ContactPhoneIcon />
                  <SellerPhoneNumber phone_number={product.user.phone_number} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "450px",
              border: 1,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                fontSize: "1.5rem",
                padding: 3,
                borderBottom: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <ProductCategory category={product.category} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <LocalFireDepartmentIcon />
                <ProductPrice price={product.price} currency="KGS" />
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <ProductImage image={product.image} />
            </Box>
            <Box
              sx={{
                background: grey[900],
                color: grey[100],
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <ProductTitle title={product.title} />
              <ProductDescription description={product.description} />
            </Box>
            {user && product.user._id === user._id && (
              <Button
                onClick={() => handleDeleteProduct(product._id)}
                sx={{
                  width: "100%",
                  padding: "10px 0",
                  letterSpacing: 4,
                  color: grey[100],
                  background: red[500],
                  borderRadius: 0,
                }}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default DetailProductCard;
