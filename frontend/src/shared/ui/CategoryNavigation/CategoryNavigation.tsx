import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import type { ICategory } from "../../../entities/category/model/type";
import type { FC } from "react";
import Typography from "@mui/material/Typography";
import type { CSSProperties } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";

interface ICategoryNavigationProps {
  categories: ICategory[];
  categoryQuery: string | null;
}

const navLinkStyle: CSSProperties = {
  display: "block",
  width: "200px",
  textDecoration: "none",
  color: grey[900],
  border: 1,
  borderColor: grey[900],
  padding: 1,
  textAlign: "center",
};

const navLinkActive: CSSProperties = {
  background: grey[900],
  color: grey[100],
  border: 1,
  borderColor: grey[900],
};

const CategoryNavigation: FC<ICategoryNavigationProps> = ({
  categories,
  categoryQuery,
}) => {
  return (
    <>
      <List
        sx={{
          textTransform: "uppercase",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          component={NavLink}
          to={"/"}
          sx={navLinkStyle}
          style={({ isActive }) =>
            isActive && !categoryQuery ? navLinkActive : undefined
          }
        >
          <ListItemText>
            <Typography
              sx={{
                letterSpacing: 4,
              }}
            >
              all items
            </Typography>
          </ListItemText>
        </Box>

        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <Box
              key={category._id}
              component={NavLink}
              to={`/?category=${category.name}`}
              style={({ isActive }) =>
                isActive && category.name === categoryQuery
                  ? navLinkActive
                  : undefined
              }
              sx={navLinkStyle}
            >
              <ListItemText>
                <Typography
                  sx={{
                    letterSpacing: 4,
                  }}
                >
                  {category.name}
                </Typography>
              </ListItemText>
            </Box>
          ))}
      </List>
    </>
  );
};

export default CategoryNavigation;
