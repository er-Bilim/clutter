import Box from "@mui/material/Box";
import LoginForm from "../../features/auth/ui/forms/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: "500px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
