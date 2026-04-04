import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import type { FC } from "react";

interface IUserAvatarProps {
  name: string;
}

const UserAvatar: FC<IUserAvatarProps> = ({ name }) => {
  return (
    <Box
      sx={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: grey[100],
      }}
    >
      <Box
        component="p"
        sx={{
          textAlign: "center",
          margin: "0 auto",
          color: grey[900],
          textTransform: "uppercase",
          fontSize: "1.4rem",
          fontWeight: "bold",
          lineHeight: "40px",
        }}
      >
        {name.at(0)}
      </Box>
    </Box>
  );
};

export default UserAvatar;
