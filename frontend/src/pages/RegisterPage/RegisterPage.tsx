import Box from "@mui/material/Box";
import RegisterForm from "../../features/auth/ui/forms/RegisterForm/RegisterForm";

const RegisterPage = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
