import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = ["Planejamentos", "Criar planejamento"];

export default function CustomNavbar() {
  const navigate = useNavigate();

  const handleNavigation = (page: any) => {
    if (page === "Planejamentos") {
      navigate("/planning");
    } else if (page === "Criar planejamento") {
      navigate("/create-planning");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1a1a1a" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
