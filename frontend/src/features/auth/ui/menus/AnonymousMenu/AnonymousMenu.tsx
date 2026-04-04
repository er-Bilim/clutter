import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { navActiveStyle, styleNavLink } from "../style";

const AnonymousMenu = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <Box
        component={NavLink}
        to={"/login"}
        style={({ isActive }) => (isActive ? navActiveStyle : undefined)}
        sx={styleNavLink}
      >
        sign in
      </Box>
      <Box
        component={NavLink}
        to={"/signup"}
        style={({ isActive }) => (isActive ? navActiveStyle : undefined)}
        sx={styleNavLink}
      >
        sign up
      </Box>
    </Box>
  );
};

export default AnonymousMenu;
