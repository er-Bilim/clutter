import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ContainerUI from "../Container/Container";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import AuthMenu from "../../../features/auth/ui/menus/AuthMenu/AuthMenu";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: grey[900] }}>
        <ContainerUI>
          <Toolbar>
            <Box
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "white",
                textDecoration: "none",
              }}
            >
              Clutter
            </Box>
            <Box>
              <AuthMenu />
            </Box>
          </Toolbar>
        </ContainerUI>
      </AppBar>
    </Box>
  );
};

export default Header;
