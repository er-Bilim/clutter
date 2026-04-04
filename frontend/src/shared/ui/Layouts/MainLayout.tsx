import Container from "@mui/material/Container";
import Header from "../Header/Header";
import type { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="md" sx={{ margin: "0 auto" }}>
          {children}
        </Container>
      </main>
    </>
  );
};

export default MainLayout;
