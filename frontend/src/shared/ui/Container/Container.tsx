import Container from "@mui/material/Container";
import type { FC, PropsWithChildren } from "react";

const ContainerUI: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Container maxWidth="lg" sx={{ margin: "0 auto" }}>
        {children}
      </Container>
    </>
  );
};

export default ContainerUI;
