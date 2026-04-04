import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../../../../shared/lib/redux/hooks";
import { login } from "../../../model/thunks";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type { ILoginMutation } from "../../../model/types";
import Typography from "@mui/material/Typography";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const schemaLogin = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(25, { message: "Username must be at most 12 characters long!" })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Your username must contain only letters and numbers!",
    ),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .max(32, { message: "Password must be at most 32 characters long!" }),
});

type RegisterFormData = z.infer<typeof schemaLogin>;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register: inputRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schemaLogin),
  });

  const LoginSubmit = async (data: ILoginMutation) => {
    try {
      await dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: `1px solid ${grey[900]}`,
        padding: "20px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ArrowCircleDownIcon
          sx={{
            color: grey[900],
            fontSize: "60px",
          }}
        />
        <Typography
          component="p"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 4,
          }}
        >
          Sign in
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(LoginSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            {...inputRegister("username")}
            sx={{
              width: "100%",
            }}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            {...inputRegister("password")}
            sx={{
              width: "100%",
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, width: "100%", background: grey[900] }}
        >
          Sign in
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
