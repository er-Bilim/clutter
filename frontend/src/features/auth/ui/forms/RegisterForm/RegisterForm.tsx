import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IUserRegister } from "../../../../../../../backend/src/types/user.types";
import { useAppDispatch } from "../../../../../shared/lib/redux/hooks";
import { register } from "../../../model/thunks";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const schemaRegister = z.object({
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
  display_name: z
    .string()
    .trim()
    .min(3, { message: "Display name must be at least 3 characters long!" })
    .max(32, { message: "Display name must be at most 32 characters long!" })
    .regex(/^[a-zA-Z\s]*$/),
  phone_number: z
    .string()
    .trim()
    .regex(/^\+996(5|7|9|2|3)\d{2}\d{3}\d{3}$/, {
      message:
        "Phone number is not valid! Only Kyrgyzstan numbers are allowed :D \n Example: +996123456789 \n",
    }),
});

type RegisterFormData = z.infer<typeof schemaRegister>;

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register: inputRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schemaRegister),
  });

  const registerSubmit = async (data: IUserRegister) => {
    try {
      await dispatch(register(data));
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
        <ArrowCircleUpIcon
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
          Sign up
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(registerSubmit)}>
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
          <TextField
            id="outlined-basic"
            label="Display name"
            variant="outlined"
            type="text"
            {...inputRegister("display_name")}
            sx={{
              width: "100%",
            }}
            error={!!errors.display_name}
            helperText={errors.display_name?.message}
          />
          <TextField
            id="outlined-basic"
            label="Phone number"
            variant="outlined"
            type="tel"
            {...inputRegister("phone_number")}
            sx={{
              width: "100%",
            }}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, width: "100%", background: grey[900] }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
