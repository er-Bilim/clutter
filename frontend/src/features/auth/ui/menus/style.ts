import { grey } from "@mui/material/colors";
import type { CSSProperties } from "@mui/material/styles";

export const styleNavLink: CSSProperties = {
  width: "150px",
  textAlign: "center",
  color: grey[900],
  textDecoration: "none",
  textTransform: "uppercase",
  background: grey[100],
  padding: 1,
  border: `1px solid ${grey[100]}`,
  fontSize: "14px",
};

export const navActiveStyle: CSSProperties = {
  background: grey[900],
  color: "white",
  border: `1px solid ${grey[100]}`,
};