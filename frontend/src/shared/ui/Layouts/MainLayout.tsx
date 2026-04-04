import Header from "../Header/Header";
import type { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import ContainerUI from "../Container/Container";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1 }} component="main">
        <ContainerUI>
          <Box sx={{ mt: "150px", mb: "100px" }}>{children}</Box>
        </ContainerUI>
      </Box>
    </>
  );
};

export default MainLayout;
