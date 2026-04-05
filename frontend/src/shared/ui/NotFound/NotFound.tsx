import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        textTransform: "uppercase",
        background: grey[900],
        color: grey[100],
        textAlign: "center",
        padding: 5,
        fontSize: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Typography
        component={"p"}
        sx={{
          letterSpacing: 3,
          fontSize: "inherit",
        }}
      >
        404 - not found 🥲
      </Typography>
      <Button
        component={Link}
        to={"/"}
        sx={{
          color: grey[100],
          border: 1,
          fontSize: "3rem",
          padding: "0 60px",
          letterSpacing: 40,
        }}
      >
        go back 😎
      </Button>
    </Box>
  );
};

export default NotFound;
