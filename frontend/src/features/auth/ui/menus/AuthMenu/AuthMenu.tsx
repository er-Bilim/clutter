import Box from "@mui/material/Box";
import { useAppSelector } from "../../../../../shared/lib/redux/hooks";
import { selectUser } from "../../../model/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AnonymousMenu from "../AnonymousMenu/AnonymousMenu";

const AuthMenu = () => {
  const user = useAppSelector(selectUser);

  const renderMenu = () => {
    if (user) {
      return (
        <>
          <UserMenu />
        </>
      );
    }

    return (
      <>
        <AnonymousMenu />
      </>
    );
  };

  return (
    <Box>
      {renderMenu()}
    </Box>
  );
};

export default AuthMenu;
