import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { grey, red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../../../../../shared/constants/constants";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../shared/lib/redux/hooks";
import type { IProductMutation } from "../../../../model/types";
import { createProduct } from "../../../../model/thunk";
import { selectError, selectLoading } from "../../../../model/selectors";
import AdbIcon from "@mui/icons-material/Adb";
import FileInput from "../../../../../../shared/ui/FileInput/FileInput";
import { useEffect, type ChangeEvent } from "react";
import { selectCategories } from "../../../../../category/model/selectors";
import { getCategories } from "../../../../../category/model/thunk";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

const schemaProductAddForm = z.object({
  category: z.string().trim(),
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters long!" })
    .max(70, { message: "Title must be at most 70 characters long" }),
  description: z
    .string()
    .trim()
    .min(5, { message: "Description must be at least 3 characters long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
  price: z
    .string()
    .trim()
    .regex(/^[1-9]\d*$/, {
      message: "Price must be at least 0 and Price must be at most 1000000",
    }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size is 10MB 🫠")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported 😶",
    ),
});

type AddProductFormData = z.infer<typeof schemaProductAddForm>;

const AddProductForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const { createLoading } = useAppSelector(selectLoading);
  const { createError } = useAppSelector(selectError);
  const navigate = useNavigate();

  if (createLoading) {
    toast.error(createError?.errors.category.message);
  }

  const {
    register: inputRegister,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(schemaProductAddForm),
  });

  const createProductSubmit = async (data: IProductMutation) => {
    try {
      await dispatch(createProduct(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files[0] && name === "image") {
      setValue(name, files[0]);
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
        <AdbIcon
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
          New product✨✨✨
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(createProductSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            select
            id="category"
            label="Category"
            {...inputRegister("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            type="text"
            {...inputRegister("title")}
            sx={{
              width: "100%",
            }}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            type="text"
            {...inputRegister("description")}
            sx={{
              width: "100%",
            }}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            type="text"
            {...inputRegister("price")}
            sx={{
              width: "100%",
            }}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                margin: "0 auto",
              }}
            >
              <FileInput
                name="image"
                label="product image"
                onChange={onChangeFileHandler}
              />
            </Box>
            {errors.image && (
              <Typography
                sx={{
                  color: red[600],
                  fontSize: "12px",
                  paddingLeft: 2,
                  textAlign: "center",
                }}
              >
                {errors.image.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, width: "100%", background: grey[900] }}
          loading={createLoading}
        >
          create 🪄
        </Button>
      </Box>
    </Box>
  );
};

export default AddProductForm;
