import Box from "@mui/material/Box";
import type { FC } from "react";

interface IUserNameProps {
  name: string;
}

const UserName: FC<IUserNameProps> = ({ name }) => {
  return <Box component="p">{name}</Box>;
};

export default UserName;
