import Box from "@mui/material/Box";
import { useAppSelector } from "../../../../../shared/lib/redux/hooks";
import { selectUser } from "../../../model/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AnonymousMenu from "../AnonymousMenu/AnonymousMenu";
import UserName from "../../../../../shared/ui/user/UserName/UserName";
import UserAvatar from "../../../../../shared/ui/user/UserAvatar/UserAvatar";

const AuthMenu = () => {
  const user = useAppSelector(selectUser);

  const renderMenu = () => {
    if (!user) {
      return (
        <>
          <AnonymousMenu />
        </>
      );
    }

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <UserMenu />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                letterSpacing: 2,
              }}
            >
              <UserName name={user.display_name} />
            </Box>
            <UserAvatar name={user.display_name} />
          </Box>
        </Box>
      </>
    );
  };

  return <Box>{renderMenu()}</Box>;
};

export default AuthMenu;
