import MainLayout from "./shared/ui/Layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProtectedRouter from "./app/providers/router/ProtectedRouter";
import { useAppSelector } from "./shared/lib/redux/hooks";
import { selectUser } from "./features/auth/model/selectors";
import DetailProduct from "./pages/Products/DetailProduct";
import NotFound from "./shared/ui/NotFound/NotFound";
import AddProductPage from "./pages/AddProductPage/AddProductPage";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route
            path="/product/add"
            element={
              <ProtectedRouter isAuth={Boolean(user)}>
                <AddProductPage />
              </ProtectedRouter>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRouter isAuth={Boolean(!user)}>
                <RegisterPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouter isAuth={Boolean(!user)}>
                <LoginPage />
              </ProtectedRouter>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
