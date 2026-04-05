import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { navActiveStyle, styleNavLink } from "../style";
import Button from "@mui/material/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../shared/lib/redux/hooks";
import { unsetUser } from "../../../model/slice";
import { logout } from "../../../model/thunks";
import { selectLogoutError } from "../../../model/selectors";
import { toast } from "react-toastify";

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const logoutError = useAppSelector(selectLogoutError);

  if (logoutError) {
    toast.error(logoutError.error);
  }

  const handleLogout = () => {
    try {
      dispatch(logout()).unwrap();
      if (!logoutError) {
        dispatch(unsetUser());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <Box
        component={NavLink}
        to={"product/add"}
        style={({ isActive }) => (isActive ? navActiveStyle : undefined)}
        sx={styleNavLink}
      >
        Add new item
      </Box>
      <Box component={Button} sx={styleNavLink} onClick={handleLogout}>
        Logout
      </Box>
    </Box>
  );
};

export default UserMenu;
